"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MessageBubble } from "./MessageBubble";
import { FiSearch } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { PiClockClockwiseFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { MdInsertChart } from "react-icons/md";
import { IoMic } from "react-icons/io5";
import { CgScrollV } from "react-icons/cg";
import { IoMdSend } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import dayjs from "dayjs"; // install if not added: npm install dayjs
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface User {
  id: string;
  username: string;
}

interface Participant {
  display_name: string;
  user_id: string;
}

export default function ChatArea() {
  const { user } = useAuth();
  const { activeChatId, displayName } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [key, SetKey] = useState("123");
  const [chatInfo, setChatInfo] = useState<any>(null);
  const [usersMap, setUsersMap] = useState<Record<string, User>>({});
  const [sending, setSending] = useState(false);
  // const [displayName, SetDisplayName] = useState("Name");
  const [senderId, SetSenderId] = useState("123");
  const [sendError, setSendError] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const currentUserId = user?.id;

  // add a quick guard

  // Fetch messages when activeChatId changes
  useEffect(() => {
    if (!activeChatId) return;

    fetchMessages();
    // fetchDisplayName()
  }, [activeChatId]);

  // // Fetch unique users from messages to get usernames
  // useEffect(() => {
  //   async function fetchUsers() {
  //     const uniqueUserIds = Array.from(
  //       new Set(messages.map((m) => m.sender_id))
  //     );
  //     if (uniqueUserIds.length === 0) {
  //       setUsersMap({});
  //       return;
  //     }

  //     const { data, error } = await supabase
  //       .from("users")
  //       .select("id, username")
  //       .in("id", uniqueUserIds);

  //     if (error) {
  //       console.error("Error fetching users:", error);
  //     } else {
  //       const map: Record<string, User> = {};
  //       data?.forEach((user) => {
  //         map[user.id] = user;
  //       });
  //       setUsersMap(map);
  //     }
  //   }

  //   fetchUsers();
  // }, [messages]);

  // Subscribe to new messages realtime
  useEffect(() => {
    if (!activeChatId) return;

    const channel = supabase
      .channel(`chat:${activeChatId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;
          if (newMessage.chat_id !== activeChatId) return;
          // if (newMessage.chat_id === activeChatId) {
          //   setMessages((prev) => [...prev, newMessage]);
          //   bottomRef.current?.scrollIntoView();
          // }
          setMessages((prev) => [...prev, newMessage]);
          bottomRef.current?.scrollIntoView({ behavior: "auto" });
          SetKey(String(Math.random()));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChatId]);

  // useEffect(() => {
  //   if (!user) return;
  //   fetchDisplayName();
  // }, [senderId, activeChatId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!activeChatId) return;
    fetchMessages();
    fetchChatMeta();
  }, [activeChatId]);

  const fetchChatMeta = async () => {
    const chatRes = await supabase
      .from("chats")
      .select("id, is_group, name")
      .eq("id", activeChatId)
      .single();

    const participantsRes = await supabase
      .from("chat_participants")
      .select("user_id, display_name")
      .eq("chat_id", activeChatId);

    if (chatRes.data) setChatInfo(chatRes.data);
    if (participantsRes.data)
      setUsersMap(
        Object.fromEntries(
          participantsRes.data.map((p: Participant) => [
            p.user_id,
            { id: p.user_id, username: p.display_name },
          ])
        )
      );
  };

  // const fetchDisplayName = async () => {
  //   const { data, error } = await supabase
  //     .from("users")
  //     .select("username")
  //     .eq("id", senderId);

  //   if (error) {
  //     console.error("Error fetching messages:", error);
  //   } else {
  //     SetDisplayName(data[0].username ?? []);
  //     console.log(data);
  //   }
  // };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", activeChatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data ?? []);
      console.log(data[0].sender_id);
      SetSenderId(data[0].sender_id);
    }
  };

  if (!activeChatId || !currentUserId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging.
      </div>
    );
  }

  const groupMessagesByDate = (messages: Message[]) => {
    const result: { date: string; messages: Message[] }[] = [];

    messages.forEach((msg) => {
      const date = dayjs(msg.created_at).format("YYYY-MM-DD");
      const existingGroup = result.find((g) => g.date === date);
      if (existingGroup) {
        existingGroup.messages.push(msg);
      } else {
        result.push({ date, messages: [msg] });
      }
    });

    return result;
  };
  // Send message handler with error and loading handling
  const handleSend = async () => {
    setSendError("");
    if (!newMessage.trim()) return;

    setSending(true);
    const { error } = await supabase.from("messages").insert({
      chat_id: activeChatId,
      sender_id: currentUserId,
      content: newMessage.trim(),
    });

    setSending(false);

    if (error) {
      setSendError(error.message);
      console.error("Send error:", error.message);
    } else {
      setNewMessage("");
    }
  };

  return (
    <div
      key={key}
      className="flex  flex-col w-[57%] h-[93.8vh] overflow-y-hidden bg-white"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Chat Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200 h-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <h2 className="font-medium text-gray-900">
              {chatInfo?.is_group ? chatInfo?.name : displayName}
            </h2>
            {chatInfo?.is_group && (
              <p className="text-sm text-gray-600">
                {Object.values(usersMap)
                  .map((u) => u.username)
                  .filter((name) => name !== "You")
                  .join(", ")}
              </p>
            )}
            {/* <p className="text-sm text-gray-600">Chat ID: {activeChatId}</p> */}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {" "}
          {chatInfo?.is_group && (
            <div className="flex -space-x-2">
              {Object.values(usersMap)
                .slice(0, 3)
                .map((u) => (
                  <div
                    key={u.id}
                    className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm border-2 border-white"
                  >
                    {u.username.charAt(0).toUpperCase()}
                  </div>
                ))}
              {Object.values(usersMap).length > 3 && (
                <div className="w-8 h-8 bg-gray-200 text-xs rounded-full flex items-center justify-center border-2 border-white">
                  +{Object.values(usersMap).length - 3}
                </div>
              )}
            </div>
          )}
          <BsStars className="h-5 w-5 -rotate-90" />
          <FiSearch className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Messages Area */}
      {/* <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const senderName =
            message.sender_id === currentUserId
              ? "You"
              : usersMap[message.sender_id]?.username ?? "User";

          return (
            <MessageBubble
              key={message.id}
              message={{
                id: message.id,
                sender: senderName,
                content: message.content,
                time: new Date(message.created_at).toLocaleTimeString(),
                type: message.sender_id === currentUserId ? "sent" : "received",
              }}
            />
          );
        })}
        <div ref={bottomRef} />
      </div> */}

      {/* Messages with Day Headers */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {groupMessagesByDate(messages).map((group) => (
          <div key={group.date}>
            <div className="text-center text-xs  text-gray-500 my-4">
              <span className="py-1 px-2 rounded bg-gray-200">
                {dayjs(group.date).calendar(null, {
                  sameDay: "[Today]",
                  lastDay: "[Yesterday]",
                  lastWeek: "dddd",
                  sameElse: "MMM D, YYYY",
                })}
              </span>
            </div>
            {group.messages.map((message) => {
              const senderName =
                message.sender_id === currentUserId
                  ? "You"
                  : usersMap[message.sender_id]?.username ?? "User";

              return (
                <MessageBubble
                  key={message.id}
                  message={{
                    id: message.id,
                    sender: senderName,
                    content: message.content,
                    time: new Date(message.created_at).toLocaleTimeString(),
                    type:
                      message.sender_id === currentUserId ? "sent" : "received",
                  }}
                  isGroup={chatInfo?.is_group}
                />
              );
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex bg-transparent space-x-3 items-center px-2">
        <IoIosArrowDropdownCircle className="text-gray-400" />
        <div className="flex border bg-green-100 border-gray-200 items-center space-x-1 p-1 rounded-t-md hover:bg-gray-100 cursor-pointer">
          <span className="text-xs text-green-700 font-semibold ">
            Whatsapp
          </span>
          <MdInfo className="text-gray-400" />
        </div>{" "}
        <div className="flex border bg-yellow-100 border-gray-200 items-center space-x-1 p-1 rounded-t-md hover:bg-gray-100 cursor-pointer">
          <span className="text-xs text-yellow-700 font-semibold">
            Private Note
          </span>
          <MdInfo className="text-gray-400 " />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
            disabled={sending}
          />
          <div
            className={`w-10 h-10 text-green-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-100 ${
              sending ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => !sending && handleSend()}
            title={sending ? "Sending..." : "Send Message"}
          >
            <IoMdSend />
          </div>
        </div>

        {sendError && (
          <p className="text-red-600 text-xs mt-1 px-2">{sendError}</p>
        )}

        <div className="flex w-full justify-between px-1 py-2">
          <div className="flex space-x-4 items-center text-gray-600">
            <GrAttachment />
            <FaRegClock />
            <PiClockClockwiseFill className="h-5 w-5" />
            <BsStars className="h-5 w-5 -rotate-90" />
            <MdInsertChart className="h-5 w-5 rotate-90" />
            <IoMic className="h-5 w-5" />
          </div>
          <div className="flex border border-gray-200 items-center space-x-1 px-2 rounded hover:bg-gray-100 cursor-pointer">
            <span className="text-sm">Periskope</span>
            <CgScrollV />
          </div>
        </div>
      </div>
    </div>
  );
}
