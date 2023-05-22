const url = "http://localhost:5100/userlog";
import { useEffect, useState } from "react";
import { UserLog } from "../models/userlog";

const useUserLogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserLogs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const data = (await res.json()) as UserLog[];
        if (res.ok) {
          setData(data);
        }
        // update after I decide backend error handling
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

    fetchUserLogs();
  }, []);

  return { isLoading, data, error };
};

const useAddUserLog = async (userlog: UserLog) => {
  try {
    const res = await fetch(`${url}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userlog),
    });
    if (!res.ok) {
      throw new Error("Error adding userlog");
    }
  } catch (err) {
    if (typeof err === "string") {
      throw new Error(err);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export { useUserLogs, useAddUserLog };
