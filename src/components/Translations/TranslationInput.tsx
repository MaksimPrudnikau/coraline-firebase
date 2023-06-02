import {
  ChangeEvent,
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { EnterInput } from "../Shared/EnterInput.tsx";

interface IProps {
  value: string | undefined;
  setter: Dispatch<SetStateAction<string | "">>;
  onBlur: () => Promise<void>;
  validating?: boolean;
}

export const TranslationInput: FC<IProps> = (props) => {
  const { value, setter, validating } = props;
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validate = validating ? validateValue(value) : null;
    setError(validate);
  }, [value, validating]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setter(e.target.value);
  };

  const onBlur = async () => {
    if (error) return;

    await props.onBlur();
  };

  return (
    <Fragment>
      <EnterInput value={value} onChange={onChange} onBlur={onBlur} />
      {validating && touched && error && (
        <label style={{ color: "red" }}>{error}</label>
      )}
    </Fragment>
  );
};

function validateValue(value: string | undefined | null): string | null {
  if (!value || value.length === 0) {
    return "Required";
  }

  if (value.length > 255) {
    return "Too long";
  }

  return null;
}
