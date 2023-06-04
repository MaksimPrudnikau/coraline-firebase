import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { firebaseAuth } from "../../lib/Databases/firestore.ts";
import { useStores } from "../../lib/Mobx";
import { isEmpty, sample } from "lodash";
import * as TranslationsService from "../../lib/Services/Translations.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { layoutContext } from "../../components/App/context.ts";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";
import { SplitButton } from "react-bootstrap";
import { FlippableCard } from "../../components/Home/FlippableCard.tsx";
import { MenuItem } from "@mui/material";

const _Home: FC = () => {
  const [user] = useAuthState(firebaseAuth);
  const { translationsStore } = useStores();
  const { vocabulary, openMenu } = useContext(layoutContext);
  const translations = translationsStore.translations;
  const [randomTranslation, setRandomTranslation] = useState<ITranslation>();
  const [reverseTranslation, setReverseTranslation] = useState(false);
  const [cardHiddenAnswer, setCardHiddenAnswer] = useState(false);

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

    setCardHiddenAnswer(true);
    setRandomTranslation(random);
  };

  const onChangeTranslationType = (revert: boolean) => {
    setCardHiddenAnswer(true);
    setReverseTranslation(revert);
  };

  console.log(reverseTranslation);

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      {randomTranslation ? (
        <FlippableCard
          translation={randomTranslation}
          reverseTranslation={reverseTranslation}
          hidden={cardHiddenAnswer}
          setHidden={() => setCardHiddenAnswer(false)}
        />
      ) : null}
      {translations.length === 0 ? (
        <label>Vocabulary is empty</label>
      ) : (
        <SplitButton
          variant="outline-primary"
          title={
            isEmpty(vocabulary)
              ? "Select Vocabulary"
              : `Random ${reverseTranslation ? "Japanese" : "English"}`
          }
          onClick={isEmpty(vocabulary) ? openMenu : onClick}
        >
          <MenuItem onClick={() => onChangeTranslationType(false)}>
            English
          </MenuItem>
          <MenuItem onClick={() => onChangeTranslationType(true)}>
            Japanese
          </MenuItem>
        </SplitButton>
      )}
    </div>
  );
};

export const Home = observer(_Home);
