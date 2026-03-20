import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function RegisterPage(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[email,setEmail] = useState(''); //React hooks- allows you to add state to functional components. useState is a hook that returns an array with two elements: the current state value and a function to update that value. In this case, email is the current state value, and setEmail is the function that can be used to update it. The initial value of email is set to an empty string ('').
    const navigate = useNavigate() //useNavigate is a hook provided by react-router-dom that allows you to programmatically navigate between different routes in your application.
    

    // function signup(){
        
    //     axios.post("http://localhost:3000/users/register", 
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

    async function signup(){
        if(password != confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL+'/users',
                {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName

                }
            );
            console.log(response);
            toast.success("Sign UP successfully");
            navigate('/login');
        } catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "Sign Up failed"); 
            }
        }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex">
           
           <div className="w-1/2 h-full flex justify-center items-center flex-col">
                <img src="/logo.png" alt="Logo" className="w-75 h-75 object-cover"/>
                {/* // w-75 h-75 can be used as w-[300px] h-[300px] */}
                <h1 className="text-4xl font-bold mt-5 text-white">Welcome back!</h1>
           </div>

           <div className="w-1/2 h-full flex justify-center items-center">

                <div className="w-112.5 h-150 backdrop-blur-3xl shadow-2xl rounded-lg flex flex-col justify-center m-2">
                    <div className="m-5 w-[90%] flex items-center gap-5">
                        <input value={firstName} onChange={
                            (e)=>{
                                setFirstName(e.target.value);
                            }
                        } placeholder="First Name" className="p-3 w-1/2 h-12.5 rounded-lg border-2 border-secondary outline-none"/>
                        <input value={lastName} onChange={
                            (e)=>{
                                setLastName(e.target.value);
                            }
                        } placeholder="Last Name" className="p-3 w-1/2 h-12.5 rounded-lg border-2 border-secondary outline-none"/>
                    </div>

                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={
                            (e)=>{
                                setEmail(e.target.value);
                                
                            }
                        } 
                        className="m-5 p-3 w-[90%] h-12.5 rounded-lg border-2 border-secondary outline-none"
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={ //React event handler-runs every time the user types, deletes, or changes the input field
                            (e) => { //event onject is created
                                setPassword(e.target.value)
                            }
                        }
                        className="m-5 p-3 w-[90%] h-12.5 rounded-lg border-2 border-secondary outline-none"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={ //React event handler-runs every time the user types, deletes, or changes the input field
                            (e) => { //event onject is created
                                setConfirmPassword(e.target.value)
                            }
                        }
                        className="m-5 p-3 w-[90%] h-12.5 rounded-lg border-2 border-secondary outline-none"
                    />

                    

                    <button onClick={signup} className="m-5 p-3 w-[90%] h-12.5 rounded-lg bg-accent text-white font-bold hover:bg-secondary hover:text-accent transition">Sign Up Now</button>

                    <button className="m-5 p-3 w-[90%] h-12.5 rounded-lg border border-accent text-white font-bold">Sign Up with Google</button>

                    <p className="w-full text-right pr-5">Already have an account? <Link to="/login" className="text-accent">Log In</Link></p>


                </div>
                
           </div>
            

            
        

            
        </div>
    )
}