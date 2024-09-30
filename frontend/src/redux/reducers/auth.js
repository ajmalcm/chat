import { createSlice } from "@reduxjs/toolkit"


const initialState={
    user:"",
    isAdmin:false,
    loading:true,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userExists:(state,action)=>{
            state.user=action.payload,
            state.loading=false
        },
        userNotExists:(state,action)=>{
            state.user=null,
            state.loading=false
        }
    }
})

export default authSlice;

export const {userExists,userNotExists}=authSlice.actions;