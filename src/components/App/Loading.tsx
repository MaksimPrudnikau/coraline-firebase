import { FC } from "react";
import Placeholder from "react-bootstrap/Placeholder";

export const Loading: FC = () => {
  return (
    <div className={"container-fluid d-flex flex-column vh-100"}>
      <Placeholder
        className={"w-25 h-25"}
        bg={"secondary"}
        animation={"wave"}
      />
      <div className={"w-15 h-15 border border-black"}></div>
      test
      {/*<Placeholder className={"w-1 h-1"} bg={"primary"} />*/}
    </div>
  );
};
