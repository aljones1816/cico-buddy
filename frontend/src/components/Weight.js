import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../api/hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import { Button, FormLabel, Input, Box, VStack, HStack, Card, CardBody, Flex, IconButton, ButtonGroup, Text, } from "@chakra-ui/react";
import WeightHistory from "./WeightHistory";
import { EditIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
const Weight = () => {
    const { user } = useAuth();
    const { fetchUserLogs } = useGetUserLogs();
    const { currentUserLog } = useUserData();
    const { register, handleSubmit } = useForm();
    const [hasCurrentLog, setHasCurrentLog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // create an array with the bodyweight and date from each userlog
    useEffect(() => {
        if (currentUserLog?.bodyweight === 0 || !currentUserLog?.bodyweight) {
            setHasCurrentLog(false);
        }
        else
            setHasCurrentLog(true);
    }, [currentUserLog]);
    const onSubmit = async (data) => {
        if (!user)
            return;
        const isNewLog = !currentUserLog?._id;
        const requestUrl = isNewLog
            ? "/api/userlog/add"
            : `/api/userlog/update/${currentUserLog._id}`;
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
    if (!currentUserLog)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs(Flex, { align: "center", justify: "center", flexDirection: "column", h: "100%", children: [_jsxs(Card, { bg: "gray.600", color: "white", borderTop: "5px solid", borderColor: "green.300", className: "info-island", w: "60vw", maxW: "300px", maxH: "250px", minH: "150px", textAlign: "center", justify: "center", borderRadius: "xl", m: "5", flex: "1", children: [!isEditing && (_jsxs(CardBody, { children: [hasCurrentLog && (_jsxs(Text, { fontSize: "xl", children: ["Weight: ", currentUserLog.bodyweight, " lbs"] })), !hasCurrentLog && _jsx(Text, { fontSize: "xl", children: "Enter today's weight!" }), _jsx(Box, { position: "absolute", bottom: "10px", right: "10px", children: hasCurrentLog ? (_jsx(IconButton, { icon: _jsx(EditIcon, {}), "aria-label": "edit", onClick: () => setIsEditing(true), colorScheme: "blue" })) : (_jsx(IconButton, { icon: _jsx(AddIcon, {}), "aria-label": "edit", onClick: () => setIsEditing(true), colorScheme: "blue" })) })] })), isEditing && (_jsx(CardBody, { children: _jsxs(Box, { as: "form", onSubmit: handleSubmit(onSubmit), color: "whiteAlpha.800", children: [_jsx(VStack, { align: "start", spacing: "2", children: _jsxs(HStack, { spacing: "2", mb: "4", children: [_jsx(FormLabel, { htmlFor: "bodyweight", fontWeight: "bold", fontSize: "l", children: "Enter weight:" }), _jsx(Input, { type: "float", id: "bodyweight", defaultValue: currentUserLog.bodyweight, ...register("bodyweight") })] }) }), hasCurrentLog && (_jsxs(ButtonGroup, { children: [_jsx(Button, { type: "submit", colorScheme: "green", children: "Update" }), _jsx(IconButton, { "aria-label": "cancel", icon: _jsx(CloseIcon, {}), onClick: () => setIsEditing(false), colorScheme: "red" })] })), !hasCurrentLog && (_jsxs(ButtonGroup, { children: [_jsx(Button, { type: "submit", colorScheme: "green", children: "Add" }), _jsx(IconButton, { "aria-label": "cancel", icon: _jsx(CloseIcon, {}), onClick: () => setIsEditing(false), colorScheme: "red" })] }))] }) }))] }), _jsx(Flex, { flex: "2", w: "100vw", justify: "center", align: "center", children: _jsx(WeightHistory, {}) })] }));
};
export default Weight;
