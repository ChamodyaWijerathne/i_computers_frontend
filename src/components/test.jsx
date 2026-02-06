import { useState } from "react"

export default function Test() {
    let count = 0;

    return (
        <div className="w-full h-full bg-yellow-300 flex justify-center items-center">
            <div className="w-[400px] h-[400px] bg-white flex justify-center items-center flex-col">
                <h1 className="text-[40px]">{count}</h1>
                <div className="w-full h-[50px] flex justify-center items-center gap-2">
                    <button onClick={
                        ()=>{
                            count = count - 1; 
                        }
                    } className="w-[100px] h-[45px] bg-red-700 text-white">
                        Decrement
                    </button>
                    <button onClick={
                        ()=>{
                            console.log("Increment clicked");
                        }
                    }className="w-[100px] h-[45px] bg-green-700 text-white ml-5">
                        Increment
                    </button>
                </div>


            </div>
            
        </div>
    )
}