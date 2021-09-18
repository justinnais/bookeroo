import create from "zustand";
import { IAccount } from "../api/models/Account";
import { AccountType } from "../util/enums";

export interface IAuthStore {
    user: IAccount | {};
    isAuthenticated: boolean;
    isAdmin: boolean;
    setUser: (user: IAccount | {}) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    user: {},
    isAuthenticated: false,
    isAdmin: false,
    setUser: (user: IAccount | {}) => {
        const isAuthenticated = !!user; // if user is provided, set true

        // if user is provided, check if admin
        const isAdmin =
            Object.values(user).length > 0
                ? (user as IAccount).accountType === AccountType.ADMIN
                : false;
        set({ user, isAuthenticated, isAdmin });

        console.log(user, isAuthenticated, isAdmin);
    },
}));
