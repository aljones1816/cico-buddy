import { useState, useEffect } from "react";
import Calories from "../components/Calories";
import Weight from "../components/Weight";
import History from "../components/History";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import Navfooter from "../components/Navfooter";
import Navbar from "../components/Navbar";
import { Flex, useBreakpointValue, Text } from "@chakra-ui/react";

const Home = () => {
  const { isLoading, data: userLogs, error } = useGetUserLogs();

  const [isCalories, setIsCalories] = useState<boolean>(false);
  const [isWeight, setIsWeight] = useState<boolean>(false);
  const [isHistory, setIsHistory] = useState<boolean>(false);
  const navbarHeight = useBreakpointValue({
    base: "10vh",
    md: "8vh",
    lg: "5vh",
    sm: "12vh",
  });
  const footerHeight = useBreakpointValue({
    base: "10vh",
    md: "8vh",
    lg: "5vh",
    sm: "12vh",
  });

  useEffect(() => {
    setIsCalories(true);
  }, []);

  if (isLoading)
    return (
      <Flex
        bg="black"
        w="100vw"
        h="100vh"
        color="whiteAlpha.800"
        flexDir="column"
        justify="center"
        align="center"
      >
        <Text>Loading...</Text>
      </Flex>
    );
  if (error) return <h1>Something went wrong!</h1>;
  return (
    <Flex
      bg="black"
      w="100vw"
      h="100vh"
      flexDir="column"
      justify="space-between"
    >
      <Flex h={navbarHeight}>
        <Navbar
          isCalories={isCalories}
          isWeight={isWeight}
          isHistory={isHistory}
        />
      </Flex>

      <Flex flex="1" overflowY="auto" flexDir="column" alignItems="stretch">
        {isCalories && <Calories />}
        {isWeight && <Weight />}
        {userLogs && isHistory && <History />}
      </Flex>
      <Flex h={footerHeight}>
        <Navfooter
          isCalorie={isCalories}
          isWeight={isWeight}
          isHistory={isHistory}
          setIsCalorie={setIsCalories}
          setIsWeight={setIsWeight}
          setIsHistory={setIsHistory}
        />
      </Flex>
    </Flex>
  );
};

export default Home;
