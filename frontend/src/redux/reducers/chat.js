import { createSlice } from "@reduxjs/toolkit"
import { getorSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";


const initialState={
    notificationCount:0,
   newMessagesAlert:getorSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true})||[{
    chatId:"",  //if new message is received, push the chatId and  increment count // if same senders sends multiple messages, increment count
    count:0
   }]
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
        },
        setNewMessagesAlert:(state,action)=>{
            const chatId=action.payload.chatId;
            
            let index=state.newMessagesAlert.findIndex((item)=>item.chatId===chatId);

            if(index!==-1)
            {
                state.newMessagesAlert[index].count+=1;
            }
            else{
                state.newMessagesAlert.push({
                    chatId,
                    count:1
                })
            }
        },
        removeNewMessagesAlert:(state,action)=>{
            state.newMessagesAlert=state.newMessagesAlert.filter((item)=>item.chatId!==action.payload)
        }
    }
})

export default chatSlice;

export const {incrementNotification,resetNotification,setNewMessagesAlert,removeNewMessagesAlert}=chatSlice.actions;