import { useState } from "react"

export default function Test() {
    const [count,setCount] = useState(0)

    return (
        <div className="w-full h-full bg-yellow-300 flex justify-center items-center">
            <div className="w-100 h-100 bg-white flex justify-center items-center flex-col">
                <h1 className="text-[40px]">{count}</h1>
                <div className="w-full h-12.5 flex justify-center items-center gap-2">
                    <button onClick={
                        ()=>{
                            setCount(count-1)
                        }
                    } className="w-25 h-11.25 bg-red-700 text-white">
                        Decrement
                    </button>
                    <button onClick={
                        ()=>{
                            setCount(count+1)
                        }
                    }className="w-[100px] h-[45px] bg-green-700 text-white ml-5">
                        Increment
                    </button>
                </div>


            </div>
            
        </div>
    )
}