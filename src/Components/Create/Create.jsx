import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
// import { getFirestore } from 'firebase/firestore';
// import { AuthFireBase } from '../../Store/FirebaseContex';
import { AuthContex, FireBase } from '../../Store/FirebaseContex';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const Create = () => {
  // const {Auth} = useContext(AuthFireBase)
  // console.log(Auth)
  const storage = getStorage();
  const navigate = useNavigate();
  const {data} = useContext(FireBase)
  const DB = getFirestore(data)
  const {user} = useContext(AuthContex)
  
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState(null);
  const [message,setMessage] = useState('');
  const date = new Date()

  const createHandle = (e)=>{
    e.preventDefault();
    setMessage(false)
    const imgRef = ref(storage, `/images/${image.name}`);
    uploadBytes(imgRef, image).then((snapshot)=>{
      console.log('uploaded')
    }).then(()=>{
        getDownloadURL(imgRef)
        .then((url) => {
        console.log("downloadable url is")  
        console.log(url)
        addDoc(collection(DB, "products"), {
          "id":user.uid,
          name,
          category,
          price,
          url,
          "created_at":date.toDateString()
        })
        .then(()=>(setMessage(true)))
      })
    })
    .catch((error)=>{
      const dis = error.code
      console.log(dis)
      if (dis==="storage/unauthorized"){
        navigate('/login')
      }
    })

  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={createHandle}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={name}
              onChange={(e)=>(setName(e.target.value))}
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={category}
              onChange={(e)=>(setCategory(e.target.value))}
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            value={price}
            onChange={(e)=>(setPrice(e.target.value))}
            type="number" id="fname" name="Price" />
            <br />

            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

            <br />
            <input onChange={(e)=>(setImage(e.target.files[0]))} type="file" />
            <br />
            <button  className="uploadBtn">upload and Submit</button>
          </form>
          {message && <p className='upload'>Uploaded successfully...!!</p>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
