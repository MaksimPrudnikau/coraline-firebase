import { FC } from "react";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../../Mobx";
import { ROUTES } from "../App/const.ts";
import { isEmpty } from "lodash";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../Databases/firestore.ts";
import { User } from "firebase/auth";
import { Translation } from "./Translation.tsx";

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
  const translations = vocabularyStore.translations;

  if (isEmpty(vocabularies)) {
    return <div>Loading...</div>;
  }

  if (!vocabulary) {
    return <div>Nothing found</div>;
  }

  vocabularyStore.getTranslations(user as User, vocabulary);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input type={"text"} value={vocabulary.name} />
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>English</td>
            <td>Japanese</td>
          </tr>
        </thead>
        <tbody>
          {translations.map((translation, index) => (
            <Translation
              key={translation.id}
              position={index + 1}
              translation={translation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Vocabulary = observer(_Vocabulary);
