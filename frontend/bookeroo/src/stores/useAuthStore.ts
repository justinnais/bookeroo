import create from "zustand";
import { IAccount } from "../api/models/Account";
import { AccountStatus, AccountType } from "../util/enums";
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
    isAdmin: storage.getToken()
        ? (jwt.decode(storage.getToken()) as IAccount).accountType ===
          AccountType.ADMIN
        : false,
    login: (user: IAccount) => {
        const isAuthenticated = !!user; // if user is provided, set true

        // if user is provided, check if admin
        const isAdmin = user ? user.accountType === AccountType.ADMIN : false;

        set({ user, isAuthenticated, isAdmin });
    },
    logout: () => {
        storage.clearToken();
        set({ user: undefined, isAuthenticated: false, isAdmin: false });
    },
}));
