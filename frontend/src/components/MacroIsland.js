import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../api/hooks/useAuthContext";
import { useUserData } from "../api/hooks/useUserDataContext";
import { Card, CardBody, HStack, VStack, Text, CircularProgress, } from "@chakra-ui/react";
import { useState, useEffect } from "react";
const MacroIsland = () => {
    const { user } = useAuth();
    const { currentUserLog } = useUserData();
    const [calorieTotal, setCalorieTotal] = useState(0);
    const [proteinTotal, setProteinTotal] = useState(0);
    useEffect(() => {
        if (currentUserLog) {
            setCalorieTotal(currentUserLog.breakfast.calories +
                currentUserLog.lunch.calories +
                currentUserLog.dinner.calories +
                currentUserLog.snacks.calories -
                currentUserLog.exercise.calories);
            setProteinTotal(currentUserLog.breakfast.protein +
                currentUserLog.lunch.protein +
                currentUserLog.dinner.protein +
                currentUserLog.snacks.protein);
        }
    }, [currentUserLog]);
    if (!user || !currentUserLog)
        return _jsx("div", { children: "Loading..." });
    return (_jsx(Card, { bg: "gray.600", color: "white", borderTop: "5px solid", borderColor: "green.300", className: "info-island", w: "60vw", maxW: "200px", textAlign: "center", borderRadius: "xl", m: "5", position: "relative", overflow: "hidden", children: _jsx(CardBody, { children: _jsxs(HStack, { children: [_jsxs(VStack, { id: "macros", flex: "1", spacing: "2", pr: "2", borderRight: "1px solid white", children: [_jsx(Text, { fontSize: "xs", children: "Calories" }), _jsxs(Text, { fontSize: "xx-small", children: [calorieTotal, " / ", user.calorie_goal] }), _jsx(CircularProgress, { thickness: "10px", value: (calorieTotal / user.calorie_goal) * 100 })] }), _jsxs(VStack, { id: "protein", flex: "1", spacing: "2", pl: "2", children: [_jsx(Text, { fontSize: "xs", children: "Protein" }), _jsxs(Text, { fontSize: "xx-small", children: [proteinTotal, " / ", user.protein_goal] }), _jsx(CircularProgress, { color: "orange.400", thickness: "10px", value: (proteinTotal / user.protein_goal) * 100 })] })] }) }) }));
};
export default MacroIsland;
