import { createContext, useContext } from "react";
import UserStore from "./UserStore.ts";
import VocabularyStore from "./VocabularyStore.ts";

const rootStore = createContext({
  userStore: new UserStore(),
  vocabularyStore: new VocabularyStore(),
});

export const useStores = () => useContext(rootStore);
