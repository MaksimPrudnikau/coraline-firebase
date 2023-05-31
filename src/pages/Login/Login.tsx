import { FC, Fragment } from "react";
import {
  AuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/App/const.ts";
import { Formik } from "formik";
import { defaultValidationProps, validationSchema } from "./types.ts";
import { FormikField } from "../../components/Shared/Auth/FormikField.tsx";
import { ILoginProps } from "../../components/Shared/Auth/types.ts";

const _Login: FC = () => {
  const navigation = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const onLogin = async (v: ILoginProps) => {
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      v.email,
      v.password
    );
    if (credentials.user) {
      navigation(ROUTES.HOME);
    }
  };

  const onLoginProvider = async (provider: AuthProvider) => {
    const credentials = await signInWithPopup(firebaseAuth, provider);
    if (credentials.user) {
      navigation(ROUTES.HOME);
    }
  };

  return (
    <Formik
      initialValues={defaultValidationProps}
      onSubmit={onLogin}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { errors, touched, isValid, dirty } = props;
        return (
          <Fragment>
            <FormikField type={"email"} touched={touched} errors={errors} />
            <FormikField type={"password"} touched={touched} errors={errors} />
            <button type={"submit"} disabled={!dirty || !isValid}>
              Sign in
            </button>
            <button onClick={() => onLoginProvider(googleProvider)}>
              Google
            </button>
            <label>Dont have an account yet?</label>
            <Link to={ROUTES.REGISTER}>Sign up</Link>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export const Login = _Login;
