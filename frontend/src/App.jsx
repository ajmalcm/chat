import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/styled/auth/ProtectedRoute";
import LayoutLoader from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import {useDispatch, useSelector} from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import {Toaster} from "react-hot-toast"
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home")); //we use lazy function for dynmaic routing which is loaded only when its needed
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin=lazy(()=>import("./pages/admin/AdminLogin"));
const Dashboard=lazy(()=>import("./pages/admin/Dashboard"));
const UserManagement=lazy(()=>import("./pages/admin/UserManagement"));
const ChatManagement=lazy(()=>import("./pages/admin/ChatManagement"));
const MessageManagement=lazy(()=>import("./pages/admin/MessageManagement"));

const App = () => {

  const {user,loading}=useSelector(state=>state.auth);

  const dispatch=useDispatch();

  useEffect(()=>{
    axios.get(`${server}/api/v1/user/me`,{withCredentials:true}).
    then(({data})=>dispatch(userExists(data?.user))).
    catch((err)=>dispatch(userNotExists()));
  },[dispatch])

  return loading ? <LayoutLoader/>: (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            <SocketProvider>
            <ProtectedRoute user={user} />
          </SocketProvider>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />

            <Route path="/admin" element={<AdminLogin/>}/>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/users" element={<UserManagement/>}/>
            <Route path="/admin/chats" element={<ChatManagement/>}/>
            <Route path="/admin/messages" element={<MessageManagement/>}/>


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </Router>
  );
};

export default App;
