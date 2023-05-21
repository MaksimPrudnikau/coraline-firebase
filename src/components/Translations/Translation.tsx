import { FC, useState } from "react";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { TranslationInput } from "./TranslationInput.tsx";
import { isEmpty } from "lodash";

interface IProps {
  isRow?: boolean;
  position: number;
  translation?: ITranslation;
  onBlur: (translation: ITranslation) => Promise<void>;
  onRemove?: (translation: ITranslation) => Promise<void>;
}
const _Translation: FC<IProps> = (props) => {
  const { isRow, position, translation, onRemove } = props;
  const [english, setEnglish] = useState(translation?.english || "");
  const [japanese, setJapanese] = useState(translation?.japanese || "");

  const onBlur = async () => {
    const newTranslation: ITranslation = {
      ...translation,
      english: english || "",
      japanese: japanese || "",
    };
    await props.onBlur(newTranslation);
    if (!isRow && !isEmpty(english) && !isEmpty(japanese)) {
      setEnglish("");
      setJapanese("");
    }
  };

  const onClick = () => {
    if (!onRemove || !translation) return;

    return onRemove(translation);
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
      {isRow ? (
        <td>
          <button onClick={onClick}>Remove</button>
        </td>
      ) : null}
    </tr>
  );
};

export const Translation = _Translation;
