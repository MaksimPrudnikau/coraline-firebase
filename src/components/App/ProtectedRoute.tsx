import {ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth} from "../../lib/Databases/firestore.ts";
import {ROUTES} from "./const.ts";

interface IProps {
    children: ReactNode
}
export default function ProtectedRoute(props: IProps) {
    const [user, loading] = useAuthState(firebaseAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading){
            return;
        }

        if (!user) {
            navigate(ROUTES.LOGIN)
        }
    }, [user, loading, navigate])

    return (
        <>
            {loading ? 'Loading...' : props.children}
        </>)
}