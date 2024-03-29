import { AuthContext } from "@/contexts/Auth";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider.");
  }

  return context;
};

export { useAuth };
