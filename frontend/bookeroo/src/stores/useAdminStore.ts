import create from "zustand";
import { editUser } from "../api/stores/user";
import { AccountStatus } from "../util/enums";
import { useAlertStore } from "./useAlertStore";

export interface IAdminStore {
    adjustStatus: (id: number, accountStatus: AccountStatus) => void;
}

export const useAdminStore = create<IAdminStore>((set) => ({
    adjustStatus: (id: number, accountStatus: AccountStatus) => {
        const alert = useAlertStore((state) => state.setAlert);
        const toast = (message: string) => alert(message);
        // editUser(id, { accountStatus }),

        editUser(id, { accountStatus }).then((res) =>
            res.status === 200
                ? toast(`Successfully set account status to ${accountStatus}`)
                : toast("Failed to set account status")
        );
    },
}));
