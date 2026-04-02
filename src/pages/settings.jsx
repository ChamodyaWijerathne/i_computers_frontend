import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFile from "../utils/mediaUpload";

export default function SettingPage(){
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setExistingImageUrl(response.data.image)
                    console.log(response.data)
                }).catch((error) => {
                    localStorage.removeItem("token")
                    window.location.href="/login"
                })

            }else{
                window.location.href="/login"
            }
        },[]
    )

    async function updateProfile(){
        const token = localStorage.getItem("token")
        
        const updatedInfo={
            firstName: firstName,
            lastName: lastName,
            image: existingImageUrl
        }
        if(file!= null){
            updatedInfo.image = await uploadFile(file)
        }
        const response = await axios.put(import.meta.env.VITE_API_URL + "/users/", updatedInfo, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        localStorage.setItem("token", response.data.token)
        toast.success("Profile updated successfully")
        window.location.reload()

    }
    async function changePassword(){
        if(password != confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        const token = localStorage.getItem("token")
        await axios.post(import.meta.env.VITE_API_URL + "/users/update-password", {
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success("Password changed successfully")
        window.location.reload()
    }

    return(
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/30">
                <h1 className="text-2xl font-bold text-slate-800 mb-5">Account Settings</h1>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg py-2.5 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full mt-3 border border-slate-300 bg-slate-50 rounded-lg py-2.5 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <input type="file" placeholder="Profile Picture" onChange={(e)=>setFile(e.target.files[0])} className="w-full mt-3 border border-slate-300 bg-slate-50 rounded-lg py-2.5 px-4 text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium shadow-md shadow-blue-500/30 transition"  onClick={updateProfile}>Update Profile</button>
                
            </div>

            <div className="w-full lg:w-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-300/30">
                <h1 className="text-2xl font-bold text-slate-800 mb-5">Change Password</h1>
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 rounded-lg py-2.5 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-3 border border-slate-300 bg-slate-50 rounded-lg py-2.5 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium shadow-md shadow-blue-500/30 transition" onClick={changePassword}>Change Password</button>
            </div>
            </div>
            
            
        </div>
    )
}