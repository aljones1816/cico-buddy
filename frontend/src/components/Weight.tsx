import { useEffect, useState } from "react";
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
  Card,
  CardBody,
  Flex,
  IconButton,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import WeightHistory from "./WeightHistory";
import { EditIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";

interface WeightFormInput {
  bodyweight: number;
}

const Weight = () => {
  const { user } = useAuth();
  const { fetchUserLogs } = useGetUserLogs();
  const { currentUserLog } = useUserData();
  const { register, handleSubmit } = useForm<WeightFormInput>();
  const [hasCurrentLog, setHasCurrentLog] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const apiURL = import.meta.env.VITE_API_URL;

  // create an array with the bodyweight and date from each userlog

  useEffect(() => {
    if (currentUserLog?.bodyweight === 0 || !currentUserLog?.bodyweight) {
      setHasCurrentLog(false);
    } else setHasCurrentLog(true);
  }, [currentUserLog]);

  const onSubmit: SubmitHandler<WeightFormInput> = async (data) => {
    if (!user) return;

    const isNewLog = !currentUserLog?._id;

    const requestUrl = isNewLog
      ? apiURL + "/userlog/add"
      : apiURL + `/userlog/update/${currentUserLog._id}`;

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
    setIsEditing(false);
  };

  if (!currentUserLog) return <div>Loading...</div>;
  return (
    <Flex align="center" justify="center" flexDirection="column" h="100%">
      <Card
        bg="gray.600"
        color="white"
        borderTop="5px solid"
        borderColor="green.300"
        className="info-island"
        w="60vw"
        maxW="300px"
        maxH="250px"
        minH="150px"
        textAlign="center"
        justify="center"
        borderRadius="xl"
        m="5"
        flex="1"
      >
        {!isEditing && (
          <CardBody>
            {hasCurrentLog && (
              <Text fontSize="xl">Weight: {currentUserLog.bodyweight} lbs</Text>
            )}
            {!hasCurrentLog && <Text fontSize="xl">Enter today's weight!</Text>}

            <Box position="absolute" bottom="10px" right="10px">
              {hasCurrentLog ? (
                <IconButton
                  icon={<EditIcon />}
                  aria-label="edit"
                  onClick={() => setIsEditing(true)}
                  colorScheme="blue"
                />
              ) : (
                <IconButton
                  icon={<AddIcon />}
                  aria-label="edit"
                  onClick={() => setIsEditing(true)}
                  colorScheme="blue"
                />
              )}
            </Box>
          </CardBody>
        )}
        {isEditing && (
          <CardBody>
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              color="whiteAlpha.800"
            >
              <VStack align="start" spacing="2">
                <HStack spacing="2" mb="4">
                  <FormLabel
                    htmlFor="bodyweight"
                    fontWeight="bold"
                    fontSize="l"
                  >
                    Enter weight:
                  </FormLabel>

                  <Input
                    type="float"
                    id="bodyweight"
                    defaultValue={currentUserLog.bodyweight}
                    {...register("bodyweight")}
                  />
                </HStack>
              </VStack>
              {hasCurrentLog && (
                <ButtonGroup>
                  <Button type="submit" colorScheme="green">
                    Update
                  </Button>
                  <IconButton
                    aria-label="cancel"
                    icon={<CloseIcon />}
                    onClick={() => setIsEditing(false)}
                    colorScheme="red"
                  />
                </ButtonGroup>
              )}
              {!hasCurrentLog && (
                <ButtonGroup>
                  <Button type="submit" colorScheme="green">
                    Add
                  </Button>
                  <IconButton
                    aria-label="cancel"
                    icon={<CloseIcon />}
                    onClick={() => setIsEditing(false)}
                    colorScheme="red"
                  />
                </ButtonGroup>
              )}
            </Box>
          </CardBody>
        )}
      </Card>

      <Flex flex="2" w="100vw" justify="center" align="center">
        <WeightHistory />
      </Flex>
    </Flex>
  );
};

export default Weight;
