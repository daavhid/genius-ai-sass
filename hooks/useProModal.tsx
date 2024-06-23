import {create} from 'zustand'
interface usePromodalStoreI{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
};

export const usePromodal = create<usePromodalStoreI>((set)=>({
    isOpen:false,
    onOpen: ()=>set({isOpen:true}),
    onClose: ()=>set({isOpen:false}),

}))

 