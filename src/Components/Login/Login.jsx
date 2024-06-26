import React, { useState,useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Login.css';
import { FireBase } from '../../Store/FirebaseContex';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {data} = useContext(FireBase)
  const auth = getAuth(data);
  const navigate = useNavigate()
  const [errorCode,setErrorcode] = useState(null)

  const loginHandle = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/')
      // console.log("singned in",user)
      // ...
    }).catch((error) => {
      setErrorcode(error.code)
      // const errorMessage = error.message;
      // console.log(error.code)
  
    });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={loginHandle}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"

            value={email}
            onChange={(e)=>(setEmail(e.target.value))}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"

            value={password}
            onChange={(e)=>(setPassword(e.target.value))}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
        {errorCode && <p className='error'>Wrong password or username</p>}
      </div>
    </div>
  );
}

export default Login;
