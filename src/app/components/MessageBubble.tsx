import React from "react";

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  type: "sent" | "received" | "system";
  avatar?: string;
}

interface MessageBubbleProps {
  message: Message;
  isGroup: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isGroup }) => {
  if (message.type === "system") {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500  shadow">
          {message.content}
        </div>
      </div>
    );
  }

  const isReceived = message.type === "received";

  return (
    <div className={`flex ${isReceived ? "justify-start" : "justify-end"}`}>
      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
        {isReceived && message.avatar && (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold">{message.avatar}</span>
          </div>
        )}

        <div className="flex flex-col my-2">
          {/* Sender */}
          

          {/* Message bubble */}
          <div
            className={`px-3 py-2 rounded-lg shadow ${
              isReceived
                ? "bg-white text-gray-900"
                : "bg-green-100 text-gray-900"
            }`}
          >          {isGroup && <span className="text-xs text-green-500 mb-1">{message.sender}</span>}

            <p className="text-sm">{message.content}</p>
            <div className="flex items-center justify-end mt-1 space-x-1">
              <span className="text-[10px] text-gray-500 ">{message.time}</span>
              {!isReceived && <span className="text-gray-400 text-xs">✓</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
