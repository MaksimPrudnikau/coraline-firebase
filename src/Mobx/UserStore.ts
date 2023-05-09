import {User} from "firebase/auth";
import {makeAutoObservable} from "mobx";

export default class UserStore {
    public user: User | undefined | null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser = (user: User | undefined | null) => {
        this.user = user;
    }
}
