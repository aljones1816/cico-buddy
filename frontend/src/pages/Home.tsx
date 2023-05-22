import { useState, useEffect } from "react";
import Calories from "../components/Calories";
import Weight from "../components/Weight";
import History from "../components/History";
import { UserLog } from "../api/models/userlog";
import { useUserLogs } from "../api/hooks/userlog";

const Home = () => {
  const { data: userLogs, error, isLoading } = useUserLogs();

  if (error) console.log(error);

  const [currentLog, setCurrentLog] = useState<UserLog>();

  // add authorization context
  // add context for user data (could be inside auth context)
  useEffect(() => {
    if (!isLoading) {
      setCurrentLog(
        userLogs.find((userLog: UserLog) => {
          const date = new Date();
          const todayString = date.toDateString();
          const userLogDate = new Date(userLog.date).toDateString();
          return todayString === userLogDate;
        })
      );
    }
  }, [userLogs, isLoading]);

  return (
    <>
      {currentLog && (
        <Calories userlog={currentLog} setCurrentLog={setCurrentLog} />
      )}
      {currentLog && (
        <Weight userlog={currentLog} setCurrentLog={setCurrentLog} />
      )}
      {userLogs && <History userLogs={userLogs} />}
    </>
  );
};

export default Home;
