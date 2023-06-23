import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import { BowlFood, Scales, Calendar } from "@phosphor-icons/react";
const Navfooter = ({ isCalorie, isWeight, isHistory, setIsCalorie, setIsWeight, setIsHistory, }) => {
    const iconSize = useBreakpointValue({
        base: "32",
        md: "24",
        lg: "24",
        sm: "24",
    });
    return (_jsxs(Flex, { bg: "gray.200", minW: "100%", justifyContent: "space-between", p: "20px", alignItems: "center", children: [_jsx(Box, { _hover: { backgroundColor: "gray.400", borderRadius: "50%" }, bg: isCalorie ? "gray.400" : "transparent", borderRadius: "50%", padding: "5px", children: _jsx(BowlFood, { size: iconSize, onClick: () => {
                        setIsCalorie(true);
                        setIsWeight(false);
                        setIsHistory(false);
                    } }) }), _jsx(Box, { _hover: { backgroundColor: "gray.400", borderRadius: "50%" }, bg: isWeight ? "gray.400" : "transparent", borderRadius: "50%", padding: "5px", children: _jsx(Scales, { size: iconSize, onClick: () => {
                        setIsWeight(true);
                        setIsCalorie(false);
                        setIsHistory(false);
                    } }) }), _jsx(Box, { _hover: { backgroundColor: "gray.400", borderRadius: "50%" }, bg: isHistory ? "gray.400" : "transparent", borderRadius: "50%", padding: "5px", children: _jsx(Calendar, { size: iconSize, onClick: () => {
                        setIsHistory(true);
                        setIsWeight(false);
                        setIsCalorie(false);
                    } }) })] }));
};
export default Navfooter;
