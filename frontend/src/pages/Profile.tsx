import { useAuth } from "../api/hooks/useAuthContext";
import { useState } from "react";
import { useLogout } from "../api/hooks/useLogout";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Avatar,
  Heading,
  Text,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserFormInput {
  name: string;
  age: string;
  calorie_goal: number;
}

const Profile = () => {
  const { user, login } = useAuth();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { handleLogout } = useLogout();
  const { register, handleSubmit } = useForm<UserFormInput>();

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    if (!user) return;

    const updatedUser = {
      name: data.name,
      age: data.age,
      calorie_goal: data.calorie_goal,
    };

    try {
      const res = await fetch(`/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      if (data) {
        login(data);
        // change the user in local storage
        localStorage.setItem("user", JSON.stringify(data));
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <div>Loading... </div>;
  return (
    <Box bg="black" color="whiteAlpha.800" h="100vh" w="100vw">
      <Flex justify="top">
        <Box marginLeft="5px" marginTop="5px" bg="gray" borderRadius="50%">
          <Link to="/">
            <ArrowBackIcon fontSize="40" />
          </Link>
        </Box>
      </Flex>
      <Flex flexDirection="column" align="center">
        {editMode ? (
          <VStack as="form" onSubmit={handleSubmit(onSubmit)} w="50vw">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              {...register("name")}
              defaultValue={user.name}
            />
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              type="age"
              id="age"
              {...register("age")}
              defaultValue={user.age}
            />
            <FormLabel htmlFor="calorie_goal">Daily Calorie Goal</FormLabel>
            <Input
              type="number"
              id="calorie_goal"
              {...register("calorie_goal")}
              defaultValue={user.calorie_goal}
            />
            <ButtonGroup mt="20px">
              <Button type="submit" colorScheme="green">
                Save
              </Button>
              <Button onClick={() => setEditMode(false)} colorScheme="orange">
                Cancel
              </Button>
            </ButtonGroup>
          </VStack>
        ) : (
          <Flex flexDirection="column" justify="center" align="center" mt="8">
            <Avatar size="xl" mb="5" />
            {user.name && <Heading>{user.name}</Heading>}
            {!user.name && <Heading>Hi, {user.email}!</Heading>}
            <Text mb="5">Your daily calorie goal is: {user.calorie_goal}</Text>
            <ButtonGroup>
              <Button onClick={() => setEditMode(true)} colorScheme="blue">
                Edit
              </Button>
              <Button onClick={handleLogout} colorScheme="red">
                Log out
              </Button>
            </ButtonGroup>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Profile;
