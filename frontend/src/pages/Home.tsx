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
  const [calories, setCalories] = useState<boolean>(true);

  // add authorization context
  // add context for user data (could be inside auth context)
  useEffect(() => {
    if (!isLoading) {
      setCurrentLog(
        userLogs.find((userLog: UserLog) => {
          const date = new Date();
          const today = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          const logDate = new Date(userLog.date);
          return today.getTime() === logDate.getTime();
        })
      );
    }
  }, [userLogs, isLoading]);

  return (
    <>
      {calories && currentLog && (
        <Calories userlog={currentLog} setCurrentLog={setCurrentLog} />
      )}
      {!calories && currentLog && (
        <Weight userlog={currentLog} setCurrentLog={setCurrentLog} />
      )}
      <button onClick={() => setCalories(!calories)}>Weight</button>
      {userLogs && <History userLogs={userLogs} />}
    </>
  );
};

export default Home;
