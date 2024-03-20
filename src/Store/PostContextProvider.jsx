import React,{useState} from "react";
import { PostContext } from "./FirebaseContex";

const Post = ({children})=>{
    const [postdetails,setPostdetails] = useState(null);
    return(
        <PostContext.Provider value={{postdetails,setPostdetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post;