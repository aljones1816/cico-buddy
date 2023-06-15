import InfoIsland from "./InfoIsland";
import { iUserLog } from "../api/models/userlog.interface";
import { useState, useEffect } from "react";
import { useAuth } from "../api/hooks/useAuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";
import WeightHistory from "./WeightHistory";

interface WeightProps {
  currentLog: iUserLog;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[]>>;
}

interface WeightFormInput {
  bodyweight: number;
}

const Weight = ({ currentLog, setUserLogs }: WeightProps) => {
  const [userLog, setUserLog] = useState<iUserLog>({} as iUserLog);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeightFormInput>();

  useEffect(() => {
    setUserLog(currentLog);
  }, [currentLog]);

  const onSubmit: SubmitHandler<WeightFormInput> = async (data) => {
    if (!user) return;

    const isNewLog = !currentLog._id;

    const requestUrl = isNewLog
      ? "/api/userlog/add"
      : `/api/userlog/update/${userLog._id}`;

    const cleanData = {
      ...data,
      email: "email@email.com",
      bodyweight: Math.round(data.bodyweight * 10) / 10 || "0",
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
    <VStack align="center" spacing="4">
      <InfoIsland number={userLog.bodyweight} string="Today's weight" />

      <Box as="form" onSubmit={handleSubmit(onSubmit)} color="whiteAlpha.800">
        <VStack align="start" spacing="2">
          <HStack spacing="2" mb="4">
            <FormLabel htmlFor="bodyweight" fontWeight="bold" fontSize="xl">
              Weight:
            </FormLabel>

            <Input
              type="float"
              id="bodyweight"
              defaultValue={userLog.bodyweight}
              {...register("bodyweight")}
            />
          </HStack>
        </VStack>

        <Button type="submit" colorScheme="green">
          Submit
        </Button>
      </Box>
      <WeightHistory />
    </VStack>
  );
};

export default Weight;
