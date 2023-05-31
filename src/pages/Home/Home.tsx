import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { useStores } from "../../lib/Mobx";
import { isEmpty, sample } from "lodash";
import * as TranslationsService from "../../lib/Services/Translations.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { layoutContext } from "../../components/App/context.ts";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Card } from "../../components/Home/Card.tsx";

const _Home: FC = () => {
  const [user] = useAuthState(firebaseAuth);
  const { translationsStore } = useStores();
  const { vocabulary, openMenu } = useContext(layoutContext);
  const translations = translationsStore.translations;
  const [randomTranslation, setRandomTranslation] = useState<ITranslation>();
  const [reverseTranslation, setReverseTranslation] = useState(false);
  useEffect(() => {
    if (!vocabulary?.id) {
      return;
    }

    TranslationsService.get(user, vocabulary.id, translationsStore);
  }, [user, vocabulary, translationsStore]);

  const onClick = () => {
    if (!vocabulary) return;
    let random = sample(translations);
    while (random?.id === randomTranslation?.id) {
      random = sample(translations);
    }

    setRandomTranslation(random);
  };

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setReverseTranslation(e.target.value === "Japanese");

  return (
    <div>
      {randomTranslation ? (
        <Card
          translation={randomTranslation}
          reverseTranslation={reverseTranslation}
        />
      ) : null}
      <Form.Select onChange={onSelect}>
        <option>English</option>
        <option>Japanese</option>
      </Form.Select>
      <Button
        variant="outline-primary"
        onClick={isEmpty(vocabulary) ? openMenu : onClick}
      >
        {isEmpty(vocabulary) ? "Select Vocabulary" : "Translation"}
      </Button>
    </div>
  );
};

export const Home = observer(_Home);
