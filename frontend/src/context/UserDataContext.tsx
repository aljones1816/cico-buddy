import React, { createContext, useState } from "react";
import { iUserLog } from "../api/models/userlog.interface";

interface iUserDataContext {
  userLogs: iUserLog[] | null;
  currentUserLog: iUserLog | null;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[] | null>>;
  setCurrentUserLog: React.Dispatch<React.SetStateAction<iUserLog | null>>;
}

const initialContextValue: iUserDataContext = {
  userLogs: null,
  currentUserLog: null,
  setUserLogs: () => {
    null;
  },
  setCurrentUserLog: () => {
    null;
  },
};

interface UserDataProviderProps {
  children: React.ReactNode;
}

export const UserDataContext = createContext(initialContextValue);

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [userLogs, setUserLogs] = useState<iUserLog[] | null>(null);
  const [currentUserLog, setCurrentUserLog] = useState<iUserLog | null>(null);

  return (
    <UserDataContext.Provider
      value={{ userLogs, setUserLogs, currentUserLog, setCurrentUserLog }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
