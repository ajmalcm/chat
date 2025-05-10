import { createSlice } from "@reduxjs/toolkit"
import { adminLogin, getAdmin } from "../thunks/admin"
import toast from "react-hot-toast"


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
    },
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.fulfilled,(state,action)=>{
            state.isAdmin=true;
            toast.success(action.payload);
        }).addCase(adminLogin.rejected,(state,action)=>{
            state.isAdmin=false;
            toast.error(action.error.message);
        }).
        addCase(getAdmin.fulfilled,(state,action)=>{
            if(action.payload)
            state.isAdmin=true
        else
            state.isAdmin=false;
        })
        .addCase(getAdmin.rejected,(state,action)=>{
            state.isAdmin=false;
        })
    }
})

export default authSlice;

export const {userExists,userNotExists}=authSlice.actions;