import { FC, useState } from "react";
import { ITranslation } from "../../Mobx/VocabularyStore.ts";
import { TranslationInput } from "./TranslationInput.tsx";
import { firebase, firebaseAuth } from "../Databases/firestore.ts";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { push, ref } from "firebase/database";

interface IProps {
  position: number;
  vocabularyId: string;
  translation?: ITranslation;
}
const _Translation: FC<IProps> = ({ position, vocabularyId, translation }) => {
  const [user] = useAuthState(firebaseAuth);
  const [english, setEnglish] = useState(translation?.english);
  const [japanese, setJapanese] = useState(translation?.japanese);

  const addOrUpdate = async () => {
    const newTranslation: ITranslation = {
      id: vocabularyId,
      english: english || "",
      japanese: japanese || "",
    };
    await updateTranslation(user as User, vocabularyId, newTranslation);
  };

  return (
    <tr>
      <td>{position}</td>
      <td>
        <TranslationInput
          value={english}
          setter={setEnglish}
          onBlur={addOrUpdate}
        />
      </td>
      <td>
        <TranslationInput
          value={japanese}
          setter={setJapanese}
          onBlur={addOrUpdate}
        />
      </td>
    </tr>
  );
};

async function updateTranslation(
  user: User,
  vocabularyId: string,
  translation: ITranslation
) {
  const collection = ref(firebase, `translations/${user.uid}/${vocabularyId}`);
  await push(collection, translation);
}

export const Translation = _Translation;
