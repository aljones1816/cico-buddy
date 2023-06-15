import { useState, useEffect } from "react";
import Calories from "../components/Calories";
import Weight from "../components/Weight";
import History from "../components/History";
import { iUserLog } from "../api/models/userlog.interface";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import Navfooter from "../components/Navfooter";
import { useUserData } from "../api/hooks/useUserDataContext";

import Navbar from "../components/Navbar";
import { VStack, Spacer } from "@chakra-ui/react";

const Home = () => {
  const {
    isLoading,
    data: userLogs,
    setData: setUserLogs,
    error,
  } = useGetUserLogs();

  const { userLogs: userData } = useUserData();

  useEffect(() => {
    if (userData) {
      console.log("the logs currently is: ", userData);
    }
  }, [userData]);

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
    user_id: "",
  });

  const [isCalories, setIsCalories] = useState<boolean>(false);
  const [isWeight, setIsWeight] = useState<boolean>(false);
  const [isHistory, setIsHistory] = useState<boolean>(false);

  useEffect(() => {
    setIsCalories(true);
  }, []);

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
    <VStack minH="100vh" minW="100vw" align="center" bg="black">
      <Navbar
        isCalories={isCalories}
        isWeight={isWeight}
        isHistory={isHistory}
      />
      {currentLog && isCalories && (
        <Calories currentLog={currentLog} setUserLogs={setUserLogs} />
      )}
      {currentLog && isWeight && (
        <Weight currentLog={currentLog} setUserLogs={setUserLogs} />
      )}
      {userLogs && isHistory && <History />}
      <Spacer />
      <Navfooter
        isCalorie={isCalories}
        isWeight={isWeight}
        isHistory={isHistory}
        setIsCalorie={setIsCalories}
        setIsWeight={setIsWeight}
        setIsHistory={setIsHistory}
      />
    </VStack>
  );
};

export default Home;
