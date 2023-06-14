import { Link } from "react-router-dom";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useAuth } from "../api/hooks/useAuthContext";
import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  isCalories: boolean;
  isWeight: boolean;
  isHistory: boolean;
}

const Navbar = ({ isCalories, isWeight, isHistory }: NavbarProps) => {
  const { user } = useAuth();
  const [headerText, setHeaderText] = useState<string>("");

  useEffect(() => {
    if (isCalories) {
      setHeaderText("Calories");
    } else if (isWeight) {
      setHeaderText("Weight");
    } else if (isHistory) {
      setHeaderText("History");
    }
  }, [isCalories, isWeight, isHistory]);
  return (
    <Flex
      as="nav"
      p="20px"
      minW="100%"
      bg="gray.800"
      color="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading>{headerText}</Heading>

      {user && (
        <Link to="/profile">
          <Avatar bg="teal.600" />
        </Link>
      )}
    </Flex>
  );
};

export default Navbar;
