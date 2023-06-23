import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { HStack, FormLabel, Box, Input } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
const MacroFormField = ({ label, id, defaultValue, inputType, register, }) => {
    const [isLargerThan320] = useMediaQuery("(min-width: 320px)");
    const bottomMarginSize = isLargerThan320 ? 4 : 2;
    return (_jsxs(HStack, { marginRight: "10px", marginLeft: "10px", spacing: "2", mb: bottomMarginSize, children: [_jsx(FormLabel, { htmlFor: `${id}Calories`, fontWeight: "bold", fontSize: "l", flex: "2", marginLeft: "5px", marginRight: "5px", style: {
                    display: "flex",
                    justifyContent: "left",
                }, children: label }), id !== "bodyweight" && (_jsxs(_Fragment, { children: [_jsx(Box, { flex: "3", marginLeft: "5px", marginRight: "5px", children: _jsx(Input, { type: inputType, id: `${id}.calories`, defaultValue: defaultValue.calories, ...register(`${id}.calories`), maxH: "30px" }) }), id !== "exercise" && (_jsx(Box, { flex: "3", marginLeft: "5px", marginRight: "5px", children: _jsx(Input, { type: inputType, id: `${id}.protein`, defaultValue: defaultValue.protein, ...register(`${id}.protein`), maxH: "30px" }) }))] })), id === "bodyweight" && (_jsx(Box, { flex: "3", marginLeft: "5px", marginRight: "5px", children: _jsx(Input, { type: inputType, id: `${id}`, defaultValue: defaultValue.bodyweight, ...register(`${id}`), maxH: "30px" }) }))] }));
};
export default MacroFormField;
