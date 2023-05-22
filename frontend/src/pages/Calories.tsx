import { useState, useEffect } from "react";
import InfoIsland from "../components/InfoIsland";
import { UserLog } from "../api/models/userlog";
import Addcalories from "../components/Addcalories";
import { useUserLogs } from "../api/hooks/userlog";

const Calories = () => {
  const { data: userLogs, error, isLoading } = useUserLogs();

  const [currentLog, setCurrentLog] = useState<UserLog>();

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
    <div className="calories">
      <h1>Calories</h1>
      <div className="user-logs">
        {!isLoading && currentLog && (
          <>
            <InfoIsland
              number={
                1800 -
                (currentLog.breakfast +
                  currentLog.lunch +
                  currentLog.dinner +
                  currentLog.snacks -
                  currentLog.exercise)
              }
              string="Calories remaining"
            />
            <Addcalories userlog={currentLog} setCurrentLog={setCurrentLog} />
          </>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Calories;
