import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from "./Pages/Home";
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import {Route,Routes, BrowserRouter as Router} from 'react-router-dom'
import { AuthContex } from './Store/FirebaseContex';
import { onAuthStateChanged,getAuth } from 'firebase/auth';
import { FireBase } from './Store/FirebaseContex';
import ViewPost from "./Pages/ViewPost"
import Post from './Store/PostContextProvider';

function App() {
  const {data} = useContext(FireBase)
  const auth = getAuth(data);
  const {setUser} = useContext(AuthContex)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        setUser(user)
    })
  })
  return (
    
    <div >
      <Post>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route exact path='/signup' element={<SignupPage />} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/create' element={<CreatePage />} />
            <Route exact path='/view' element={<ViewPost/>} />
          </Routes>
        </Router>
      </Post>
    </div>
  )
}

export default App;
