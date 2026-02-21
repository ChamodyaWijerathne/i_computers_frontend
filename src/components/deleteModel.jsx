import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function DeleteModel(props){
    const [isVisible, setIsVisible] = useState(false)
    const product = props.product
    const setLoading = props.setLoading

    return(
        <div> 
            <CiTrash onClick={() => {setIsVisible(true)}} className="text-red-600 hover:text-red-800 text-xl transition-colors cursor-pointer"/>
            {
                isVisible && (
                    <div className="fixed z-100 bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center">
                        <div className="w-[400px] h-[200px] bg-white relative rounded-2xl ">
                            {/* <button onClick={()=>{setIsVisible(false)}} className="w-[40px] h-[40px]  text-red-600 absolute right-0 text-sm font-bold hover:bg-rose-600 hover:text-white cursor-pointer">X</button> */}
                            <h2 className="text-center text-lg font-semibold mt-10">Are you sure you want to delete the product with product ID: {product.productId} ?</h2>
                            <div className="absolute bottom-5 left-0 w-full flex justify-center">
                                <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md" onClick={
                                    ()=>{
                                        const token = localStorage.getItem("token")

                                        axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId, {
                                            headers:{
                                                Authorization: "Bearer "+token 
                                            }
                                        }).then(
                                            ()=>
                                            {
                                                setIsVisible(false)
                                                toast.success("Product deleted successfully")
                                                setLoading(true)

                                            }
                                        ).catch(
                                            (error)=>{
                                                toast.error(error.response?.data?.message || "Failed to delete the product. Please try again")
                                                setIsVisible(false)
                                            }
                                        )
                                    }
                                }>Delete</button>
                                <button onClick={()=>{setIsVisible(false)}} className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md ml-4 bg-green-100">Cancel</button>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}