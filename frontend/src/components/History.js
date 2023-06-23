import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardBody, CardHeader, Flex, ButtonGroup, IconButton, Text, HStack, FormControl, Spacer, } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MacroFormField from "./MacroFormField";
import { useAuth } from "../api/hooks/useAuthContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";
const History = () => {
    const { userLogs: userData } = useUserData();
    const [editingCardId, setEditingCardId] = useState(null);
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const { fetchUserLogs } = useGetUserLogs();
    const handleEdit = (id) => {
        setEditingCardId(id);
    };
    const handCancelEdit = () => {
        setEditingCardId(null);
    };
    const handleSaveEdit = async (data) => {
        if (!user)
            return;
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
    const handleDeleteLog = async (id) => {
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
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsx(_Fragment, { children: _jsx(Flex, { mt: "10px", flexDirection: "column-reverse", align: "center", justify: "center", children: userData.map((userLog, index) => (_jsxs(Card, { w: "100%", maxW: "400px", bg: "gray.600", borderTop: "8px solid", borderColor: "green.300", color: "white", mb: "10px", children: [_jsx(CardHeader, { fontWeight: "bold", paddingTop: "4px", paddingBottom: "0px", children: new Date(userLog.date).toDateString() }), editingCardId === userLog._id ? (_jsx(CardBody, { paddingLeft: "8px", paddingRight: "8px", children: _jsxs(Flex, { as: "form", flexDirection: "column", align: "center", onSubmit: handleSubmit(handleSaveEdit), color: "whiteAlpha.800", mb: "12%", paddingTop: "10px", bg: "gray.700", borderRadius: "10px", children: [_jsxs(Flex, { align: "center", flexDirection: "column", maxW: "600px", children: [_jsxs(HStack, { spacing: "2", justify: "end", marginRight: "10px", marginLeft: "10px", w: "calc(100% - 20px)", mb: "2", children: [_jsx(Spacer, { flex: "2", marginRight: "5px", marginLeft: "5px" }), _jsx(Text, { color: "whiteAlpha.600", flex: "3", marginRight: "5px", marginLeft: "5px", align: "center", children: "Calories" }), _jsx(Text, { color: "whiteAlpha.600", flex: "3", marginRight: "5px", marginLeft: "5px", align: "center", children: "Protein" })] }), _jsxs(FormControl, { id: "calories", children: [_jsx(MacroFormField, { label: "Breakfast", id: "breakfast", defaultValue: userLog.breakfast, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Lunch", id: "lunch", defaultValue: userLog.lunch, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Dinner", id: "dinner", defaultValue: userLog.dinner, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Snacks", id: "snacks", defaultValue: userLog.snacks, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Exercise", id: "exercise", defaultValue: userLog.exercise, inputType: "number", register: register }), _jsx(MacroFormField, { label: "Weight", id: "bodyweight", defaultValue: {
                                                        calories: 0,
                                                        protein: 0,
                                                        bodyweight: userLog.bodyweight,
                                                    }, inputType: "float", register: register })] })] }), _jsx(Flex, { marginLeft: "10px", marginRight: "10px", justify: "center", w: "80%", maxW: "300px" }), _jsxs(ButtonGroup, { position: "absolute", bottom: "10px", right: "10px", children: [_jsx(IconButton, { "aria-label": "update", icon: _jsx(CheckIcon, {}), onClick: handleSubmit(handleSaveEdit), colorScheme: "green" }), _jsx(IconButton, { "aria-label": "cancel", icon: _jsx(CloseIcon, {}), onClick: () => handCancelEdit(), colorScheme: "orange" })] })] }) })) : (_jsxs(CardBody, { children: [_jsxs("p", { children: ["Eaten:", " ", userLog.breakfast.calories +
                                        userLog.lunch.calories +
                                        userLog.dinner.calories +
                                        userLog.snacks.calories, " ", "calories"] }), _jsxs("p", { children: ["Protein:", " ", userLog.breakfast.protein +
                                        userLog.lunch.protein +
                                        userLog.dinner.protein +
                                        userLog.snacks.protein, " ", "grams"] }), _jsxs("p", { children: ["Exercise: ", userLog.exercise.calories, " calories"] }), _jsxs("p", { children: ["Bodyweight: ", userLog.bodyweight, " lbs"] }), _jsxs(ButtonGroup, { position: "absolute", bottom: "10px", right: "10px", children: [_jsx(IconButton, { icon: _jsx(EditIcon, {}), "aria-label": "edit", colorScheme: "blue", onClick: () => handleEdit(userLog._id) }), _jsx(IconButton, { icon: _jsx(DeleteIcon, {}), "aria-label": "delete", colorScheme: "red", onClick: () => handleDeleteLog(userLog._id) })] })] }))] }, index))) }) }));
};
export default History;
