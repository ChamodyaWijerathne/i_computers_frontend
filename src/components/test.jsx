import { useState } from "react"
import uploadFile from "../utils/mediaUpload";


export default function Test() {
    
    const [file, setFile] = useState(null); 

    async function upload(){
        try{
            const url= await uploadFile(file);
            console.log(url)
        }catch{
            console.log("Failed to upload the file")
        }
    }

    return (
        <div className="w-full h-full bg-yellow-300 flex justify-center items-center">
            <input type="file" onChange={
                (e)=>{
                    
                    setFile(e.target.files[0])
                }
            }/>
            <button onClick={upload} className="w-[100px] h-[80px] bg-blue-500 text-white rounded-md">Upload</button>
            
            
        </div>
    )
}