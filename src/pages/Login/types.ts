import * as Yup from "yup";
import * as Validations from "../../components/Shared/Auth/validations.ts";
import { ILoginProps } from "../../components/Shared/Auth/types.ts";

export const defaultValidationProps: ILoginProps = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  email: Validations.email,
  password: Validations.password,
});
