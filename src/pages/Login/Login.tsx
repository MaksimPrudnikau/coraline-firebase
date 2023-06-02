import { FC, useEffect } from "react";
import {
  AuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../components/App/const.ts";
import { Form, Formik } from "formik";
import { defaultValidationProps, validationSchema } from "./types.ts";
import { FormikField } from "../../components/Shared/Auth/FormikField.tsx";
import { ILoginProps } from "../../components/Shared/Auth/types.ts";
import { useAuthState } from "react-firebase-hooks/auth";

const _Login: FC = () => {
  const [user, loading] = useAuthState(firebaseAuth);
  const navigation = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (!loading && user) {
      navigation(ROUTES.HOME);
    }
  }, [user, loading, navigation]);

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
    await signInWithRedirect(firebaseAuth, provider);
    const credentials = await getRedirectResult(firebaseAuth, provider);
    if (credentials?.user) {
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
          <Form>
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
          </Form>
        );
      }}
    </Formik>
  );
};

export const Login = _Login;
