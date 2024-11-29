import { create } from "zustand";

export const useAuth = create((set) => ({
    data: {},
    setData: (value) => set((state) => {
        console.log(value)
        return { data: value }
    })
}))