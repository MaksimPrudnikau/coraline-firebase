import { Form, Formik } from "formik";
import { FC } from "react";
import { observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/App/const.ts";
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { defaultValidationProps, validationSchema } from "./types.ts";
import { FormikField } from "../../components/Shared/Auth/FormikField.tsx";
import { IRegisterProps } from "../../components/Shared/Auth/types.ts";

const _Register: FC = () => {
  const googleProvider = new GoogleAuthProvider();
  const navigation = useNavigate();

  const onRegister = async (values: IRegisterProps) => {
    const credentials = await createUserWithEmailAndPassword(
      firebaseAuth,
      values.email,
      values.password
    );
    if (credentials.user) {
      navigation(ROUTES.HOME);
    }
  };

  const onRegisterProvider = async (provider: AuthProvider) => {
    const credentials = await signInWithPopup(firebaseAuth, provider);
    if (credentials.user) {
      navigation(ROUTES.HOME);
    }
  };

  return (
    <Formik
      initialValues={defaultValidationProps}
      validationSchema={validationSchema}
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onRegister}
    >
      {(props) => {
        const { errors, touched, isValid, dirty } = props;
        console.log("dirty", dirty);
        console.log("isValid", isValid);
        return (
          <Form>
            <FormikField type={"email"} touched={touched} errors={errors} />
            <FormikField type={"password"} touched={touched} errors={errors} />
            <FormikField
              type={"password"}
              name={"confirmPassword"}
              touched={touched}
              errors={errors}
            />

            <button
              onClick={() => onRegisterProvider(googleProvider)}
              disabled={!dirty || !isValid}
            >
              Google
            </button>
            <label>Already have an account?</label>
            <Link to={ROUTES.LOGIN}>Sign in</Link>
          </Form>
        );
      }}
    </Formik>
  );
};

export const Register = observer(_Register);
