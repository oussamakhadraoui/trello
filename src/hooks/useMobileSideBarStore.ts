import {create } from 'zustand'


type MobileSideBarStore = {
 isOpen: boolean
 onOpen: () => void
 onClose: () => void
 toggle: () => void
}

export const useMobileSideBar= create<MobileSideBarStore>((set)=>({

 isOpen: false,
 onOpen: () => set({isOpen: true}),
 onClose: () => set({isOpen: false}),
 toggle: () => set((state) => ({isOpen: !state.isOpen}))
}))