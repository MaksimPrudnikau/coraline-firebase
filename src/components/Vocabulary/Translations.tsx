import { FC } from "react";
import { useStores } from "../../Mobx";
import { observer } from "mobx-react";
import { Translation } from "./Translation.tsx";

interface IProps {
  vocabularyId: string;
}

const _Translations: FC<IProps> = (props) => {
  const { vocabularyStore } = useStores();
  const translations = vocabularyStore.translations;
  return (
    <table>
      <thead>
        <tr>
          <td>№</td>
          <td>English</td>
          <td>Japanese</td>
        </tr>
      </thead>
      <tbody>
        {translations.map((translation, index) => (
          <Translation
            key={translation.id}
            position={index + 1}
            vocabularyId={props.vocabularyId}
            translation={translation}
          />
        ))}
        <Translation
          position={translations.length + 1}
          vocabularyId={props.vocabularyId}
        />
      </tbody>
    </table>
  );
};

export const Translations = observer(_Translations);
