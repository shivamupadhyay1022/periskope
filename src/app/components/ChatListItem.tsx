import React from "react";

export interface ChatListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  avatar = "?",
  lastMessage = "",
  time,
  unread = 0,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 cursor-pointer border-b border-gray-100  
      ${isActive ? "bg-green-50" : "hover:bg-gray-50"} focus:outline-none`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold">
        {avatar}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
          {time && <span className="text-xs text-gray-500">{time}</span>}
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">{lastMessage}</p>
      </div>
      {unread > 0 && (
        <div className="ml-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {unread}
        </div>
      )}
    </div>
  );
};
