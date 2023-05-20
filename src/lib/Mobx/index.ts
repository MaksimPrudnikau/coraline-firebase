import { createContext, useContext } from "react";
import UserStore from "./UserStore.ts";
import VocabularyStore from "./VocabularyStore.ts";
import { TranslationsStore } from "./TranslationsStore.ts";

const rootStore = createContext({
  userStore: new UserStore(),
  vocabularyStore: new VocabularyStore(),
  translationsStore: new TranslationsStore(),
});

export const useStores = () => useContext(rootStore);
