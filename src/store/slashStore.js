import { create } from 'zustand'

export const useSlashStore = create((set) => ({
  isSlashing: false,
  triggerSlash: () => {
    set({ isSlashing: true })
    setTimeout(() => set({ isSlashing: false }), 700)
  },
}))
