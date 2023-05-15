import { FC } from "react";
import { observer } from "mobx-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseAuth } from "../Databases/firestore.ts";
import { signOut, User } from "firebase/auth";
import { useStores } from "../../Mobx";
import { push, ref } from "firebase/database";
import { Link } from "react-router-dom";
import DYNAMIC_ROUTES from "../App/const.ts";

const _Home: FC = () => {
  const [user] = useAuthState(firebaseAuth);
  const { vocabularyStore } = useStores();
  const vocabularies = vocabularyStore.vocabularies;

  const create = () => createVocabulary(user as User);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Vocabularies
      {vocabularies.map((v) => {
        return (
          <div key={v.id} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <label>Id</label>
              <Link to={DYNAMIC_ROUTES.vocabulary(v.id)}>{v.id}</Link>
            </div>
            <div style={{ display: "flex" }}>
              <label>Name</label>
              <span>{v.name}</span>
            </div>
            <div style={{ display: "flex" }}>
              <label>Created</label>
              <span>{v.created.toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
      <button onClick={() => signOut(firebaseAuth)}>Sign out</button>
      <button onClick={create}>Create vocabulary</button>
    </div>
  );
};

function createVocabulary(user: User) {
  const collection = ref(firebase, `vocabularies/${user.uid}`);
  return push(collection, {
    name: "",
    created: Date.now(),
  });
}

export const Home = observer(_Home);
