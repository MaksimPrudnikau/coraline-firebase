import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { signOut } from "firebase/auth";
import { useStores } from "../../lib/Mobx";
import { isEmpty, sample } from "lodash";
import * as TranslationsService from "../../lib/Services/Translations.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { layoutContext } from "../App/context.ts";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { Card } from "./Card.tsx";

const _Home: FC = () => {
  const [user] = useAuthState(firebaseAuth);
  const { translationsStore } = useStores();
  const { vocabulary, openMenu } = useContext(layoutContext);
  const translations = translationsStore.translations;
  const [randomTranslation, setRandomTranslation] = useState<ITranslation>();

  const onClick = () => {
    if (!vocabulary) return;
    const random = sample(translations);
    setRandomTranslation(random);
  };

  useEffect(() => {
    if (!vocabulary?.id) {
      return;
    }

    TranslationsService.get(user, vocabulary.id, translationsStore);
  }, [user, vocabulary, translationsStore]);

  return (
    <div>
      {randomTranslation ? <Card translation={randomTranslation} /> : null}
      {isEmpty(vocabulary) ? (
        <button onClick={openMenu}>Select vocabulary</button>
      ) : (
        <button onClick={onClick}>Random</button>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => signOut(firebaseAuth)}>Sign out</button>
      </div>
    </div>
  );
};

export const Home = observer(_Home);
