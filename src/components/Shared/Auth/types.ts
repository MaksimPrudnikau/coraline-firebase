export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRegisterProps extends ILoginProps {
  confirmPassword: string;
}
