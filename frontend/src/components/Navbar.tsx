import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import { useAuth } from "../api/hooks/useAuthContext";
import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface NavbarProps {
  isCalories: boolean;
  isWeight: boolean;
  isHistory: boolean;
}

const Navbar = ({ isCalories, isWeight, isHistory }: NavbarProps) => {
  const { user } = useAuth();
  const [headerText, setHeaderText] = useState<string>("");
  const avatarSize = useBreakpointValue({
    base: "md",
    lg: "sm",
    sm: "sm",
    xs: "xs",
  });

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
          <Avatar bg="black" size={avatarSize} />
        </Link>
      )}
    </Flex>
  );
};

export default Navbar;
