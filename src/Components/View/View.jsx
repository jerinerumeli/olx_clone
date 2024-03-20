import React, { useContext, useEffect, useState } from 'react';
import { FireBase, PostContext } from '../../Store/FirebaseContex';
import { collection,  getDocs, getFirestore } from "firebase/firestore";

import './View.css';
function View() {
  const {data} = useContext(FireBase)
  const db = getFirestore(data);
  const [userdetails,setUserdetails] = useState([]);
  // const docRef = doc(db, "users");

  // const auth = getAuth();
  // const user = auth.currentUser;
  const {postdetails} = useContext(PostContext);
  // console.log(postdetails)

  useEffect(()=>{
    
    async function getuser(){
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((user) =>{
        
        if(user.data().id===postdetails.userid)
            setUserdetails(user.data())
      })
    }
    getuser()
    
  })

  return (
    
      <div className="viewParentDiv">
          <div className="imageShowDiv">
            {postdetails ?
              <img
                src={postdetails.url}
                alt="post"
              />
              :window.location.href = '/'
            }
            
          </div>
          <div className="rightSection">
            <div className="productDetails">
              {postdetails &&
                <><p>&#x20B9; {postdetails.price} </p><span>{postdetails.name}</span><p>{postdetails.category}</p><span>{postdetails.created_at}</span></>
              }

            </div>
            { userdetails && 
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{userdetails.username}</p>
                <p>{userdetails.phone}</p>
              </div>
            }
          </div>
      </div>
  
  )
}
export default View;
