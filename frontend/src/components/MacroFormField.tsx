import { HStack, FormLabel, Box, Input } from "@chakra-ui/react";
import type { UseFormRegister } from "react-hook-form";
import { CaloriesFormInput } from "./Macros";
import { useMediaQuery } from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  id: keyof CaloriesFormInput;
  defaultValue: { calories: number; protein?: number; bodyweight?: number };
  inputType: string;
  register: UseFormRegister<CaloriesFormInput>; // Replace with the correct type for your form library
}

const MacroFormField = ({
  label,
  id,
  defaultValue,
  inputType,
  register,
}: FormFieldProps) => {
  const [isLargerThan320] = useMediaQuery("(min-width: 320px)");
  const bottomMarginSize = isLargerThan320 ? 4 : 2;

  return (
    <HStack
      marginRight="10px"
      marginLeft="10px"
      spacing="2"
      mb={bottomMarginSize}
    >
      <FormLabel
        htmlFor={`${id}Calories`}
        fontWeight="bold"
        fontSize="l"
        flex="2"
        marginLeft="5px"
        marginRight="5px"
        style={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        {label}
      </FormLabel>
      {id !== "bodyweight" && (
        <>
          <Box flex="3" marginLeft="5px" marginRight="5px">
            <Input
              type={inputType}
              id={`${id}.calories`}
              defaultValue={defaultValue.calories}
              {...register(`${id}.calories`)}
              maxH="30px"
            />
          </Box>
          {id !== "exercise" && (
            <Box flex="3" marginLeft="5px" marginRight="5px">
              <Input
                type={inputType}
                id={`${id}.protein`}
                defaultValue={defaultValue.protein}
                {...register(`${id}.protein`)}
                maxH="30px"
              />
            </Box>
          )}
        </>
      )}
      {id === "bodyweight" && (
        <Box flex="3" marginLeft="5px" marginRight="5px">
          <Input
            type={inputType}
            id={`${id}`}
            defaultValue={defaultValue.bodyweight}
            {...register(`${id}`)}
            maxH="30px"
          />
        </Box>
      )}
    </HStack>
  );
};

export default MacroFormField;
