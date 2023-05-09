import {FC, useState} from "react";
import {observer} from "mobx-react";
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthProvider } from 'firebase/auth';
import {firebaseAuth} from "../Databases/firestore.ts";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../App/const.ts";

const _Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const onLogin = async () => {
        const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
        if (credentials.user) {
            navigation(ROUTES.HOME);
        }
    }

    const onLoginProvider = async (provider: AuthProvider) => {
        const credentials = await signInWithPopup(firebaseAuth, provider)
        if (credentials.user) {
            navigation(ROUTES.HOME);
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <input type={'email'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
            <input type={'password'} placeholder={'Password'} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={onLogin}>
                Sign in
            </button>
            <button onClick={() => onLoginProvider(googleProvider)}>Google</button>
            <label>Dont have an account yet?</label>
            <Link to={ROUTES.REGISTER}>Sign up</Link>
        </div>
    );
}

export const Login = observer(_Login)