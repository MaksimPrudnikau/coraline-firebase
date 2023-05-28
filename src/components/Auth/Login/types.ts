import * as Yup from "yup";
import * as Validations from "../validations.ts";
import { ILoginProps } from "../types.ts";

export const defaultValidationProps: ILoginProps = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  email: Validations.email,
  password: Validations.password,
});
