import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home/Home.tsx";
import { ROUTES } from "./const.ts";
import "../../App.css";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { useStores } from "../../lib/Mobx";
import { Vocabulary } from "../../pages/Vocabulary/Vocabulary.tsx";
import { useEffect } from "react";
import { User } from "firebase/auth";
import { Layout } from "./Layout.tsx";
import * as VocabularyService from "../../lib/Services/Vocabulary.ts";
import { Register } from "../../pages/Register/Register.tsx";
import { Login } from "../../pages/Login/Login.tsx";

const App = () => {
  const { userStore, vocabularyStore } = useStores();
  const [user, loading] = useAuthState(firebaseAuth, {
    onUserChanged: async (user) => {
      userStore.setUser(user);
    },
  });

  useEffect(() => {
    if (loading || !user) return;
    VocabularyService.get(user as User, vocabularyStore);
  }, [loading, user, vocabularyStore]);

  if (loading) {
    return <>Loading...</>;
  }

  // if (true) {
  //   return <Loading />;
  // }

  userStore.setUser(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index={true}
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
          path={`${ROUTES.VOCABULARY}/:id`}
          element={
            <Layout>
              <Vocabulary />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
