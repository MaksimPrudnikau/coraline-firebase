import { ChangeEvent, FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { useStores } from "../../lib/Mobx";
import { cloneDeep, isEmpty } from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { Translations } from "../Translations/Translations.tsx";
import { IVocabulary } from "../../lib/Mobx/VocabularyStore.ts";
import * as VocabularyService from "../../lib/Services/Vocabulary.ts";
import { EnterInput } from "../Shared/EnterInput.tsx";

const _Vocabulary: FC = () => {
  const { id } = useParams();
  const [user] = useAuthState(firebaseAuth);
  const { vocabularyStore } = useStores();
  const [vocabulary, setVocabulary] = useState<IVocabulary>();
  const vocabularies = vocabularyStore.vocabularies;

  useEffect(() => {
    const v = vocabularyStore.getById(id as string);
    setVocabulary(v);
  }, [id]);

  if (isEmpty(vocabularies)) {
    return <div>Loading...</div>;
  }

  if (!vocabulary) {
    return <div>Nothing found</div>;
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setVocabulary((prevState) => {
      const clone = cloneDeep(prevState);
      if (!clone) {
        return clone;
      }

      clone.name = e.target.value;
      return clone;
    });

  const onChangeHint = (e: ChangeEvent<HTMLInputElement>) =>
    setVocabulary((prevState) => {
      const clone = cloneDeep(prevState);
      if (!clone) {
        return clone;
      }

      clone.hint = e.target.value;
      return clone;
    });

  const onBlur = async () => {
    vocabularyStore.update(vocabulary);
    await VocabularyService.update(user, vocabulary);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EnterInput
        value={vocabulary?.name || ""}
        onChange={onChangeName}
        onBlur={onBlur}
      />

      <EnterInput
        type={"input"}
        value={vocabulary?.hint || ""}
        onChange={onChangeHint}
        onBlur={onBlur}
      />

      <Translations vocabularyId={vocabulary.id} />
    </div>
  );
};

export const Vocabulary = observer(_Vocabulary);
