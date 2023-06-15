import { iUserLog } from "../api/models/userlog.interface";
import { Card, CardBody, CardHeader, VStack } from "@chakra-ui/react";
import { useUserData } from "../api/hooks/useUserDataContext";

const History = () => {
  const { userLogs: userData } = useUserData();

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <VStack minH="100vh" minW="100vw" pb="80px">
      {userData.map((userLog: iUserLog, index) => (
        <Card
          w="100%"
          key={index}
          bg="gray.600"
          borderTop="8px solid"
          borderColor="green.300"
          color="white"
        >
          <CardHeader>{new Date(userLog.date).toDateString()}</CardHeader>
          <CardBody>
            <p>
              Calories eaten:
              {userLog.breakfast +
                userLog.lunch +
                userLog.dinner +
                userLog.snacks}
            </p>
            <p>Exercise: {userLog.exercise}</p>
            <p>Bodyweight: {userLog.bodyweight}</p>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default History;
