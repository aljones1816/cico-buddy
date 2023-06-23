import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../api/hooks/useAuthContext";
import { useState } from "react";
import { useLogout } from "../api/hooks/useLogout";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, Flex, Avatar, Heading, Text, FormLabel, Input, VStack, } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
const Profile = () => {
    const { user, login } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const { handleLogout } = useLogout();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        if (!user)
            return;
        const updatedUser = {
            name: data.name,
            age: data.age,
            calorie_goal: data.calorie_goal,
            protein_goal: data.protein_goal,
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
        }
        catch (error) {
            console.log(error);
        }
    };
    if (!user)
        return _jsx("div", { children: "Loading... " });
    return (_jsxs(Box, { bg: "black", color: "whiteAlpha.800", h: "100vh", w: "100vw", children: [_jsx(Flex, { justify: "top", children: _jsx(Box, { marginLeft: "5px", marginTop: "5px", bg: "gray", borderRadius: "50%", children: _jsx(Link, { to: "/", children: _jsx(ArrowBackIcon, { fontSize: "40" }) }) }) }), _jsx(Flex, { flexDirection: "column", align: "center", children: editMode ? (_jsxs(VStack, { as: "form", onSubmit: handleSubmit(onSubmit), w: "50vw", children: [_jsx(FormLabel, { htmlFor: "name", children: "Name" }), _jsx(Input, { type: "text", id: "name", ...register("name"), defaultValue: user.name }), _jsx(FormLabel, { htmlFor: "age", children: "Age" }), _jsx(Input, { type: "age", id: "age", ...register("age"), defaultValue: user.age }), _jsx(FormLabel, { htmlFor: "calorie_goal", children: "Daily Calorie Goal" }), _jsx(Input, { type: "number", id: "calorie_goal", ...register("calorie_goal"), defaultValue: user.calorie_goal }), _jsx(FormLabel, { htmlFor: "protein_goal", children: "Daily Protein Goal" }), _jsx(Input, { type: "number", id: "protein_goal", ...register("protein_goal"), defaultValue: user.protein_goal }), _jsxs(ButtonGroup, { mt: "20px", children: [_jsx(Button, { type: "submit", colorScheme: "green", children: "Save" }), _jsx(Button, { onClick: () => setEditMode(false), colorScheme: "orange", children: "Cancel" })] })] })) : (_jsxs(Flex, { flexDirection: "column", justify: "center", align: "center", mt: "8", children: [_jsx(Avatar, { size: "xl", mb: "5" }), user.name && _jsx(Heading, { children: user.name }), !user.name && _jsxs(Heading, { children: ["Hi, ", user.email, "!"] }), _jsxs(Text, { mb: "5", children: ["Your daily calorie goal is: ", user.calorie_goal] }), _jsxs(Text, { mb: "5", children: ["Your daily protein goal is: ", user.protein_goal, " grams"] }), _jsxs(ButtonGroup, { children: [_jsx(Button, { onClick: () => setEditMode(true), colorScheme: "blue", children: "Edit" }), _jsx(Button, { onClick: handleLogout, colorScheme: "red", children: "Log out" })] })] })) })] }));
};
export default Profile;
