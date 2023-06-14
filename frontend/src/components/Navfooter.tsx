import { Flex, Box } from "@chakra-ui/react";
import { IconSalad, IconScaleOutline, IconHistory } from "@tabler/icons-react";
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
  return (
    <Flex
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.200"
      minW="100%"
      justifyContent="space-between"
      p="20px"
    >
      <Box
        _hover={{ backgroundColor: "gray.400", borderRadiu: "50%" }}
        bg={isCalorie ? "gray.400" : "transparent"}
        borderRadius="50%"
        padding="5px"
      >
        <BowlFood
          size={32}
          onClick={() => {
            setIsCalorie(true);
            setIsWeight(false);
            setIsHistory(false);
          }}
        />
      </Box>
      <Box
        _hover={{ backgroundColor: "gray.400", borderRadiu: "50%" }}
        bg={isWeight ? "gray.400" : "transparent"}
        borderRadius="50%"
        padding="5px"
      >
        <Scales
          size={32}
          onClick={() => {
            setIsWeight(true);
            setIsCalorie(false);
            setIsHistory(false);
          }}
        />
      </Box>
      <Box
        _hover={{ backgroundColor: "gray.400", borderRadiu: "50%" }}
        bg={isHistory ? "gray.400" : "transparent"}
        borderRadius="50%"
        padding="5px"
      >
        <Calendar
          size={32}
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
