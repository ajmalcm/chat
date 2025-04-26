import { createSlice } from "@reduxjs/toolkit"


const initialState={
    notificationCount:0,
   
}

const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        incrementNotification:(state,action)=>{
            state.notificationCount+=1;
        },
        resetNotification:(state,action)=>{
            state.notificationCount=0;
        }
    }
})

export default chatSlice;

export const {incrementNotification,resetNotification}=chatSlice.actions;