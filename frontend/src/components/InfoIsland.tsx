// component should take in a prop that contains a number and a string and displays them, e.g.: Calories: 1800
import { Card, CardBody } from "@chakra-ui/react";
interface InfoIslandProps {
  number: number;
  string: string;
}

const InfoIsland = ({ number, string }: InfoIslandProps) => {
  return (
    <Card
      bg="gray.600"
      color="white"
      borderTop="8px"
      borderColor="green.300"
      className="info-island"
    >
      <CardBody>
        {string}: {number}
      </CardBody>
    </Card>
  );
};

export default InfoIsland;
