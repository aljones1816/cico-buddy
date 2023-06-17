import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";

import { BowlFood, Scales, Calendar } from "@phosphor-icons/react";

interface NavfooterProps {
  isCalorie: boolean;
  isWeight: boolean;
  isHistory: boolean;
  setIsCalorie: (isCalorie: boolean) => void;
  setIsWeight: (isWeight: boolean) => void;
  setIsHistory: (isHistory: boolean) => void;
}

const Navfooter = ({
  isCalorie,
  isWeight,
  isHistory,
  setIsCalorie,
  setIsWeight,
  setIsHistory,
}: NavfooterProps) => {
  const iconSize = useBreakpointValue({
    base: "32",
    md: "24",
    lg: "24",
    sm: "24",
  });

  return (
    <Flex
      bg="gray.200"
      minW="100%"
      justifyContent="space-between"
      p="20px"
      alignItems="center"
    >
      <Box
        _hover={{ backgroundColor: "gray.400", borderRadius: "50%" }}
        bg={isCalorie ? "gray.400" : "transparent"}
        borderRadius="50%"
        padding="5px"
      >
        <BowlFood
          size={iconSize}
          onClick={() => {
            setIsCalorie(true);
            setIsWeight(false);
            setIsHistory(false);
          }}
        />
      </Box>
      <Box
        _hover={{ backgroundColor: "gray.400", borderRadius: "50%" }}
        bg={isWeight ? "gray.400" : "transparent"}
        borderRadius="50%"
        padding="5px"
      >
        <Scales
          size={iconSize}
          onClick={() => {
            setIsWeight(true);
            setIsCalorie(false);
            setIsHistory(false);
          }}
        />
      </Box>
      <Box
        _hover={{ backgroundColor: "gray.400", borderRadius: "50%" }}
        bg={isHistory ? "gray.400" : "transparent"}
        borderRadius="50%"
        padding="5px"
      >
        <Calendar
          size={iconSize}
          onClick={() => {
            setIsHistory(true);
            setIsWeight(false);
            setIsCalorie(false);
          }}
        />
      </Box>
    </Flex>
  );
};

export default Navfooter;
