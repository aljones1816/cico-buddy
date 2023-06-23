import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useUserData } from "../api/hooks/useUserDataContext";
import { useEffect, useState } from "react";
const WeightHistory = () => {
    const { userLogs } = useUserData();
    const [weightHist, setWeightHist] = useState([]);
    useEffect(() => {
        if (!userLogs)
            return;
        const userLogsWithBodyweight = userLogs.map((log) => ({
            bodyweight: log.bodyweight,
            date: new Date(log.date).toDateString(),
        }));
        // sort the array by date
        const sortedLogs = userLogsWithBodyweight.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        // convert the dates to string with format of "Jan 01 2023"
        sortedLogs.forEach((log) => {
            log.date = new Date(log.date).toDateString();
        });
        setWeightHist(sortedLogs);
    }, [userLogs]);
    return (_jsx(Box, { width: "75vw", height: "80%", maxW: "500px", bg: "gray.700", borderRadius: "lg", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: weightHist, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(Line, { type: "monotone", dataKey: "bodyweight", stroke: "#D69E2E", fill: "#D69E2E" }), _jsx(XAxis, { dataKey: "date", stroke: "#F7FAFC" }), _jsx(YAxis, { stroke: "#F7FAFC", domain: ["auto", "auto"] })] }) }) }));
};
export default WeightHistory;
