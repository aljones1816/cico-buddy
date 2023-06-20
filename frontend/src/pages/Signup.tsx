import { useSignup } from "../api/hooks/useSignup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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

interface SignupInput {
  email: string;
  password: string;
}

const Signup = () => {
  const { handleSignup, error } = useSignup();
  const { register, handleSubmit } = useForm<SignupInput>();

  const onSubmit = (data: SignupInput) => {
    const email = data.email;
    const password = data.password;

    handleSignup(email, password);
  };

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
        <Heading>Welcome to CicoBuddy!</Heading>
        <Text>Sign up to start logging</Text>
        <VStack
          as="form"
          className="signup"
          onSubmit={handleSubmit(onSubmit)}
          pt="10px"
          w="50vw"
          maxW="300px"
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" {...register("email")} />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" id="password" {...register("password")} />
          <Button type="submit" colorScheme="green" mt="20px" mb="5px">
            Sign up
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
            Already have an account?{" "}
            <Link to="/login">
              <u>Login</u>
            </Link>
            !
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Signup;
