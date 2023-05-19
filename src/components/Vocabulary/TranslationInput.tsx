import { Dispatch, FC, Fragment, SetStateAction } from "react";

interface IProps {
  value: string | undefined;
  setter: Dispatch<SetStateAction<string | undefined>>;
}

export const TranslationInput: FC<IProps> = ({ value, setter }) => {
  return (
    <Fragment>
      <input
        type={"text"}
        value={value}
        onChange={(e) => setter(e.target.value)}
        onBlurCapture={}
      />
    </Fragment>
  );
};
