import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, getFirestore,} from "firebase/firestore";
import Heart from '../../assets/Heart';
import './Post.css';
import { FireBase } from '../../Store/FirebaseContex';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../Store/FirebaseContex';

 function  Posts() {
  const {setPostdetails} = useContext(PostContext);
  const navigate=useNavigate();
  const {data} = useContext(FireBase)
  const db = getFirestore(data);
  const[product,setProduct] = useState([])

  useEffect(()=>{
    async function products (){
 
        const querySnapshot = await getDocs((collection(db, "products",)));
        const allPost = querySnapshot.docs.map((product) =>{
          return {
            ...product.data(),
            id:product.id
          }
          
        })
        setProduct(allPost)
 
      // console.log(allPost)
    }
    products()
    // console.log(product)
  },[])
  
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {product &&
          product.map((obj)=>{
            return(
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div onClick={()=>{
                  setPostdetails(obj)
                  navigate('/view')
                  }} className="image">
                  <img src={obj.url} alt="posts" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.created_at}</span>
                </div>
              </div>
          )
          })
          
        }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
        {product &&
          product.map((obj)=>{
            return(
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div onClick={()=>{
                  setPostdetails(obj)
                  navigate('/view')
                  }} className="image">
                  <img src={obj.url} alt="posts" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.created_at}</span>
                </div>
              </div>
          )
          })
          
        }
        </div>
        
      </div>
    </div>
  );
}

export default Posts;
