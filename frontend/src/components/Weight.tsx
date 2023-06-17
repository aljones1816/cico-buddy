import { useEffect, useState } from "react";
import InfoIsland from "./InfoIsland";
import { useAuth } from "../api/hooks/useAuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import {
  Button,
  FormLabel,
  Input,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import WeightHistory from "./WeightHistory";

interface WeightFormInput {
  bodyweight: number;
}

const Weight = () => {
  const { user } = useAuth();
  const { fetchUserLogs } = useGetUserLogs();
  const { currentUserLog } = useUserData();
  const { register, handleSubmit } = useForm<WeightFormInput>();
  const [hasCurrentLog, setHasCurrentLog] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUserLog?._id) {
      setHasCurrentLog(false);
    }
    if (currentUserLog?._id) {
      setHasCurrentLog(true);
    }
  }, [currentUserLog]);

  const onSubmit: SubmitHandler<WeightFormInput> = async (data) => {
    if (!user) return;

    const isNewLog = !currentUserLog?._id;

    const requestUrl = isNewLog
      ? "/api/userlog/add"
      : `/api/userlog/update/${currentUserLog._id}`;

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
      fetchUserLogs();
    }
  };

  if (!currentUserLog) return <div>Loading...</div>;
  return (
    <VStack align="center" spacing="4">
      <InfoIsland
        number={currentUserLog.bodyweight}
        string="Today's weight"
        hasCurrentLog={hasCurrentLog}
      />

      <Box as="form" onSubmit={handleSubmit(onSubmit)} color="whiteAlpha.800">
        <VStack align="start" spacing="2">
          <HStack spacing="2" mb="4">
            <FormLabel htmlFor="bodyweight" fontWeight="bold" fontSize="xl">
              Weight:
            </FormLabel>

            <Input
              type="float"
              id="bodyweight"
              defaultValue={currentUserLog.bodyweight}
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
