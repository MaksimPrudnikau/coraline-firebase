import * as Yup from "yup";

export const email = Yup.string()
  .email("Invalid email")
  .required("Email is required");

export const password = Yup.string()
  .min(5, "Password is too short")
  .max(50, "Password is too long")
  .required("Password is required");

export const confirmPassword = Yup.string().oneOf(
  [Yup.ref("password"), ""],
  "Password are not match"
);
