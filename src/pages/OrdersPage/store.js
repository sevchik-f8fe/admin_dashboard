import { create } from "zustand";

export const useOrderPage = create((set) => ({
    orderOpen: false,
    filterParam: '',
    setOrderOpen: (value) => set((state) => {
        return { orderOpen: value }
    }),
    setFilterParam: (value) => set((state) => {
        return { filterParam: value }
    })
}))