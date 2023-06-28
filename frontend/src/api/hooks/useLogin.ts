import { useState } from "react";
import { useAuth } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const apiURL = import.meta.env.VITE_API_URL;

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(apiURL + "/user/login", {
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
        if (data.error === "Error: Email and password required") {
          setError("Email and password required");
        } else if (
          data.error === "Error: Incorrect email" ||
          data.error === "Error: Incorrect password"
        ) {
          setError("Incorrect email or password");
        } else {
          setError("Something went wrong! Please try again.");
        }
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
