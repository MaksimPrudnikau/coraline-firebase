import { FC, useEffect } from "react";
import { useStores } from "../../lib/Mobx";
import { observer } from "mobx-react";
import { Translation } from "./Translation.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseAuth } from "../Databases/firestore.ts";
import { User } from "firebase/auth";
import { onValue, push, ref, remove, update } from "firebase/database";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { get } from "lodash";
import { TranslationsStore } from "../../lib/Mobx/TranslationsStore.ts";
import { Table } from "react-bootstrap";

interface IProps {
  vocabularyId: string;
}

const _Translations: FC<IProps> = ({ vocabularyId }) => {
  const [user] = useAuthState(firebaseAuth);
  const { translationsStore } = useStores();
  const translations = translationsStore.translations;
  useEffect(
    () => getTranslations(user as User, vocabularyId, translationsStore),
    [translationsStore, user, vocabularyId]
  );

  const update = async (translation: ITranslation) => {
    await updateTranslation(
      user as User,
      vocabularyId,
      translation,
      translationsStore
    );
  };

  const add = async (translation: ITranslation) => {
    const { english, japanese } = translation;

    if (get(english, "length", 0) === 0 || get(japanese, "length", 0) === 0) {
      return;
    }

    await addTranslation(user as User, vocabularyId, translation);
  };

  const remove = async (translation: ITranslation) => {
    await removeTranslation(user as User, vocabularyId, translation);
    if (translations.length === 1) {
      translationsStore.remove(translation);
    }
  };

  return (
    <Table striped={true} bordered={true} hover={true} size={"sm"}>
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
              isRow={true}
              onBlur={update}
              onRemove={remove}
            />
          );
        })}
        <Translation position={translations.length + 1} onBlur={add} />
      </tbody>
    </Table>
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
  const { id, english, japanese } = translation;

  const collection = ref(
    firebase,
    `translations/${user.uid}/${vocabularyId}/${id}`
  );

  await update(collection, {
    english,
    japanese,
  });

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

async function removeTranslation(
  user: User,
  vocabularyId: string,
  translation: ITranslation
) {
  const path = ref(
    firebase,
    `translations/${user.uid}/${vocabularyId}/${translation.id}`
  );
  await remove(path);
}

export const Translations = observer(_Translations);
