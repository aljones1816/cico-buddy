import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSignup } from "../api/hooks/useSignup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Flex, Heading, Text, VStack, FormLabel, Input, Alert, AlertIcon, AlertDescription, Box, } from "@chakra-ui/react";
const Signup = () => {
    const { handleSignup, error } = useSignup();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        handleSignup(email, password);
    };
    return (_jsx(Box, { children: _jsxs(Flex, { flexDirection: "column", align: "center", w: "100vw", h: "100vh", bg: "black", color: "whiteAlpha.800", pt: "25px", children: [_jsx(Heading, { children: "Welcome to CicoBuddy!" }), _jsx(Text, { children: "Sign up to start logging" }), _jsxs(VStack, { as: "form", className: "signup", onSubmit: handleSubmit(onSubmit), pt: "10px", w: "50vw", maxW: "300px", children: [_jsx(FormLabel, { htmlFor: "email", children: "Email" }), _jsx(Input, { type: "email", id: "email", ...register("email") }), _jsx(FormLabel, { htmlFor: "password", children: "Password" }), _jsx(Input, { type: "password", id: "password", ...register("password") }), _jsx(Button, { type: "submit", colorScheme: "green", mt: "20px", mb: "5px", children: "Sign up" })] }), error && (_jsx(Box, { mt: "10px", children: _jsxs(Alert, { status: "error", bg: "gray.800", children: [_jsx(AlertIcon, {}), _jsx(AlertDescription, { children: error })] }) })), _jsx(Box, { children: _jsxs(Text, { children: ["Already have an account?", " ", _jsx(Link, { to: "/login", children: _jsx("u", { children: "Login" }) }), "!"] }) })] }) }));
};
export default Signup;
