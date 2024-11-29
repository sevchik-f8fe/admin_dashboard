import { create } from "zustand";

export const useSearchField = create((set) => ({
    value: '',
    setValue: (value) => set((state) => {
        return { value: value }
    })
}))