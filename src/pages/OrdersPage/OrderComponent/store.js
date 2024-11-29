import { create } from "zustand";

export const useOrder = create((set) => ({
    customerInfoOpen: false,
    statusOrder: 'underConsider',
    setCustomerInfoOpen: () => set((state) => {
        return { customerInfoOpen: !state.customerInfoOpen }
    }),
    setStatusOrder: (value) => set((state) => {
        return { statusOrder: value }
    })
}))