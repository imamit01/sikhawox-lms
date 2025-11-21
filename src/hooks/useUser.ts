import { create } from 'zustand';

interface UserState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (user: any) => void;
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
