import { createSlice } from "@reduxjs/toolkit"


const initialState={
    isNewGroup:false,
    isAddMember:false,
    isNotification:false,
    isMobile:false,
    isSearch:false,
    isFileMenu:false,
    isDeletedMenu:false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatId:"",
        groupChat:false
    }
}

const miscSlice=createSlice({
    name:"misc",
    initialState,
    reducers:{
        setIsNewGroup:(state,action)=>{
            state.isNewGroup=action.payload
        },
        setisAddMember:(state,action)=>{
            state.isAddMember=action.payload
        },
        setIsNotification:(state,action)=>{
            state.isNotification=action.payload
        },
        setIsMobile:(state,action)=>{
            state.isMobile=action.payload
        },
        setIsSearch:(state,action)=>{
            state.isSearch=action.payload
        },
        setIsFileMenu:(state,action)=>{
            state.isFileMenu=action.payload
        },
        setIsDeletedMenu:(state,action)=>{
            state.isDeletedMenu=action.payload
        },
        setUploadingLoader:(state,action)=>{
            state.uploadingLoader=action.payload
        },
        setSelectedDeleteChat:(state,action)=>{
            state.selectedDeleteChat=action.payload
        }

    }
})

export default miscSlice;

export const {setIsNewGroup,setisAddMember,setIsDeletedMenu,setIsFileMenu,setIsMobile,setIsNotification,setIsSearch,setSelectedDeleteChat,setUploadingLoader}=miscSlice.actions;