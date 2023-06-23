import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
const initialContextValue = {
    userLogs: null,
    currentUserLog: null,
    setUserLogs: () => {
        null;
    },
    setCurrentUserLog: () => {
        null;
    },
};
export const UserDataContext = createContext(initialContextValue);
export const UserDataProvider = ({ children }) => {
    const [userLogs, setUserLogs] = useState(null);
    const [currentUserLog, setCurrentUserLog] = useState(null);
    return (_jsx(UserDataContext.Provider, { value: { userLogs, setUserLogs, currentUserLog, setCurrentUserLog }, children: children }));
};
