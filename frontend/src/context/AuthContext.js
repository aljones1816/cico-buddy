import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from "react";
const initialAuthContextValue = {
    user: null,
    login: () => {
        null;
    },
    logout: () => {
        null;
    },
};
export const AuthContext = createContext(initialAuthContextValue);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
    };
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
