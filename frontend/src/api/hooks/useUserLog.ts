const url = "/api/userlog";
import { useEffect, useState } from "react";
import { iUserLog } from "../models/userlog.interface";
import { useAuth } from "./useAuthContext";
import { useUserData } from "./useUserDataContext";

const useGetUserLogs = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<iUserLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setUserLogs, setCurrentUserLog } = useUserData();

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
        const todayString = new Date().toDateString();
        const todayLog = data.find((log) => {
          return new Date(log.date).toDateString() === todayString;
        });

        if (todayLog) {
          setCurrentUserLog(todayLog);
        } else {
          setCurrentUserLog({
            _id: "",

            date: new Date(),
            breakfast: { calories: 0, protein: 0 },
            lunch: { calories: 0, protein: 0 },
            dinner: { calories: 0, protein: 0 },
            snacks: { calories: 0, protein: 0 },
            exercise: { calories: 0 },
            bodyweight: 0,
            user_id: "",
          });
        }
        setUserLogs(data);
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
