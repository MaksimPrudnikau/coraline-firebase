import {createContext, useContext} from "react";
import UserStore from "./UserStore.ts";

const rootStore = createContext({
    userStore: new UserStore
})

export const useStores = () => useContext(rootStore);