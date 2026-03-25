import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function UserData(){
    const [user, setUserData] = useState(null)
    const [state, setState] = useState("me")
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
                }).catch((error) => {
                    localStorage.removeItem("token")
                    window.location.href="/login"
                })
            }
        },[]
    )
    return(
        <>
        {user == null? <div className="w-[150px] h-[50px] flex justify-center items-center gap-5">
            <Link to="/login" className="text-white mx-4 hover:border-b-2 mr-1">Login</Link> |
            <Link to="/register" className="text-white mx-4 hover:border-b-2 ml-1">Register</Link>
        </div>: 
        <div className="w-[180px] h-[50px]  flex justify-between items-center rounded-full overflow-hidden border border-white">
            
                <img src={user.image} className="w-[60px] h-[50px] object-cover "/>
                
            
            <select value={state} onChange={
                (e)=>{
                    setState(e.target.value)
                    if(e.target.value=="orders"){
                        window.location.href="/my-orders"
                    }
                    if(e.target.value=="settings"){
                        window.location.href="/settings"
                    }
                    if(e.target.value=="logout"){
                        localStorage.removeItem("token")
                        window.location.href="/login"
                    }
                    setState("me")
                }
            }
            className="text-white bg-transparent">
                <option value="me" className="bg-accent p-2">{user.firstName}</option>
                <option value="orders" className="bg-accent p-2">My Orders</option>
                <option value="settings" className="bg-accent p-2">Settings</option>
                <option value="logout" className="bg-accent p-2">LogOut</option>
                
            </select>
        </div>}
        </>
    )
}