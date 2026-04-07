import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [otpsend, setOTPSend] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_API_URL;

    async function sendOTP(){
        if (!apiBaseUrl) {
            toast.error('API URL is not configured.');
            return;
        }

        setOTPSend(true);
        try{
            await axios.post(apiBaseUrl + '/users/send-otp', { email: email })
            toast.success('OTP sent successfully.');
        }catch(err){
            toast.error(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
            setOTPSend(false);
        }
    }

    return (
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex">
            <div className="w-1/2 h-full hidden lg:flex justify-center items-center flex-col">
                <img src="/logo.png" alt="Logo" className="w-75 h-75 object-cover" />
                <h1 className="text-4xl font-bold mt-5 text-white">Isuri Computers</h1>
                <p className="mt-2 text-secondary text-center w-80">
                    Enter your account email and we will send you a OTP.
                </p>
            </div>

            <div className="w-full lg:w-[50%] h-full flex justify-center items-center">
                {otpsend ? (
                    <div className="w-112.5 h-150 backdrop-blur-3xl shadow-2xl rounded-lg flex flex-col justify-center m-2">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20 object-cover mx-auto mb-5 lg:hidden" />
                        <h1 className="text-2xl font-semibold text-white text-center lg:hidden">Forgot Password</h1>
                        <p className="text-secondary px-5 mt-3 text-center">
                            OTP has been sent to your email.
                        </p>
                    </div>
                ) : (
                    <div className="w-112.5 h-150 backdrop-blur-3xl shadow-2xl rounded-lg flex flex-col justify-center m-2">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20 object-cover mx-auto mb-5 lg:hidden" />
                        <h1 className="text-2xl font-semibold text-white text-center lg:hidden">Forgot Password</h1>
                        <p className="text-secondary px-5 mt-3 text-center">
                            Provide the email associated with your account.
                        </p>

                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="m-5 p-3 w-[90%] h-12.5 rounded-lg border-2 border-secondary outline-none"
                    />

                    <button
                        onClick={sendOTP}
                        className="m-5 p-3 w-[90%] h-12.5 rounded-lg bg-accent text-white font-bold hover:bg-secondary hover:text-accent transition"
                    >
                        Send OTP
                    </button>

                    <p className="w-full text-right pr-5 text-secondary">
                        Remember your password? <Link to="/login" className="text-accent">Back to Login</Link>
                    </p>
                    </div>
                )}
                

                
            </div>
        </div>
    );
    
}
