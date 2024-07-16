import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

type AuthProviderData = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps;
  loginIn: ({ account, password }: LoginInProps) => Promise<void>;
  logout: () => void;
  resetPassword: ({
    password,
    confirmPassword,
  }: ResetPasswordProps) => Promise<void>;
};

type UserProps = {
  name: string;
  account: string;
  type: string;
  level: string;
};

type LoginInProps = {
  account: string;
  password: string;
};

type ResetPasswordProps = {
  password: string;
  confirmPassword: string;
};

const AuthContext = React.createContext<AuthProviderData>(
  {} as AuthProviderData
);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const loginIn = async ({
    account,
    password,
  }: LoginInProps): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // [POST]
        const response = {
          name: "Daniel",
          account: "12345678910",
          type: "corrente",
          level: "ouro",
        };
        setUser(response);

        console.log("Nome: ", response.name);
        console.log("Conta: ", account);

        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
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
