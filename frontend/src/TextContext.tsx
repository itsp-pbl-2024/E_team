import React, { createContext, useState, ReactNode } from 'react';

interface TextContextProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const TextContext = createContext<TextContextProps | undefined>(undefined);

export const TextProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState('');

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};