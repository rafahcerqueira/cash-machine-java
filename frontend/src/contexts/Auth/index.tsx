import axios from "@/api/axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

type Props = {
  children: React.ReactNode;
};

type AuthProviderData = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps | null;
  loginIn: ({ accountNumber, name, password }: LoginInProps) => Promise<void>;
  logout: () => void;
  register: ({ name, password, type, level }: RegisterProps) => Promise<void>;
  resetPassword: ({
    account,
    password,
    confirmPassword,
  }: ResetPasswordProps) => Promise<void>;
  errorMessage: string | null;
};

const AuthContext = React.createContext<AuthProviderData>(
  {} as AuthProviderData
);

const cookies = new Cookies();

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const userCookie = cookies.get("user");
    if (userCookie) {
      setUser(userCookie);
      setIsAuthenticated(true);
    }
  }, []);

  const loginIn = async ({
    accountNumber,
    name,
    password,
  }: LoginInProps): Promise<void> => {
    try {
      const response = await axios.post("/api/auth/login", {
        accountNumber,
        name,
        password,
      });

      if (response.data.user) {
        const userData = response.data.user;
        setUser(userData);
        setIsAuthenticated(true);
        setErrorMessage(null);

        delete userData.password;
        cookies.set("user", userData, { path: "/" });
      } else {
        setErrorMessage(response.data.message || "Login failed");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Erro ao fazer login");
      setIsAuthenticated(false);
    }
  };

  const register = async ({
    name,
    password,
    type,
    level,
  }: RegisterProps): Promise<void> => {
    try {
      await axios.post("/api/auth/register", {
        name,
        password,
        type,
        level,
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const resetPassword = async ({
    account,
    password,
    confirmPassword,
  }: ResetPasswordProps): Promise<void> => {
    try {
      await axios.post("/api/auth/reset-password", {
        account,
        password,
        confirmPassword,
      });
    } catch (error) {
      console.error("Reset Password error:", error);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    cookies.remove("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        loginIn,
        logout,
        register,
        resetPassword,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
