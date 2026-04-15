import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/loadingAnimation";

export default function ProductPage(){
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(
        ()=>{
            if(loading){
                let url = import.meta.env.VITE_API_URL + "/products/"
                if(searchQuery !=""){
                    url = import.meta.env.VITE_API_URL + "/products/search/"+searchQuery
                }
                axios.get(url)
                .then(
                    (response)=>{
                        setProducts(response.data)
                        setLoading(false)
                    }
                ).catch(
                    ()=>{
                        toast.error("Failed to fetch products.")
                        setLoading(false)
                    }
                )
            }
        },[loading,]
    )

    return(
        <div className="flex justify-center items-center flex-wrap bg-primary relative pt-[80px]">
            {
                loading && <LoadingAnimation/>
            }
            {
                <div className="w-full h-[60px] fixed top-[100px] z-99 flex justify-center items-center backdrop-blur-lg gap-5">
                    <input 
                        type="text" 
                        placeholder="Search for products..." 
                        className="w-[50%] h-[40px] rounded-md px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 placeholder-gray-400 transition duration-300 ease-in-out focus:shadow-lg focus:shadow-blue-500/50 focus:scale-105 "
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setLoading(true)
                            
                        }}
                    
                    />
                    <button 
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out focus:shadow-lg focus:shadow-blue-500/50 focus:scale-105"
                        onClick={()=>{
                            setSearchQuery("")
                            setLoading(true)
                        }}
                    > Get All Products
                    </button>
                </div>
            }
            {
               products.map(
                (item)=>{
                    return(
                        <ProductCard product={item} key={item.productId}/>
                    )
                }
               ) 
            }
        </div>
    )
}