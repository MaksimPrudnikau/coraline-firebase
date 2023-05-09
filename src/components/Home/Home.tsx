import {FC} from "react";
import {observer} from "mobx-react";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth} from "../Databases/firestore.ts";
import {signOut} from 'firebase/auth'

const _Home: FC = () => {
    const [user] = useAuthState(firebaseAuth);

    return (
        <>
            Home
            <button onClick={() => signOut(firebaseAuth)}>Sign out</button>
        </>
    );
}

export const Home = observer(_Home);