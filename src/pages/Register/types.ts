import * as Yup from "yup";
import * as Validations from "../../components/Shared/Auth/validations.ts";
import { IRegisterProps } from "../../components/Shared/Auth/types.ts";

export const defaultValidationProps: IRegisterProps = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object().shape({
  email: Validations.email,
  password: Validations.password,
  confirmPassword: Validations.confirmPassword,
});
