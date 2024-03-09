import { create } from "zustand";

type CardModalStore = {
    id?: string;
    currUserId?: string;
    isOpen: boolean;
    onOpen: (id : string, currUserId : string) => void;
    onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id : string, currUserId : string) => set({isOpen : true, id, currUserId}),
    onClose: () => set({ isOpen : false, id: undefined })
}))