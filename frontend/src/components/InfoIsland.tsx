// component should take in a prop that contains a number and a string and displays them, e.g.: Calories: 1800
import { Card, CardBody, Box } from "@chakra-ui/react";
interface InfoIslandProps {
  number: number;
  string: string;
  hasCurrentLog: boolean;
}
import { AddIcon, EditIcon } from "@chakra-ui/icons";

const InfoIsland = ({ number, string, hasCurrentLog }: InfoIslandProps) => {
  return (
    <Card
      bg="gray.600"
      color="white"
      borderTop="8px solid"
      borderColor="green.300"
      className="info-island"
      h="100"
      textAlign="center"
      borderRadius="xl"
      fontSize="2xl"
      m="5"
      position="relative"
    >
      <CardBody>
        {string}: {number}
        <Box position="absolute" bottom="5px" right="5px">
          <Box
            w="30px"
            h="30px"
            borderRadius="full"
            bg="transparent"
            border="1px solid white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {hasCurrentLog ? <EditIcon /> : <AddIcon />}
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default InfoIsland;
