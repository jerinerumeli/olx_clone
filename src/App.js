import './App.css';
import { collection, getDocs,addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore"; 
import {DB,Auth} from "./Firebase/config"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  return (
    
    <div >
      

      <button onClick={()=>{
        // createUserWithEmailAndPassword(Auth, "jerin@gmail.com", "password")
        // .then((userCredential) => {
        //   // Signed up 
        //   const user = userCredential.user;
        //   console.log(user)
        //   // ...

        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   // ..
        // });
        

        // updateDoc(doc(DB, "product", "jPrvF22pPblBwkI8liWZ"),{
        //   "type":"jerin"
        // });

        getDocs(collection(DB, "product")).then((snapshot)=>{
          snapshot.forEach((obj)=>{
            console.log(`${obj.id} => ${JSON.stringify(obj.data())}`)
          })
        })

        // addDoc(collection(DB, "product"), {
        //   "type":"nokia",
        //   "price":20000
        // })
      }}>click</button>
    </div>
  );
}

export default App;
