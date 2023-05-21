import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { EnterInput } from "../Shared/EnterInput.tsx";

interface IProps {
  value: string | undefined;
  setter: Dispatch<SetStateAction<string | "">>;
  onBlur: () => Promise<void>;
}

export const TranslationInput: FC<IProps> = ({ value, setter, onBlur }) => {
  return (
    <Fragment>
      <EnterInput
        value={value}
        onChange={(e) => setter(e.target.value)}
        onBlur={onBlur}
      />
    </Fragment>
  );
};
