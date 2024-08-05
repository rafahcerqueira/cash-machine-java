import axios from "@/api/axios";
import React, { useState } from "react";

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

type UserProps = {
  id: number;
  name: string;
  password: string;
  account: AccountProps;
};

type AccountProps = {
  id: number;
  accountNumber: string;
  type: string;
  level: string;
  balance: number;
};

type LoginInProps = {
  accountNumber: string;
  name: string;
  password: string;
};

type RegisterProps = {
  name: string;
  password: string;
  type: string;
  level: string;
};

type ResetPasswordProps = {
  account: string;
  password: string;
  confirmPassword: string;
};

const AuthContext = React.createContext<AuthProviderData>(
  {} as AuthProviderData
);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      } else {
        setErrorMessage(response.data.message || "Login failed");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
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
