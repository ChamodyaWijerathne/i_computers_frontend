import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function UserData(){
    const [user, setUserData] = useState(null)
    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(token != null){
                axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                .then((response) => {
                    setUserData(response.data)
                    console.log(response.data)
                })
            }
        },[]
    )
    return(
        <>
        {user == null? <div className="w-[150px] h-[50px]  absolute flex justify-center items-center">
            <Link to="/login" className="text-white mx-4 hover:border-b-2 mr-1">Login</Link>
            <Link to="/register" className="text-white mx-4 hover:border-b-2 ml-1">Register</Link>
        </div>: <div className="w-[150px] h-[50px]  flex justify-center items-center">
            <span className="text-white"> Welcome, {user.firstName}</span>
        </div>}
        </>
    )
}