const url = "http://localhost:5100/api/userlog";
import { useEffect, useState } from "react";
import { iUserLog } from "../models/userlog.interface";

const useGetUserLogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<iUserLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUserLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
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
    console.log("heyyyy i just fired");
    fetchUserLogs();
  }, []);

  return { isLoading, data, error };
};

export { useGetUserLogs };
