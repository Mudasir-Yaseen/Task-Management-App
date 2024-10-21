import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { user, login, logout, signup, forgotPassword } = useContext(AuthContext); // Destructure necessary functions and user state from AuthContext

  // Custom hook returns user information and auth functions
  return {
    user,
    login,
    logout,
    signup,
    forgotPassword,
  };
};

export default useAuth;
