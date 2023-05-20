import { FC, useEffect } from "react";
import { useStores } from "../../Mobx";
import { observer } from "mobx-react";
import { Translation } from "./Translation.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseAuth } from "../Databases/firestore.ts";
import { User } from "firebase/auth";
import { onValue, push, ref, set } from "firebase/database";
import { ITranslation } from "../../Mobx/VocabularyStore.ts";
import { get } from "lodash";
import { TranslationsStore } from "../../Mobx/TranslationsStore.ts";

interface IProps {
  vocabularyId: string;
}

const _Translations: FC<IProps> = ({ vocabularyId }) => {
  const [user] = useAuthState(firebaseAuth);
  const { translationsStore } = useStores();
  const translations = translationsStore.translations;
  useEffect(
    () => getTranslations(user as User, vocabularyId, translationsStore),
    [vocabularyId]
  );

  const update = async (
    english: string | undefined,
    japanese: string | undefined
  ) => {
    const newTranslation: ITranslation = {
      english: english || "",
      japanese: japanese || "",
    };

    await updateTranslation(
      user as User,
      vocabularyId,
      newTranslation,
      translationsStore
    );
  };

  const add = async (
    english: string | undefined,
    japanese: string | undefined
  ) => {
    if (get(english, "length", 0) === 0 || get(japanese, "length", 0) === 0) {
      return;
    }

    const newTranslation: ITranslation = {
      english: english || "",
      japanese: japanese || "",
    };

    await addTranslation(user as User, vocabularyId, newTranslation);
  };

  return (
    <table>
      <thead>
        <tr>
          <td>№</td>
          <td>English</td>
          <td>Japanese</td>
        </tr>
      </thead>
      <tbody>
        {translations.map((translation, index) => {
          return (
            <Translation
              key={translation.id}
              position={index + 1}
              translation={translation}
              onBlur={update}
            />
          );
        })}
        <Translation
          position={translations.length + 1}
          onBlur={add}
          refresh={true}
        />
      </tbody>
    </table>
  );
};

function getTranslations(
  user: User,
  vocabularyId: string,
  translationsStore: TranslationsStore
) {
  const collection = ref(firebase, `translations/${user.uid}/${vocabularyId}`);

  onValue(collection, (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    const value = snapshot.val();
    const translations = Object.entries<ITranslation>(value).map(([id, t]) => {
      t.id = id;
      return t;
    });

    translationsStore.set(translations);
  });
}

async function updateTranslation(
  user: User,
  vocabularyId: string,
  translation: ITranslation,
  translationsStore: TranslationsStore
) {
  const collection = ref(firebase, `translations/${user.uid}/${vocabularyId}`);
  await set(collection, translation);
  translationsStore.update(translation);
}

async function addTranslation(
  user: User,
  vocabularyId: string,
  translation: ITranslation
) {
  const collection = ref(firebase, `translations/${user.uid}/${vocabularyId}`);
  await push(collection, translation);
}

export const Translations = observer(_Translations);
