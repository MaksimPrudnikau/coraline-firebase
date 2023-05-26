import { FC, useEffect } from "react";
import { useStores } from "../../lib/Mobx";
import { observer } from "mobx-react";
import { Translation } from "./Translation.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { User } from "firebase/auth";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { get } from "lodash";
import { Table } from "react-bootstrap";
import * as TranslationsService from "../../lib/Services/Translations.ts";

interface IProps {
  vocabularyId: string;
}

const _Translations: FC<IProps> = ({ vocabularyId }) => {
  const [user] = useAuthState(firebaseAuth);
  const { translationsStore } = useStores();
  const translations = translationsStore.translations;
  useEffect(
    () => TranslationsService.get(user, vocabularyId, translationsStore),
    [translationsStore, user, vocabularyId]
  );

  const update = async (translation: ITranslation) => {
    await TranslationsService.update(user, vocabularyId, translation);

    translationsStore.update(translation);
  };

  const add = async (translation: ITranslation) => {
    const { english, japanese } = translation;

    if (get(english, "length", 0) === 0 || get(japanese, "length", 0) === 0) {
      return;
    }

    await TranslationsService.create(user, vocabularyId, translation);
  };

  const remove = async (translation: ITranslation) => {
    await TranslationsService.remove(user as User, vocabularyId, translation);
    if (translations.length === 1) {
      translationsStore.remove(translation);
    }
  };

  return (
    <Table
      striped={true}
      bordered={true}
      hover={true}
      size={"sm"}
      style={{ textAlign: "center" }}
    >
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

export const Translations = observer(_Translations);
