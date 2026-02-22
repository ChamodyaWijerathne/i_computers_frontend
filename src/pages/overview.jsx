import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast";
import { useState } from "react"
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";


export default function Overview(){
    const params = useParams()
    
   // Fetch product details using the productId from params 
    
    const [product, setProduct] = useState(null)

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL + "/products/"+params.productId)
            .then(
                (response)=>{
                    setProduct(response.data)
                }
            )

        },[]
    )


    return(
        <div className="flex justify-center items-center h-[calc(100vh-100px)] w-full ">
            {
                product==null?<LoadingAnimation/>:
                <div className="w-full h-full flex">
                    <div className="w-[50%] h-full border">
                        <ImageSlideShow images={product.images}/>
                    </div>
                    <div className="w-[50%] h-full border">
                        
                    </div>
                </div>
            }
        </div>
    )
}