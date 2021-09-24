import create from "zustand";
import { IAccount } from "../api/models/Account";
import { AccountType } from "../util/enums";
import storage from "../util/storage";
import jwt from "jsonwebtoken";

export interface IAuthStore {
    user: IAccount | undefined;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (user: IAccount) => void;
    logout: () => void;
}

// TODO this needs a cleanup
export const useAuthStore = create<IAuthStore>((set) => ({
    user: storage.getToken()
        ? (jwt.decode(storage.getToken()) as IAccount)
        : undefined,
    isAuthenticated: !!storage.getToken(),
    isAdmin: false,
    login: (user: IAccount) => {
        const isAuthenticated = !!user; // if user is provided, set true

        // if user is provided, check if admin
        const isAdmin =
            user && Object.values(user).length > 0
                ? (user as IAccount).accountType === AccountType.ADMIN
                : false;

        console.log("login", user, isAuthenticated, isAdmin);
        set({ user, isAuthenticated, isAdmin });
    },
    logout: () => {
        storage.clearToken();
        set({ user: undefined, isAuthenticated: false, isAdmin: false });
    },
}));
