import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Macros from "../components/Macros";
import Weight from "../components/Weight";
import History from "../components/History";
import { useGetUserLogs } from "../api/hooks/useUserLog";
import Navfooter from "../components/Navfooter";
import Navbar from "../components/Navbar";
import { Flex, useBreakpointValue, Text } from "@chakra-ui/react";
const Home = () => {
    const { isLoading, data: userLogs, error } = useGetUserLogs();
    const [isCalories, setIsCalories] = useState(false);
    const [isWeight, setIsWeight] = useState(false);
    const [isHistory, setIsHistory] = useState(false);
    const navbarHeight = useBreakpointValue({
        base: "10vh",
        md: "8vh",
        lg: "5vh",
        sm: "12vh",
    });
    const footerHeight = useBreakpointValue({
        base: "10vh",
        md: "8vh",
        lg: "5vh",
        sm: "12vh",
    });
    useEffect(() => {
        setIsCalories(true);
    }, []);
    if (isLoading)
        return (_jsx(Flex, { bg: "black", w: "100vw", h: "100vh", color: "whiteAlpha.800", flexDir: "column", justify: "center", align: "center", children: _jsx(Text, { children: "Loading..." }) }));
    if (error)
        return _jsx("h1", { children: "Something went wrong!" });
    return (_jsxs(Flex, { bg: "black", w: "100vw", h: "100vh", flexDir: "column", justify: "space-between", children: [_jsx(Flex, { h: navbarHeight, children: _jsx(Navbar, { isCalories: isCalories, isWeight: isWeight, isHistory: isHistory }) }), _jsxs(Flex, { flex: "1", overflowY: "auto", flexDir: "column", alignItems: "stretch", children: [isCalories && _jsx(Macros, {}), isWeight && _jsx(Weight, {}), userLogs && isHistory && _jsx(History, {})] }), _jsx(Flex, { h: footerHeight, children: _jsx(Navfooter, { isCalorie: isCalories, isWeight: isWeight, isHistory: isHistory, setIsCalorie: setIsCalories, setIsWeight: setIsWeight, setIsHistory: setIsHistory }) })] }));
};
export default Home;
