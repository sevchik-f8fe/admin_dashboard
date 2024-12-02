import { create } from "zustand";

export const useAuth = create((set) => ({
    data: {},
    isAuth: false,
    setAuth: (value) => set((state) => {
        return { isAuth: value }
    }),
    setData: (value) => set((state) => {
        console.log(value)
        return { data: value }
    })
}))