import { boolean, string } from "yup/lib/locale";
import create from "zustand";

export interface Foo {
    message: string;
    setMessage: (message: string) => void;
    open: boolean;
    setOpen: (v: boolean) => void;
    setAlert: (message: string, variant?: string) => void;
}

export const useAlertStore = create<Foo>((set) => ({
    message: "aaaaaaa",
    setMessage: (message: string) => set({ message }),
    open: false,
    setOpen: (open: boolean) => set({ open }),
    setAlert: (message: string, variant?: string) => {
        set({ message, open: true });
    },
}));
