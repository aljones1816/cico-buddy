import { useState, useEffect } from "react";
import Calories from "../components/Calories";
import Weight from "../components/Weight";
import History from "../components/History";
import { iUserLog } from "../api/models/userlog.interface";
import { useGetUserLogs } from "../api/hooks/useUserLog";

const Home = () => {
  const { isLoading, data: userLogs, error } = useGetUserLogs();
  const [currentLog, setCurrentLog] = useState<iUserLog>({
    _id: "",
    email: "",
    date: new Date(),
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
    exercise: 0,
    bodyweight: 0,
  });

  useEffect(() => {
    if (userLogs) {
      const todayString = new Date().toDateString();
      const todayLog = userLogs.find((log) => {
        return new Date(log.date).toDateString() === todayString;
      });

      if (todayLog) {
        setCurrentLog(todayLog);
      }
    }
  }, [userLogs]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;
  return (
    <>
      {currentLog && (
        <Calories currentLog={currentLog} setCurrentLog={setCurrentLog} />
      )}
      {currentLog && (
        <Weight currentLog={currentLog} setCurrentLog={setCurrentLog} />
      )}
      {userLogs && <History userLogs={userLogs} />}
    </>
  );
};

export default Home;
