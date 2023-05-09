import {FC, useState} from "react";
import {observer} from "mobx-react";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../App/const.ts";
import {
    AuthProvider,
    createUserWithEmailAndPassword, GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import {firebaseAuth} from "../Databases/firestore.ts";

const _Register: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const googleProvider = new GoogleAuthProvider();
    const navigation = useNavigate();

    const onRegister = async () => {
        const credentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        if (credentials.user) {
            navigation(ROUTES.HOME)
        }
    }

    const onRegisterProvider = async (provider: AuthProvider) => {
        const credentials = await signInWithPopup(firebaseAuth, provider);
        if (credentials.user) {
            navigation(ROUTES.HOME)
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <input type={'email'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
            <input type={'password'} placeholder={'Password'} onChange={(e) => setPassword(e.target.value)}/>
            <input type={'password'} placeholder={'Confirm Password'} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={onRegister}>Sign up</button>
            <button onClick={() => onRegisterProvider(googleProvider)}>Google</button>
            <label>Already have an account?</label>
            <Link to={ROUTES.LOGIN}>Sign in</Link>
        </div>
    );
}

export const Register = observer(_Register);