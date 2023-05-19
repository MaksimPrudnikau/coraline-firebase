import { Dispatch, FC, Fragment, SetStateAction } from "react";

interface IProps {
  value: string | undefined;
  setter: Dispatch<SetStateAction<string | undefined>>;
  onBlur: () => Promise<void>;
}

export const TranslationInput: FC<IProps> = ({ value, setter, onBlur }) => {
  return (
    <Fragment>
      <input
        type={"text"}
        value={value}
        onChange={(e) => setter(e.target.value)}
        onBlurCapture={onBlur}
      />
    </Fragment>
  );
};
