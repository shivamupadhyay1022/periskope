"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ChatListItem } from "./ChatListItem";
import { IoChatbubbleOutline } from "react-icons/io5";

import { IoSearch, IoFilterSharp, IoCloseCircleSharp } from "react-icons/io5";
import { RiFolderDownloadFill } from "react-icons/ri";
import { useAuth } from "@/app/context/AuthContext";
import { useChat } from "@/app/context/ChatContext";
interface ChatRow {
  id: string;
  name: string;
  updated_at: string;
  last_message: string;
}

export default function ChatSidebar() {
  const { user } = useAuth();
  const { activeChatId, setActiveChatId } = useChat();

  const [chats, setChats] = useState<ChatRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState<ChatRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const fetchChats = async () => {
    if (!user) return;

    setLoading(true);

    // Step 1: Get all chat_ids where user is a participant
    const { data: participants, error: participantsError } = await supabase
      .from("chat_participants")
      .select("chat_id,display_name")
      .eq("user_id", user.id);
      
    if (participantsError || !participants) {
      console.error("❌ Error fetching chat_participants:", participantsError);
      setLoading(false);
      return;
    }

    const chatIds = participants.map((p) => p.chat_id);
      const displayNameMap = participants.reduce((acc, p) => {
    acc[p.chat_id] = p.display_name;
    return acc;
  }, {} as Record<string, string>);
    // Step 2: Fetch chat data for each chat_id in one query
    const { data: chatData, error: chatError } = await supabase
      .from("chats")
      .select("id, name, updated_at, last_message_id")
      .in("id", chatIds);

    if (chatError || !chatData) {
      console.error("❌ Error fetching chats:", chatError);
      setLoading(false);
      return;
    }

    const sortedChats = chatData
      .filter((chat) => chat.updated_at)
      .sort(
        (a, b) =>
          new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime()
      )
      .map((chat) => ({
        id: chat.id,
        name: displayNameMap[chat.id] ?? "Unnamed",
        updated_at: chat.updated_at ?? "",
        last_message: chat.last_message_id ?? "",
      }));

    setChats(sortedChats);
    setFilteredChats(sortedChats);
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, [user]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredChats(chats);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredChats(
        chats.filter(
          (chat) =>
            chat.name.toLowerCase().includes(term) ||
            chat.last_message.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, chats]);

  return (
    <div className="w-1/3  bg-white border-r h-[93.8vh] border-gray-200 flex flex-col ">
      {/* UI omitted for brevity — reuse your existing buttons/search */}
      {/* Filters + Search */}
      <div className="h-16 flex justify-between px-2 py-1 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button className="px-3 flex items-center gap-1 text-green-700">
            <RiFolderDownloadFill />
            <span className="text-sm font-semibold">Custom filter</span>
          </button>
          <button className="px-2 py-1 border border-gray-200 text-gray-600 rounded-sm text-sm">
            Save
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSearch(!activeSearch)}
            className="flex items-center px-2 py-1 border border-gray-200 text-gray-600 rounded-sm text-sm"
          >
            <IoSearch /> <span>Search</span>
          </button>
          <button className="relative px-3 flex items-center gap-1 text-green-700">
            <IoFilterSharp />
            <span className="text-sm font-semibold">Filtered</span>
            <IoCloseCircleSharp className="absolute h-4 w-4 -top-3 -right-1" />
          </button>
        </div>
      </div>
      <div className="bg-green-600 text-white rounded-full p-2 bottom-6 left-[410px] absolute" >
        <IoChatbubbleOutline />
      </div>

      <div className="flex-1">
        {loading && (
          <div className="text-center py-4 text-gray-500">Loading chats...</div>
        )}
        {!loading &&
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              name={chat.name}
              avatar={chat.name.charAt(0).toUpperCase()}
              lastMessage={chat.last_message}
              time={formatTime(chat.updated_at)}
              isActive={activeChatId === chat.id}
              onClick={() => setActiveChatId(chat.id)}
            />
          ))}
      </div>
    </div>
  );
}
