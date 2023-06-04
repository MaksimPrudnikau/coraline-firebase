import { FC, Fragment, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import { Card } from "./NewCard/Card.tsx";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";

interface IProps {
  translation: ITranslation;
  reverseTranslation: boolean;
  hidden: boolean;
}

export const FlippableCard: FC<IProps> = ({
  translation,
  reverseTranslation,
  hidden,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [dirty, setDirty] = useState(false);

  let definition = translation.english;
  let meaning = translation.japanese;

  if (reverseTranslation) {
    definition = translation.japanese;
    meaning = translation.english;
  }

  useEffect(() => {
    setDirty(false);
    setShowAnswer(false);
  }, [translation, reverseTranslation]);

  const onClick = () => setShowAnswer((prev) => !prev);
  return (
    <div className="flippable-card-container" onClick={onClick}>
      <CSSTransition
        in={!showAnswer}
        timeout={600}
        classNames="flip"
        onExited={() => setDirty(true)}
        onEnter={() => setDirty(false)}
      >
        <Fragment>
          <Card
            definition={definition}
            meaning={hidden && !dirty ? "" : meaning}
          />
        </Fragment>
      </CSSTransition>
    </div>
  );
};
