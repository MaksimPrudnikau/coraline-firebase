import { createContext } from "react";
import { IVocabulary } from "../../lib/Mobx/VocabularyStore.ts";

interface ILayoutContext {
  vocabulary: IVocabulary | null | undefined;
  openMenu: () => void;
}

export const layoutContext = createContext<ILayoutContext>({
  vocabulary: null,
  openMenu: () => {
    return;
  },
});
