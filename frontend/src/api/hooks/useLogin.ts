import { useState } from "react";
import { useAuth } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // save he user to local storage
        localStorage.setItem("user", JSON.stringify(data));
        login(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleLogin };
};
