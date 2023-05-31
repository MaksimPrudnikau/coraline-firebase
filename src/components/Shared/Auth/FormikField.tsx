import { ReactElement } from "react";
import { Field, FormikErrors, FormikTouched } from "formik";
import { get } from "lodash";

interface IProps<T> {
  type: string;
  name?: string;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
}

export const FormikField: <T>(p: IProps<T>) => ReactElement<IProps<T>> = (
  props
) => {
  const { type, name, touched, errors } = props;

  const isTouched = get(touched, type);
  const error = get(errors, type);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Field type={type} name={name || type} />
      {isTouched && error && <label style={{ color: "red" }}>{error}</label>}
    </div>
  );
};
