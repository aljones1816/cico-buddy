import { useEffect } from "react";
import { useLogin } from "../api/hooks/useLogin";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
} from "@chakra-ui/react";

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const { handleLogin, error } = useLogin();
  const { register, handleSubmit } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    const email = data.email;
    const password = data.password;

    handleLogin(email, password);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Box>
      <Flex
        flexDirection="column"
        align="center"
        w="100vw"
        h="100vh"
        bg="black"
        color="whiteAlpha.800"
        pt="25px"
      >
        <Heading>Welcome back!</Heading>
        <Text>Login to continue logging</Text>
        <VStack
          as="form"
          className="login"
          onSubmit={handleSubmit(onSubmit)}
          pt="10px"
          w="50vw"
          maxW="300px"
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" {...register("email")} />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" id="password" {...register("password")} />
          <Button type="submit" colorScheme="blue" mt="20px" mb="5px">
            Login
          </Button>
        </VStack>
        {error && (
          <Box mt="10px">
            <Alert status="error" bg="gray.800">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Box>
        )}
        <Box>
          <Text>
            New user?{" "}
            <Link to="/signup">
              <u>Sign up</u>
            </Link>
            !
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
