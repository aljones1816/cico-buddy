import { useEffect, useState } from "react";
import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useAuth } from "../api/hooks/useAuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

interface CaloriesProps {
  currentLog: iUserLog;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[]>>;
}

interface CaloriesFormInput {
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
  exercise: number;
}

const Calories = ({ currentLog, setUserLogs }: CaloriesProps) => {
  const [userLog, setUserLog] = useState<iUserLog>({} as iUserLog);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaloriesFormInput>();

  useEffect(() => {
    setUserLog(currentLog);
  }, [currentLog]);

  const onSubmit: SubmitHandler<CaloriesFormInput> = async (data) => {
    if (!user) return;

    const isNewLog = !currentLog._id;

    const requestUrl = isNewLog
      ? "/api/userlog/add"
      : `/api/userlog/update/${userLog._id}`;

    const cleanData = {
      ...data,
      email: user.email,
      breakfast: data.breakfast || "0",
      lunch: data.lunch || "0",
      dinner: data.dinner || "0",
      snacks: data.snacks || "0",
      exercise: data.exercise || "0",
    };

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(cleanData),
    });

    if (res.ok) {
      const updatedLogResponse = await fetch("/api/userlog/", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const updatedLogData = await updatedLogResponse.json();

      setUserLogs(updatedLogData);
    }
  };

  return (
    <VStack minH="100vh" minW="100vw" pb="80px">
      {user && (
        <InfoIsland
          number={
            user.calorie_goal -
            (userLog.breakfast +
              userLog.lunch +
              userLog.dinner +
              userLog.snacks -
              userLog.exercise)
          }
          string="Calories remaining"
        ></InfoIsland>
      )}

      <Box as="form" onSubmit={handleSubmit(onSubmit)} color="whiteAlpha.800">
        <VStack align="start" spacing="2">
          <HStack spacing="2" align="end">
            <Text color="whiteAlpha.600">Calories</Text>
            <Text color="whiteAlpha.600">Protein</Text>
          </HStack>
          <FormControl id="calories">
            <HStack spacing="2" mb="4">
              <FormLabel htmlFor="breakfast" fontWeight="bold" fontSize="xl">
                Breakfast
              </FormLabel>

              <Input
                type="number"
                id="breakfast"
                defaultValue={userLog.breakfast}
                {...register("breakfast")}
              />
            </HStack>

            <HStack spacing="2" mb="4">
              <FormLabel htmlFor="lunch" fontWeight="bold" fontSize="xl">
                Lunch
              </FormLabel>
              <Input
                type="number"
                id="lunch"
                defaultValue={userLog.lunch}
                {...register("lunch")}
              />
            </HStack>

            <HStack spacing="2" mb="4">
              <FormLabel htmlFor="dinner" fontWeight="bold" fontSize="xl">
                Dinner
              </FormLabel>
              <Input
                type="number"
                id="dinner"
                defaultValue={userLog.dinner}
                {...register("dinner")}
              />
            </HStack>

            <HStack spacing="2" mb="4">
              <FormLabel htmlFor="snacks" fontWeight="bold" fontSize="xl">
                Snacks
              </FormLabel>
              <Input
                type="number"
                id="snacks"
                defaultValue={userLog.snacks}
                {...register("snacks")}
              />
            </HStack>

            <HStack spacing="2" mb="4">
              <FormLabel htmlFor="exercise" fontWeight="bold" fontSize="xl">
                Exercise
              </FormLabel>
              <Input
                type="number"
                id="exercise"
                defaultValue={userLog.exercise}
                {...register("exercise")}
              />
            </HStack>
          </FormControl>
        </VStack>

        <Button type="submit" colorScheme="green">
          Submit
        </Button>
      </Box>
    </VStack>
  );
};

export default Calories;
