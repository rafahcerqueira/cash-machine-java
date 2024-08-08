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
