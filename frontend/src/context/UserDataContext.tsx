import React, { createContext, useState, useEffect } from "react";
import { iUserLog } from "../api/models/userlog.interface.ts";

interface iUserDataContext {
  userLogs: iUserLog[] | null;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[] | null>>;
}

const initialContextValue: iUserDataContext = {
  userLogs: null,
  setUserLogs: () => {
    null;
  },
};

interface UserDataProviderProps {
  children: React.ReactNode;
}

export const UserDataContext = createContext(initialContextValue);

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [userLogs, setUserLogs] = useState<iUserLog[] | null>(null);

  return (
    <UserDataContext.Provider value={{ userLogs, setUserLogs }}>
      {children}
    </UserDataContext.Provider>
  );
};
