import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home.tsx";
import { ROUTES } from "./const.ts";
import { Register } from "../Register/Register.tsx";
import "../../App.css";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseAuth } from "../Databases/firestore.ts";
import { useStores } from "../../Mobx";
import { Login } from "../Login/Login.tsx";
import { Vocabulary } from "../Vocabulary/Vocabulary.tsx";
import { useEffect } from "react";
import { User } from "firebase/auth";
import VocabularyStore, { IVocabulary } from "../../Mobx/VocabularyStore.ts";
import { onValue, ref } from "firebase/database";

const App = () => {
  const { userStore, vocabularyStore } = useStores();
  const [user, loading] = useAuthState(firebaseAuth, {
    onUserChanged: async (user) => userStore.setUser(user),
  });

  useEffect(() => {
    if (loading || !user) return;
    getVocabularies(user as User, vocabularyStore);
  }, [loading, user, vocabularyStore]);

  if (loading) {
    return <>Loading...</>;
  }

  userStore.setUser(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index={true}
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={`${ROUTES.VOCABULARY}/:id`} element={<Vocabulary />} />
      </Routes>
    </BrowserRouter>
  );
};

function getVocabularies(user: User, vocabularyStore: VocabularyStore) {
  const collection = ref(firebase, `vocabularies/${user.uid}`);

  return onValue(collection, (snapshot) => {
    if (snapshot.exists()) {
      const data: IVocabulary[] = Object.entries<IVocabulary>(
        snapshot.val()
      ).map(([id, { name, created }]) => ({
        id,
        name,
        created: new Date(created),
      }));
      vocabularyStore.from(data);
    }
  });
}

export default App;
