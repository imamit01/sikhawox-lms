import { create } from 'zustand';

interface CodeState {
    code: string;
    setCode: (code: string) => void;
}

export const useCodeStore = create<CodeState>((set) => ({
    code: '// Start coding...',
    setCode: (code) => set({ code }),
}));
