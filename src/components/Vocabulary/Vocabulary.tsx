import { ChangeEvent, FC } from "react";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../../Mobx";
import { ROUTES } from "../App/const.ts";
import { isEmpty } from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseAuth } from "../Databases/firestore.ts";
import { User } from "firebase/auth";
import { Translations } from "./Translations.tsx";
import { ref, update } from "firebase/database";
import { IVocabulary } from "../../Mobx/VocabularyStore.ts";

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

  if (isEmpty(vocabularies)) {
    return <div>Loading...</div>;
  }

  if (!vocabulary) {
    return <div>Nothing found</div>;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    vocabularyStore.updateName(vocabulary.id, e.target.value);

  const onBlur = () => updateName(user as User, vocabulary);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type={"text"}
        value={vocabulary.name}
        onChange={onChange}
        onBlurCapture={onBlur}
      />
      <Translations vocabularyId={vocabulary.id} />
    </div>
  );
};

async function updateName(user: User, vocabulary: IVocabulary) {
  const collection = ref(firebase, `vocabularies/${user.uid}/${vocabulary.id}`);
  await update(collection, {
    name: vocabulary.name,
  });
}

export const Vocabulary = observer(_Vocabulary);
