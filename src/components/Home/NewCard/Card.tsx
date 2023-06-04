import { FC } from "react";
import "./styles.css";

interface IProps {
  definition: string;
  meaning: string;
}

export const Card: FC<IProps> = (props) => {
  const { definition, meaning } = props;
  return (
    <div className="new-card">
      <div className="card-back">{meaning}</div>
      <div className="card-front">{definition}</div>
    </div>
  );
};
