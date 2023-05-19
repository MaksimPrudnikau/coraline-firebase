import { FC, useState } from "react";
import { ITranslation } from "../../Mobx/VocabularyStore.ts";
import { TranslationInput } from "./TranslationInput.tsx";
import { ref } from "firebase/database";
import { firebase } from "../Databases/firestore.ts";

interface IProps {
  position: number;
  translation?: ITranslation;
}
const _Translation: FC<IProps> = ({ position, translation }) => {
  const [english, setEnglish] = useState(translation?.english);
  const [japanese, setJapanese] = useState(translation?.japanese);
  const onSave = () => {
    const newTranslation = { ...translation, english, japanese };
    updateTranslation();
  };

  return (
    <tr>
      <td>{position}</td>
      <td>
        <TranslationInput value={english} setter={setEnglish} />
      </td>
      <td>
        <TranslationInput value={japanese} setter={setJapanese} />
      </td>
    </tr>
  );
};

async function updateTranslation(translation: ITranslation) {
  const collection = ref(firebase, `vocabularies/${user.uid}/${vocabulary.id}`);
}

export const Translation = _Translation;
