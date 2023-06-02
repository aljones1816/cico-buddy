import { useState } from "react";
import { useAuth } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      logout();
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return { error, handleLogout };
};
