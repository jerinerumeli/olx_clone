import React,{useState,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FireBase } from '../../Store/FirebaseContex';
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { getFirestore,addDoc,collection } from "firebase/firestore";
import {useNavigate} from "react-router-dom"
import ReactLoading from "react-loading";

export default function Signup() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [load,setLoad] = useState(false)

  const {data} = useContext(FireBase)
  const Auth = getAuth(data)
  const DB = getFirestore(data)
  const navigate = useNavigate()


  const handleSignup = async (e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(Auth,`${email}`, `${password}`).then(userdata=>{
      
      const users = userdata.user;
  
      updateProfile(users,{
        displayName: username
      }).then(()=>{
        addDoc(collection(DB, "users"), {
          "id":users.uid,
          "username":username,
          "email":email,
          "phone":phone
        })
      })

    }).then(()=>{
      setLoad(true)
      navigate('/login')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Atleast six charac")
    })
  }
  return (
    <div>
      
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"

            value={username}
            onChange={(e)=>(setUsername(e.target.value))}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"

            value={email}
            onChange={(e)=>(setEmail(e.target.value))}
            min={6}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"

            value={phone}
            onChange={(e)=>(setPhone(e.target.value))}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
      {load && <ReactLoading className='loading' type="bubbles" color="#0000FF" height={100} width={50} />}
    </div>
  );
}
