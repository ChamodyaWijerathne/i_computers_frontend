import { Link } from 'react-router-dom';

export default function LoginPage(){
    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex">
           
           <div className="w-1/2 h-full flex justify-center items-center flex-col">
                <img src="/logo.png" alt="Logo" className="w-[300px] h-[300px] object-cover"/>
                <h1 className="text-4xl font-bold mt-5 text-white">Welcome back!</h1>
           </div>

           <div className="w-1/2 h-full flex justify-center items-center">

                <div className="w-112.5 h-150 backdrop-blur-3xl shadow-2xl rounded-lg flex flex-col justify-center">
                    <input type="email" placeholder="Email" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border-2 border-secondary outline-none"/>
                    <input type="password" placeholder="Password" className="m-5 p-3 w-[90%] h-[50px] rounded-lg border-2 border-secondary outline-none"/>
                    <p className="w-full text-right pr-5">Forgot Password?<Link to="/forgot-password" className="text-accent">Reset</Link></p>
                    <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-accent text-white font-bold hover:bg-secondary hover:text-accent transition">Login</button>
                    <button className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-accent text-white font-bold m-5 p-3">Login with Google</button>
                    <p className="w-full text-right pr-5">Don't have an account? <Link to="/register" className="text-accent">Register</Link></p>


                </div>
                
           </div>
            

            
        

            
        </div>
    )
}