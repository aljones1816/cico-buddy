import { useAuth } from "../api/hooks/useAuthContext";
import { useUserData } from "../api/hooks/useUserDataContext";
import {
  Card,
  CardBody,
  HStack,
  VStack,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const MacroIsland = () => {
  const { user } = useAuth();
  const { currentUserLog } = useUserData();
  const [calorieTotal, setCalorieTotal] = useState<number>(0);

  useEffect(() => {
    if (currentUserLog) {
      setCalorieTotal(
        currentUserLog.breakfast +
          currentUserLog.lunch +
          currentUserLog.dinner +
          currentUserLog.snacks -
          currentUserLog.exercise
      );
    }
  }, [currentUserLog]);

  if (!user || !currentUserLog) return <div>Loading...</div>;

  return (
    <Card
      bg="gray.600"
      color="white"
      borderTop="5px solid"
      borderColor="green.300"
      className="info-island"
      w="60vw"
      maxW="200px"
      textAlign="center"
      borderRadius="xl"
      m="5"
      position="relative"
      overflow="hidden"
    >
      <CardBody>
        <HStack>
          <VStack
            id="macros"
            flex="1"
            spacing="2"
            pr="2"
            borderRight="1px solid white"
          >
            <Text fontSize="xs">Calories</Text>
            <Text fontSize="xx-small">
              {calorieTotal} / {user.calorie_goal}
            </Text>
            <CircularProgress
              thickness="10px"
              value={(calorieTotal / user.calorie_goal) * 100}
            />
          </VStack>
          <VStack id="protein" flex="1" spacing="2" pl="2">
            <Text fontSize="xs">Protein</Text>
            <Text fontSize="xx-small">
              {75} / {150}
            </Text>
            <CircularProgress color="orange.400" thickness="10px" value={45} />
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MacroIsland;
