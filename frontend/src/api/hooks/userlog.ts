const url = "http://localhost:5100/userlog";
import { useEffect, useState } from "react";
import { UserLog } from "../models/userlog";

// do a custom hook to handle all the fetching, return the data, return an error if there was an error, and return a boolean if the data is loading. An object with three values.
// hook will have a state value of isLoading. When start fetch isLoading is True, when fetch is complete isLoading is False
// will have a state value of data. when fetch is done setData to the data from the fetch
// surround fetch request in try catch block. In hook catch the error, then setError to whatever value I want.
// hook could have retries built in. If fetch fails, try again. If fetch fails again, try again. If fetch fails again, try again. If fetch fails again, setError to whatever value I want.

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

export { useUserLogs };
