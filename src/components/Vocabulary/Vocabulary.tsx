import { ChangeEvent, FC, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../../lib/Mobx";
import { ROUTES } from "../App/const.ts";
import { isEmpty } from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { Translations } from "../Translations/Translations.tsx";
import { IVocabulary } from "../../lib/Mobx/VocabularyStore.ts";
import * as VocabularyService from "../../lib/Services/Vocabulary.ts";
import { EnterInput } from "../Shared/EnterInput.tsx";

const _Vocabulary: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(firebaseAuth);

  if (!id) {
    navigate(ROUTES.HOME);
  }

  const { vocabularyStore } = useStores();
  const vocabularies = vocabularyStore.vocabularies;
  const vocabulary = vocabularyStore.getById(id as string);
  const [vocabularyName, setVocabularyName] = useState(vocabulary?.name || "");
  const [vocabularyHint, setVocabularyHint] = useState(vocabulary?.hint || "");

  if (isEmpty(vocabularies)) {
    return <div>Loading...</div>;
  }

  if (!vocabulary) {
    return <div>Nothing found</div>;
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setVocabularyName(e.target.value);
  const onChangeHint = (e: ChangeEvent<HTMLInputElement>) =>
    setVocabularyHint(e.target.value);

  const onBlur = async () => {
    const newVocabulary: IVocabulary = {
      ...vocabulary,
      name: vocabularyName,
      hint: vocabularyHint,
    };
    vocabularyStore.update(newVocabulary);
    await VocabularyService.update(user, newVocabulary);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EnterInput
        value={vocabularyName}
        onChange={onChangeName}
        onBlur={onBlur}
      />

      <EnterInput
        type={"input"}
        value={vocabularyHint}
        onChange={onChangeHint}
        onBlur={onBlur}
      />

      <Translations vocabularyId={vocabulary.id} />
    </div>
  );
};

export const Vocabulary = observer(_Vocabulary);
