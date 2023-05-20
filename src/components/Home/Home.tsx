import { FC } from "react";
import { observer } from "mobx-react";
import { firebaseAuth } from "../Databases/firestore.ts";
import { signOut } from "firebase/auth";
import { create } from "lodash";

const _Home: FC = () => {
  return (
    <div>
      {/*<Card translation={} />*/}
      <button>Translation</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => signOut(firebaseAuth)}>Sign out</button>
        <button onClick={create}>Create vocabulary</button>
      </div>
    </div>
  );
};

export const Home = observer(_Home);
