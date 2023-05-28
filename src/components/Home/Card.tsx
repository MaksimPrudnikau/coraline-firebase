import { FC, useEffect, useState } from "react";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";

interface IProps {
  translation: ITranslation;
  reverseTranslation: boolean;
}

export const Card: FC<IProps> = ({ translation, reverseTranslation }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  let definition = translation.english;
  let meaning = translation.japanese;

  if (reverseTranslation) {
    definition = translation.japanese;
    meaning = translation.english;
  }

  const value = showAnswer ? meaning : definition;

  useEffect(() => setShowAnswer(false), [translation, reverseTranslation]);

  const onClick = () => setShowAnswer((prev) => !prev);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 100,
        height: 100,
        border: "1px solid black",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <label>{value}</label>
    </div>
  );
};
