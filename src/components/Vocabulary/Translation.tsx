import { FC, useState } from "react";
import { ITranslation } from "../../Mobx/VocabularyStore.ts";
import { TranslationInput } from "./TranslationInput.tsx";
import { isEmpty } from "lodash";

interface IProps {
  position: number;
  translation?: ITranslation;
  onBlur: (
    english: string | undefined,
    japanese: string | undefined
  ) => Promise<void>;
  refresh?: boolean;
}
const _Translation: FC<IProps> = (props) => {
  const { position, translation, refresh } = props;
  const [english, setEnglish] = useState(translation?.english || "");
  const [japanese, setJapanese] = useState(translation?.japanese || "");

  const onBlur = async () => {
    await props.onBlur(english, japanese);
    if (refresh && !isEmpty(english) && !isEmpty(japanese)) {
      setEnglish("");
      setJapanese("");
    }
  };

  return (
    <tr>
      <td>{position}</td>
      <td>
        <TranslationInput value={english} setter={setEnglish} onBlur={onBlur} />
      </td>
      <td>
        <TranslationInput
          value={japanese}
          setter={setJapanese}
          onBlur={onBlur}
        />
      </td>
    </tr>
  );
};

export const Translation = _Translation;
