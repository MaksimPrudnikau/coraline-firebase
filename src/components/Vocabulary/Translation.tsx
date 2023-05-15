import { FC } from "react";
import { ITranslation } from "../../Mobx/VocabularyStore.ts";

interface IProps {
  position: number;
  translation: ITranslation;
}
export const Translation: FC<IProps> = ({ position, translation }) => {
  return (
    <tr>
      <td>{position}</td>
      <td>{translation.english}</td>
      <td>{translation.japanese}</td>
    </tr>
  );
};
