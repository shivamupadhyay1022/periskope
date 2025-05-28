'use client';

import React, { createContext, useContext, useState } from 'react';

interface ChatContextType {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  displayName: string | null;
  SetDisplayName: (id: string | null) => void;
}

const ChatContext = createContext<ChatContextType>({
  activeChatId: null,
  setActiveChatId: () => {},
  displayName: null,
  SetDisplayName: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [displayName, SetDisplayName] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ activeChatId, setActiveChatId,displayName,SetDisplayName }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
