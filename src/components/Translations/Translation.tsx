import { FC, useState } from "react";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { TranslationInput } from "./TranslationInput.tsx";
import { isEmpty } from "lodash";
import { RiDeleteBin6Line } from "react-icons/all";

interface IProps {
  isRow?: boolean;
  position: number;
  translation?: ITranslation;
  onBlur: (translation: ITranslation) => Promise<void>;
  onRemove?: (translation: ITranslation) => Promise<void>;
  validating?: boolean;
}
const _Translation: FC<IProps> = (props) => {
  const { isRow, position, translation, onRemove, validating } = props;
  const [english, setEnglish] = useState(translation?.english || "");
  const [japanese, setJapanese] = useState(translation?.japanese || "");

  const onBlur = async () => {
    setEnglish((prev) => prev.trim());
    setJapanese((prev) => prev.trim());
    const newTranslation: ITranslation = {
      ...translation,
      english: english.trim() || "",
      japanese: japanese.trim() || "",
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
        <TranslationInput
          value={english}
          setter={setEnglish}
          onBlur={onBlur}
          validating={validating}
        />
      </td>
      <td>
        <TranslationInput
          value={japanese}
          setter={setJapanese}
          onBlur={onBlur}
          validating={validating}
        />
      </td>
      {isRow ? (
        <td>
          <RiDeleteBin6Line
            color={"red"}
            size={17}
            style={{ cursor: "pointer" }}
            onClick={onClick}
          />
        </td>
      ) : null}
    </tr>
  );
};

export const Translation = _Translation;
