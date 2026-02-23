import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast";
import { useState } from "react"
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import getFormatPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";
import { getCart } from "../utils/cart";


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
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <ImageSlideShow images={product.images}/>
                    </div>
                    <div className="w-[50%] h-full p-5 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold">{product.name}
                            {product.altNames.map((altName, index)=>{
                                return(
                                    <span key={index} className=" text-gray-500 font-medium"> | {altName}</span>

                                )
                            })}
                        </h1>
                        {/*brand and model if available*/}
                        {(product.brand || product.model) &&
                            <p className="text-lg font-medium mb-2">
                                {product.brand && <span>{product.brand}</span>}
                                {product.brand && product.model && <span> - </span>}
                                {product.model && <span>{product.model}</span>}                               
                            </p>
                        }
                        <p className="text-sm text-gray-500 mb-4">{product.productId}</p>
                        <p className="text-lg font-bold mb-4"> {getFormatPrice(product.price)}</p>
                        {
                            product.labeledPrice &&
                            <p className="text-md text-gray-500 mb-4 line-through">{getFormatPrice(product.labeledPrice)}</p>
                        }
                        <p className="text-md mb-4">{product.description}</p>

                        <div className="w-full h-[100px] flex justify-center items-center">
                            <button onClick={
                                ()=>{
                                    addToCart(product, 1)
                                    toast.success(product.name + " Product added to cart")
                                }
                            }
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 cursor-pointer">Add to Cart</button>

                            <button onClick={
                                ()=>{
                                    console.log(getCart())
                                }
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 ml-4 cursor-pointer">Buy Now</button>

                        </div>
                        
                    </div>
                </div>
            }
        </div>
    )
}