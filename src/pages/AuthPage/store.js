import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuth = create()(
    persist(
        (set) => ({
            token: '',
            setToken: (value) => set({ token: value }),
        }),
        {
            name: 'token-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);