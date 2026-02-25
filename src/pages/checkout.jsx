import { useState } from "react";   
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { Link, useNavigate } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"
import { useLocation } from "react-router-dom"
import { BsQuestionCircle } from "react-icons/bs";



export default function Cart(){
    const SHIPPING_CHARGE = 300
    const location = useLocation()
    const [cart, setCart] = useState(location.state || [])
    const navigate = useNavigate()

    if(location.state==null){
        navigate("/products")
    }
    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5 border">
            {
                cart.map(
                    (cartItem, index)=>{
                        return(
                            <div key={index} className="w-[600px] h-[80px] bg-white flex flex-row rounded-lg shadow overflow-visible">
                                <div className="h-[80px] aspect-square relative">
                                    <img className="h-[80px] aspect-square object-cover" src={cartItem.product.images} alt={cartItem.product.name}/>
                                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                                        {cartItem.qty}
                                    </span>
                                </div>
                                <div className="h-full w-[280px] p-4 flex flex-col overflow-hidden justify-between">
                                    <p className="text-xs text-gray-500">{cartItem.product.productId}</p>
                                    <h1 className="text-base font-bold">{cartItem.product.name}</h1>
                                    
                                </div>
                                
                                <div className="w-[150px] h-full flex flex-col justify-center items-center r">
                                    
                                    <span className="text-sm font-semibold text-secondary ">{getFormattedPrice(cartItem.product.price)}</span>
                                    <span className="text-base text-secondary font-bold left-0">{getFormattedPrice(cartItem.product.price*cartItem.qty)}</span>
                                </div>
                            </div>

                        )
                    }
                )
            }
            <div className="bg-blue-200 border-accent border-2 w-[600px] h-[150px] sticky bottom-0 rounded-xl shadow flex pt-5 ">
                
                <span className="text-base font-semibold text-secondary absolute left-5 top-2">Sub Total . {cart.reduce((total, item) => total + item.qty, 0)} items</span>
                <span className="text-base font-semibold text-secondary absolute right-5 top-2">{getFormattedPrice(getCartTotal(cart))}</span>
                <span className="text-base font-semibold text-secondary
                absolute left-5 top-9 flex items-center gap-1">
                    Shipping
                    <span className="relative group inline-flex items-center">
                        <BsQuestionCircle className="cursor-pointer" />
                        <span className="absolute w-[220px] left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-black/70 text-white text-[12px] leading-4 px-2 py-1 rounded whitespace-normal z-10">
                            Shipping charges are applied to cover packaging, handling, and delivery costs to ensure your order reaches you safely and on time.
                        </span>
                    </span>
                </span>
                <span className="text-base font-semibold text-secondary absolute right-5 top-9">
                    {getFormattedPrice(SHIPPING_CHARGE)}
                </span>
                <span className="text-base font-bold text-secondary absolute left-5 top-16">
                    Total
                </span>
                <span className="text-base font-bold text-secondary absolute right-5 top-16">
                    {getFormattedPrice(getCartTotal(cart)+SHIPPING_CHARGE)}
                </span>



                <div>
                    <button className="w-[100px] h-[40px] bg-secondary text-white rounded-full absolute bottom-3 right-4 hover:bg-secondary/80">
                    <Link to="/checkout">
                        Pay Now
                    </Link>
                    </button>
                     
                
                </div>
            </div>
            </div>
        </div>
    )

}