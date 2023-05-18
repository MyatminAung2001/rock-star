import { create } from "zustand";

export const useApiStore = create((set) => ({
    apiData: null,
    setApiData: (data) => set({ apiData: data }),
}));
