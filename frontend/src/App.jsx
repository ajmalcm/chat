import React,{Suspense, lazy} from 'react'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from "react-router-dom";
import ProtectedRoute from './components/styled/auth/ProtectedRoute';
import LayoutLoader from './components/layout/Loaders';
const Home=lazy(()=>import("./pages/Home"));  //we use lazy function for dynmaic routing which is loaded only when its needed
const Login=lazy(()=>import("./pages/Login"));
const Chat=lazy(()=>import("./pages/Chat"));
const Group=lazy(()=>import("./pages/Group"));
const NotFound=lazy(()=>import("./pages/NotFound"));

let user=true;

const App = () => {

  return (
    <Router>
    <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<ProtectedRoute user={user}/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:chatId' element={<Chat/>}/>
        <Route path='/groups' element={<Group/>}/>
        </Route>
        <Route path='/login' element={
        <ProtectedRoute user={!user} redirect='/'>
          <Login/>
        </ProtectedRoute>
        }/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Suspense>
    </Router>
  )
}

export default App