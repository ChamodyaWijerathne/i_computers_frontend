import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage(){
    const[email,setEmail] = useState(''); //React hooks- allows you to add state to functional components. useState is a hook that returns an array with two elements: the current state value and a function to update that value. In this case, email is the current state value, and setEmail is the function that can be used to update it. The initial value of email is set to an empty string ('').
    const[password,setPassword] = useState('');
    const navigate = useNavigate() //useNavigate is a hook provided by react-router-dom that allows you to programmatically navigate between different routes in your application.
    

    // function login(){
        
    //     axios.post("http://localhost:3000/users/login", 
    //         {
    //         email: email,
    //         password: password
    //         }
    //     ).then(
    //         (res) => {
    //             console.log(res);
    //         }
    //     ).catch(
    //         (error) => {
    //             console.log(error);
    //         }
    //     )
    // }

    async function login(){
       
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL+'/users/login',
                {
                email: email,
                password: password
                }
            );
            console.log(response);
            if(response.data.role == "admin"){
                //window.location.href="/admin/"
                navigate('/admin/');
            }else{

            }
        } catch(error){
            console.log(error);
            toast.error("Login failed");
            }
        }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex">
           
           <div className="w-1/2 h-full flex justify-center items-center flex-col">
                <img src="/logo.png" alt="Logo" className="w-[300px] h-[300px] object-cover"/>
                <h1 className="text-4xl font-bold mt-5 text-white">Welcome back!</h1>
           </div>

           <div className="w-1/2 h-full flex justify-center items-center">

                <div className="w-112.5 h-150 backdrop-blur-3xl shadow-2xl rounded-lg flex flex-col justify-center m-2">
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={
                            (e)=>{
                                setEmail(e.target.value);
                                
                            }
                        } 
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border-2 border-secondary outline-none"
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={ //React event handler-runs every time the user types, deletes, or changes the input field
                            (e) => { //event onject is created
                                setPassword(e.target.value)
                            }
                        }
                        className="m-5 p-3 w-[90%] h-[50px] rounded-lg border-2 border-secondary outline-none"
                    />

                    <p className="w-full text-right pr-5">Forgot Password? <Link to="/forgot-password" className="text-accent">Reset</Link></p>

                    <button onClick={login} className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-accent text-white font-bold hover:bg-secondary hover:text-accent transition">Login</button>

                    <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-accent text-white font-bold m-5 p-3">Login with Google</button>

                    <p className="w-full text-right pr-5">Don't have an account? <Link to="/register" className="text-accent">Register</Link></p>


                </div>
                
           </div>
            

            
        

            
        </div>
    )
}