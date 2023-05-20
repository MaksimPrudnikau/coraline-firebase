import { FC } from "react";
import { ITranslation } from "../../lib/Mobx/VocabularyStore.ts";

interface IProps {
  translation: ITranslation;
}

export const Card: FC<IProps> = ({ translation }) => {
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
    >
      <label>{translation.english}</label>
      <label>{translation.japanese}</label>
    </div>
  );
};
