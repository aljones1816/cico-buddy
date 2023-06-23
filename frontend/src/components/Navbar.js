import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import { useAuth } from "../api/hooks/useAuthContext";
import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const Navbar = ({ isCalories, isWeight, isHistory }) => {
    const { user } = useAuth();
    const [headerText, setHeaderText] = useState("");
    const avatarSize = useBreakpointValue({
        base: "md",
        lg: "sm",
        sm: "sm",
        xs: "xs",
    });
    useEffect(() => {
        if (isCalories) {
            setHeaderText("Macros");
        }
        else if (isWeight) {
            setHeaderText("Weight");
        }
        else if (isHistory) {
            setHeaderText("History");
        }
    }, [isCalories, isWeight, isHistory]);
    return (_jsxs(Flex, { as: "nav", p: "20px", minW: "100%", bg: "gray.800", color: "white", justifyContent: "space-between", alignItems: "center", children: [_jsx(Heading, { children: headerText }), user && (_jsx(Link, { to: "/profile", children: _jsx(Avatar, { bg: "black", size: avatarSize }) }))] }));
};
export default Navbar;
