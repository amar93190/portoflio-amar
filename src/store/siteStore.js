import { create } from 'zustand'

export const useSiteStore = create((set) => ({
  isReady: false,
  setReady: () => set({ isReady: true }),
}))
