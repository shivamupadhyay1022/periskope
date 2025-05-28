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
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  if (message.type === "system") {
    return (
      <div className="flex justify-center">
        <div className="bg-yellow-100 px-3 py-1 rounded-lg">
          <span className="text-sm text-gray-700">{message.sender}</span>
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
            <span className="text-xs">{message.avatar}</span>
          </div>
        )}
        <div>
          <div
            className={`px-3 py-2 rounded-lg font-semibold
               ${
                 isReceived
                   ? "bg-white text-gray-800"
                   : "bg-green-100 text-gray-800"
               }`}
          >
            <p className="text-sm">{message.content}</p>
            <div className="flex items-center justify-end mt-1 space-x-1">
              <span
                className={`text-xs ${
                  isReceived ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {message.time}
              </span>
              {!isReceived && (
                <span className="text-gray-400 text-xs">✓</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
