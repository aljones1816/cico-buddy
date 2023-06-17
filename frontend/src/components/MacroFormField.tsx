import { HStack, FormLabel, Box, Input } from "@chakra-ui/react";
import type { UseFormRegister } from "react-hook-form";
import { CaloriesFormInput } from "./Calories";
import { useMediaQuery } from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  id: keyof CaloriesFormInput;
  defaultValue?: number;
  register: UseFormRegister<CaloriesFormInput>; // Replace with the correct type for your form library
}

const MacroFormField = ({
  label,
  id,
  defaultValue,
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
        htmlFor={id}
        fontWeight="bold"
        fontSize="l"
        flex="1"
        marginLeft="5px"
        marginRight="5px"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {label}
      </FormLabel>
      <Box flex="1" marginLeft="5px" marginRight="5px">
        <Input
          type="number"
          id={id}
          defaultValue={defaultValue}
          {...register(id)}
          maxH="30px"
        />
      </Box>
      <Box flex="1" marginLeft="5px" marginRight="5px">
        <Input type="number" id={`${id}Protein`} maxH="30px" />
      </Box>
    </HStack>
  );
};

export default MacroFormField;
