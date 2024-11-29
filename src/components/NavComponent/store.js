import { create } from "zustand";

export const useNavigation = create((set) => ({
    active: 'orders',
    isOpen: false,
    setIsOpen: (value) => set((state) => {
        return { isOpen: value }
    }),
    setActive: (value) => set((state) => {
        return { active: value }
    })
}))