const url = "/api/userlog";
import { useEffect, useState } from "react";
import { iUserLog } from "../models/userlog.interface";
import { useAuth } from "./useAuthContext";

const useGetUserLogs = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<iUserLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUserLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = (await res.json()) as iUserLog[];
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

  useEffect(() => {
    if (user) {
      fetchUserLogs();
    }
  }, [user]);

  return { isLoading, data, error, setData, fetchUserLogs };
};

export { useGetUserLogs };
