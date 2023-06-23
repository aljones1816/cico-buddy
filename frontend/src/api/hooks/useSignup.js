import { useState } from "react";
import { useAuth } from "./useAuthContext";
export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const handleSignup = async (email, password) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/signup", {
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
            }
            else {
                if (data.error === "Error: Email and password required") {
                    setError("Email and password required");
                }
                else if (data.error === "Error: Password is not strong enough") {
                    setError("Password must be at least 8 characters long and contain at least one number and one special character");
                }
                else if (data.error === "Error: Email already exists") {
                    setError("That email is already in use");
                }
                else {
                    setError("Something went wrong! Please try again.");
                }
            }
        }
        catch (err) {
            if (typeof err === "string") {
                setError(err);
            }
            else {
                setError("An unknown error occurred");
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    return { isLoading, error, handleSignup };
};
