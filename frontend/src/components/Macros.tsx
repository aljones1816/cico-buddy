import { useAuth } from "../api/hooks/useAuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import {
  Button,
  FormControl,
  Box,
  HStack,
  Text,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import MacroIsland from "./MacroIsland";
import MacroFormField from "./MacroFormField";

export interface CaloriesFormInput {
  breakfast: { calories: number; protein: number };
  lunch: { calories: number; protein: number };
  dinner: { calories: number; protein: number };
  snacks: { calories: number; protein: number };
  exercise: { calories: number };
  bodyweight: number;
}

const Macros = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<CaloriesFormInput>();
  const { fetchUserLogs } = useGetUserLogs();
  const { currentUserLog } = useUserData();

  const onSubmit: SubmitHandler<CaloriesFormInput> = async (data) => {
    if (!user) return;

    const isNewLog = !currentUserLog?._id;

    const requestUrl = isNewLog
      ? "/api/userlog/add"
      : `/api/userlog/update/${currentUserLog?._id}`;

    const cleanData = {
      breakfast: {
        calories: data.breakfast.calories || "0",
        protein: data.breakfast.protein || "0",
      },
      lunch: {
        calories: data.lunch.calories || "0",
        protein: data.lunch.protein || "0",
      },
      dinner: {
        calories: data.dinner.calories || "0",
        protein: data.dinner.protein || "0",
      },
      snacks: {
        calories: data.snacks.calories || "0",
        protein: data.snacks.protein || "0",
      },
      exercise: { calories: data.exercise.calories || "0" },
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
    <Flex flexDirection="column" align="center" h="100%">
      <Box flex="1">
        <MacroIsland />
      </Box>

      <Flex
        as="form"
        flexDirection="column"
        align="center"
        onSubmit={handleSubmit(onSubmit)}
        color="whiteAlpha.800"
        w="100vw"
        flex="6"
      >
        <Flex align="center" flexDirection="column" maxW="600px">
          <HStack
            spacing="2"
            justify="end"
            marginRight="10px"
            marginLeft="10px"
            w="calc(100% - 20px)"
            mb="2"
          >
            <Spacer flex="2" marginRight="5px" marginLeft="5px" />

            <Text
              color="whiteAlpha.600"
              flex="3"
              marginRight="5px"
              marginLeft="5px"
              align="center"
            >
              Calories
            </Text>
            <Text
              color="whiteAlpha.600"
              flex="3"
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
              inputType="number"
              register={register}
            />

            <MacroFormField
              label="Lunch"
              id="lunch"
              defaultValue={currentUserLog.lunch}
              inputType="number"
              register={register}
            />

            <MacroFormField
              label="Dinner"
              id="dinner"
              defaultValue={currentUserLog.dinner}
              inputType="number"
              register={register}
            />

            <MacroFormField
              label="Snacks"
              id="snacks"
              defaultValue={currentUserLog.snacks}
              inputType="number"
              register={register}
            />

            <MacroFormField
              label="Exercise"
              id="exercise"
              defaultValue={currentUserLog.exercise}
              inputType="number"
              register={register}
            />
          </FormControl>
        </Flex>
        <Flex
          marginLeft="10px"
          marginRight="10px"
          justify="center"
          w="80%"
          maxW="300px"
        >
          <Button type="submit" colorScheme="green" flex="1">
            Update
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Macros;
