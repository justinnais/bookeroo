// import { AlertColor } from "@mui/material/Alert";
import create from "zustand";

export interface IAlert {
    message: string;
    // variant: AlertColor;
    open: boolean;
    setOpen: (v: boolean) => void;
    setAlert: (message: string) => void;
    // setAlert: (message: string, variant?: AlertColor) => void;
}

// TODO fix variant

export const useAlertStore = create<IAlert>((set) => ({
    message: "alert",
    // variant: "info",
    open: false,
    setOpen: (open: boolean) => set({ open }),
    // setAlert: (message: string, variant?: AlertColor) => {
    setAlert: (message: string) => {
        set({ message, open: true });
        // set({ message, variant: variant || "info", open: true });
    },
}));
