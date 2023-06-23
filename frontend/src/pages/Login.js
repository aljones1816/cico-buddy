import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useLogin } from "../api/hooks/useLogin";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Flex, Heading, Text, VStack, FormLabel, Input, Alert, AlertIcon, AlertDescription, Box, } from "@chakra-ui/react";
const Login = () => {
    const { handleLogin, error } = useLogin();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        handleLogin(email, password);
    };
    useEffect(() => {
        console.log(error);
    }, [error]);
    return (_jsx(Box, { children: _jsxs(Flex, { flexDirection: "column", align: "center", w: "100vw", h: "100vh", bg: "black", color: "whiteAlpha.800", pt: "25px", children: [_jsx(Heading, { children: "Welcome back!" }), _jsx(Text, { children: "Login to continue logging" }), _jsxs(VStack, { as: "form", className: "login", onSubmit: handleSubmit(onSubmit), pt: "10px", w: "50vw", maxW: "300px", children: [_jsx(FormLabel, { htmlFor: "email", children: "Email" }), _jsx(Input, { type: "email", id: "email", ...register("email") }), _jsx(FormLabel, { htmlFor: "password", children: "Password" }), _jsx(Input, { type: "password", id: "password", ...register("password") }), _jsx(Button, { type: "submit", colorScheme: "blue", mt: "20px", mb: "5px", children: "Login" })] }), error && (_jsx(Box, { mt: "10px", children: _jsxs(Alert, { status: "error", bg: "gray.800", children: [_jsx(AlertIcon, {}), _jsx(AlertDescription, { children: error })] }) })), _jsx(Box, { children: _jsxs(Text, { children: ["New user?", " ", _jsx(Link, { to: "/signup", children: _jsx("u", { children: "Sign up" }) }), "!"] }) })] }) }));
};
export default Login;
