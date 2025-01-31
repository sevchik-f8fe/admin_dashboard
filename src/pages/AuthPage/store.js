import { create } from "zustand";

export const useAuth = create((set) => ({
    token: '',
    data: {},
    setToken: (value) => set((state) => {
        console.log(value)
        return { token: value }
    }),
    setData: (value) => set((state) => {
        console.log(value)
        return { data: value }
    })
}))