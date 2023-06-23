import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../api/hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import { Button, FormControl, Box, HStack, Text, Spacer, Flex, } from "@chakra-ui/react";
import MacroIsland from "./MacroIsland";
import MacroFormField from "./MacroFormField";
const Macros = () => {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const { fetchUserLogs } = useGetUserLogs();
    const { currentUserLog } = useUserData();
    const onSubmit = async (data) => {
        if (!user)
            return;
        const isNewLog = !currentUserLog?._id;
        const requestUrl = isNewLog
            ? "/api/userlog/add"
            : `/api/userlog/update/${currentUserLog?._id}`;
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
    };
    if (!currentUserLog || !user)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs(Flex, { flexDirection: "column", align: "center", h: "100%", children: [_jsx(Box, { flex: "1", children: _jsx(MacroIsland, {}) }), _jsxs(Flex, { as: "form", flexDirection: "column", align: "center", onSubmit: handleSubmit(onSubmit), color: "whiteAlpha.800", w: "100vw", flex: "6", children: [_jsxs(Flex, { align: "center", flexDirection: "column", maxW: "600px", children: [_jsxs(HStack, { spacing: "2", justify: "end", marginRight: "10px", marginLeft: "10px", w: "calc(100% - 20px)", mb: "2", children: [_jsx(Spacer, { flex: "2", marginRight: "5px", marginLeft: "5px" }), _jsx(Text, { color: "whiteAlpha.600", flex: "3", marginRight: "5px", marginLeft: "5px", align: "center", children: "Calories" }), _jsx(Text, { color: "whiteAlpha.600", flex: "3", marginRight: "5px", marginLeft: "5px", align: "center", children: "Protein" })] }), _jsxs(FormControl, { id: "calories", children: [_jsx(MacroFormField, { label: "Breakfast", id: "breakfast", defaultValue: currentUserLog.breakfast, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Lunch", id: "lunch", defaultValue: currentUserLog.lunch, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Dinner", id: "dinner", defaultValue: currentUserLog.dinner, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Snacks", id: "snacks", defaultValue: currentUserLog.snacks, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Exercise", id: "exercise", defaultValue: currentUserLog.exercise, inputType: "number", register: register })] })] }), _jsx(Flex, { marginLeft: "10px", marginRight: "10px", justify: "center", w: "80%", maxW: "300px", children: _jsx(Button, { type: "submit", colorScheme: "green", flex: "1", children: "Update" }) })] })] }));
};
export default Macros;
