import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { useStores } from "../../lib/Mobx";
import { isEmpty, sample } from "lodash";
import * as TranslationsService from "../../lib/Services/Translations.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { layoutContext } from "../App/context.ts";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { Card } from "./Card.tsx";
import { Button } from "react-bootstrap";

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
      <Button
        variant="outline-primary"
        onClick={isEmpty(vocabulary) ? openMenu : onClick}
      >
        {isEmpty(vocabulary) ? "Select Vocabulary" : "Translation"};
      </Button>
    </div>
  );
};

export const Home = observer(_Home);
