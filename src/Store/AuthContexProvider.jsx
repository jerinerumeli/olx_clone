import React,{useState} from "react";
import { AuthContex } from "./FirebaseContex";

const Contex =({children})=>{
    const [user,setUser] = useState(null);
    return(
        <AuthContex.Provider value={{user,setUser}}>
            {children}
        </AuthContex.Provider>
    )
}

export default Contex;