import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// component should take in a prop that contains a number and a string and displays them, e.g.: Calories: 1800
import { Card, CardBody, Box } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
const InfoIsland = ({ number, string, hasCurrentLog }) => {
    return (_jsx(Card, { bg: "gray.600", color: "white", borderTop: "8px solid", borderColor: "green.300", className: "info-island", h: "100", textAlign: "center", borderRadius: "xl", fontSize: "2xl", m: "5", position: "relative", children: _jsxs(CardBody, { children: [string, ": ", number, _jsx(Box, { position: "absolute", bottom: "5px", right: "5px", children: _jsx(Box, { w: "30px", h: "30px", borderRadius: "full", bg: "transparent", border: "1px solid white", display: "flex", justifyContent: "center", alignItems: "center", children: hasCurrentLog ? _jsx(EditIcon, {}) : _jsx(AddIcon, {}) }) })] }) }));
};
export default InfoIsland;
