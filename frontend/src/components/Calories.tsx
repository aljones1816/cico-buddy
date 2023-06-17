import { useEffect, useState } from "react";
import { useAuth } from "../api/hooks/useAuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  HStack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import MacroIsland from "./MacroIsland";
import MacroFormField from "./MacroFormField";

export interface CaloriesFormInput {
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
  exercise: number;
}

const Calories = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<CaloriesFormInput>();
  const { fetchUserLogs } = useGetUserLogs();
  const { currentUserLog } = useUserData();
  const [hasCurrentLog, setHasCurrentLog] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUserLog?._id) {
      setHasCurrentLog(false);
    }
    if (currentUserLog?._id) {
      setHasCurrentLog(true);
    }
  }, [currentUserLog]);

  const onSubmit: SubmitHandler<CaloriesFormInput> = async (data) => {
    if (!user) return;

    const isNewLog = !currentUserLog?._id;

    const requestUrl = isNewLog
      ? "/api/userlog/add"
      : `/api/userlog/update/${currentUserLog?._id}`;

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
      await fetchUserLogs();
    }
  };

  if (!currentUserLog || !user) return <div>Loading...</div>;
  return (
    <VStack pb="80px">
      <MacroIsland />
      // form to update calories and protein
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        color="whiteAlpha.800"
        w="100vw"
      >
        <VStack align="start" spacing="2">
          <HStack
            spacing="2"
            justify="end"
            marginRight="10px"
            marginLeft="10px"
            w="calc(100% - 20px)"
          >
            <Spacer flex="1" marginRight="5px" marginLeft="5px" />

            <Text
              color="whiteAlpha.600"
              flex="1"
              marginRight="5px"
              marginLeft="5px"
              align="center"
            >
              Calories
            </Text>
            <Text
              color="whiteAlpha.600"
              flex="1"
              marginRight="5px"
              marginLeft="5px"
              align="center"
            >
              Protein
            </Text>
          </HStack>
          <FormControl id="calories">
            <MacroFormField
              label="Breakfast"
              id="breakfast"
              defaultValue={currentUserLog.breakfast}
              register={register}
            />
            <MacroFormField
              label="Lunch"
              id="lunch"
              defaultValue={currentUserLog.lunch}
              register={register}
            />
            <MacroFormField
              label="Dinner"
              id="dinner"
              defaultValue={currentUserLog.dinner}
              register={register}
            />
            <MacroFormField
              label="Snacks"
              id="snacks"
              defaultValue={currentUserLog.snacks}
              register={register}
            />
            <MacroFormField
              label="Exercise"
              id="exercise"
              defaultValue={currentUserLog.exercise}
              register={register}
            />
          </FormControl>
        </VStack>
        <Box display="flex" mb="5px" marginLeft="10px" marginRight="10px">
          <Button type="submit" colorScheme="green" flex="1">
            Update
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default Calories;
