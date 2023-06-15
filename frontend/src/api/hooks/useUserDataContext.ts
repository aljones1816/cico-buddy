import { UserDataContext } from "../../context/UserDataContext";
import { useContext } from "react";

export const useUserData = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
