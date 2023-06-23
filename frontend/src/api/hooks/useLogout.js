import { useState } from "react";
import { useAuth } from "./useAuthContext";
import { useGetUserLogs } from "./useUserLog";
export const useLogout = () => {
    const [error, setError] = useState(null);
    const { logout } = useAuth();
    const { setData } = useGetUserLogs();
    const handleLogout = async () => {
        try {
            localStorage.removeItem("user");
            logout();
            setData([]);
        }
        catch (err) {
            if (typeof err === "string") {
                setError(err);
            }
            else {
                setError("An unknown error occurred");
            }
        }
    };
    return { error, handleLogout };
};
