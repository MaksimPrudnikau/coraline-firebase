import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../Home/Home.tsx";
import {ROUTES} from "./const.ts";
import {Register} from "../Register/Register.tsx";
import '../../App.css'
import ProtectedRoute from "./ProtectedRoute.tsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth} from "../Databases/firestore.ts";
import {useStores} from "../../Mobx";
import {Login} from "../Login/Login.tsx";

const App = () => {
    const {userStore} = useStores();
    const [user, loading] = useAuthState(firebaseAuth, {
        onUserChanged: async (user) => userStore.setUser(user)
    });

    if (loading) {
        return <>Loading...</>
    }

    userStore.setUser(user)

  return (
    <BrowserRouter>
        <Routes>
            <Route index={true} path={ROUTES.HOME} element={(
                <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>
            )}/>
            <Route path={ROUTES.LOGIN} element={<Login/>}/>
            <Route path={ROUTES.REGISTER} element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
