import { iUserLog } from "../api/models/userlog.interface";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  ButtonGroup,
  IconButton,
  Text,
  HStack,
  FormControl,
  Spacer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import MacroFormField from "./MacroFormField";
import { CaloriesFormInput } from "./Macros";
import { useAuth } from "../api/hooks/useAuthContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";

const History = () => {
  const { userLogs: userData } = useUserData();
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<CaloriesFormInput>();
  const { user } = useAuth();
  const { fetchUserLogs } = useGetUserLogs();

  const handleEdit = (id: string) => {
    setEditingCardId(id);
  };

  const handCancelEdit = () => {
    setEditingCardId(null);
  };

  const handleSaveEdit: SubmitHandler<CaloriesFormInput> = async (data) => {
    if (!user) return;

    const requestUrl = `/api/userlog/update/${editingCardId}`;

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
      bodyweight: data.bodyweight || "0",
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
    setEditingCardId(null);
  };

  const handleDeleteLog = async (id: string) => {
    const res = await fetch(`/api/userlog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (res.ok) {
      await fetchUserLogs();
    }

    setEditingCardId(null);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Flex
        mt="10px"
        flexDirection="column-reverse"
        align="center"
        justify="center"
      >
        {userData.map((userLog: iUserLog, index) => (
          <Card
            w="100%"
            maxW="400px"
            key={index}
            bg="gray.600"
            borderTop="8px solid"
            borderColor="green.300"
            color="white"
            mb="10px"
          >
            <CardHeader fontWeight="bold" paddingTop="4px" paddingBottom="0px">
              {new Date(userLog.date).toDateString()}
            </CardHeader>
            {editingCardId === userLog._id ? (
              <CardBody paddingLeft="8px" paddingRight="8px">
                <Flex
                  as="form"
                  flexDirection="column"
                  align="center"
                  onSubmit={handleSubmit(handleSaveEdit)}
                  color="whiteAlpha.800"
                  mb="12%"
                  paddingTop="10px"
                  bg="gray.700"
                  borderRadius="10px"
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
                        defaultValue={userLog.breakfast}
                        inputType="number"
                        register={register}
                      />

                      <MacroFormField
                        label="Lunch"
                        id="lunch"
                        defaultValue={userLog.lunch}
                        inputType="number"
                        register={register}
                      />

                      <MacroFormField
                        label="Dinner"
                        id="dinner"
                        defaultValue={userLog.dinner}
                        inputType="number"
                        register={register}
                      />

                      <MacroFormField
                        label="Snacks"
                        id="snacks"
                        defaultValue={userLog.snacks}
                        inputType="number"
                        register={register}
                      />

                      <MacroFormField
                        label="Exercise"
                        id="exercise"
                        defaultValue={userLog.exercise}
                        inputType="number"
                        register={register}
                      />

                      <MacroFormField
                        label="Weight"
                        id="bodyweight"
                        defaultValue={{
                          calories: 0,
                          protein: 0,
                          bodyweight: userLog.bodyweight,
                        }}
                        inputType="float"
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
                  ></Flex>
                  <ButtonGroup position="absolute" bottom="10px" right="10px">
                    <IconButton
                      aria-label="update"
                      icon={<CheckIcon />}
                      onClick={handleSubmit(handleSaveEdit)}
                      colorScheme="green"
                    />
                    <IconButton
                      aria-label="cancel"
                      icon={<CloseIcon />}
                      onClick={() => handCancelEdit()}
                      colorScheme="orange"
                    />
                  </ButtonGroup>
                </Flex>
              </CardBody>
            ) : (
              <CardBody>
                <p>
                  Eaten:{" "}
                  {userLog.breakfast.calories +
                    userLog.lunch.calories +
                    userLog.dinner.calories +
                    userLog.snacks.calories}{" "}
                  calories
                </p>
                <p>
                  Protein:{" "}
                  {userLog.breakfast.protein +
                    userLog.lunch.protein +
                    userLog.dinner.protein +
                    userLog.snacks.protein}{" "}
                  grams
                </p>
                <p>Exercise: {userLog.exercise.calories} calories</p>
                <p>Bodyweight: {userLog.bodyweight} lbs</p>
                <ButtonGroup position="absolute" bottom="10px" right="10px">
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="edit"
                    colorScheme="blue"
                    onClick={() => handleEdit(userLog._id)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="delete"
                    colorScheme="red"
                    onClick={() => handleDeleteLog(userLog._id)}
                  />
                </ButtonGroup>
              </CardBody>
            )}
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default History;
