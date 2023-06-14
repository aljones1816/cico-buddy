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
  NumberInput,
} from "@chakra-ui/react";

interface WeightProps {
  currentLog: iUserLog;
  setUserLogs: React.Dispatch<React.SetStateAction<iUserLog[]>>;
}

interface WeightFormInput {
  weight: number;
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
      bodyweight: Math.round(data.weight * 10) / 10 || "0",
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
    <>
      <InfoIsland number={userLog.bodyweight} string="Today's weight" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="weight">
          <FormLabel htmlFor="weight">Weight</FormLabel>
          <Input
            type="float"
            id="weight"
            defaultValue={userLog.bodyweight}
            {...register("weight")}
          />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </>
  );
};

export default Weight;
