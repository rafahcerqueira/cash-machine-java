import axios from "@/api/axios";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

type AuthProviderData = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps;
  loginIn: ({ account, name, password }: LoginInProps) => Promise<void>;
  logout: () => void;
  resetPassword: ({
    password,
    confirmPassword,
  }: ResetPasswordProps) => Promise<void>;
};

type UserProps = {
  name: string;
  account: string;
  cpf: string;
  type: string;
  level: string;
};

type LoginInProps = {
  account: string;
  name: string;
  password: string;
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
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const loginIn = async ({ ...data }: LoginInProps): Promise<void> => {
    try {
      const response = await axios.post("/login", data);

      setUser(response.data);

      console.log("response: ", response);
      console.log("response.data: ", response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const resetPassword = ({
    password,
    confirmPassword,
  }: ResetPasswordProps): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // [POST]
        const response = {
          name: "Daniel",
          account: "12345678910",
          cpf: "123.456.789-10",
          type: "corrente",
          level: "ouro",
        };
        setUser(response);
        console.log("Senha: ", password);
        console.log("Confirmar Senha: ", confirmPassword);
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const logout = (): void => {
    setUser({} as UserProps);
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
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
