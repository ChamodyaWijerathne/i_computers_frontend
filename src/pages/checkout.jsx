import { useState } from "react";   
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"
import { useLocation } from "react-router-dom"





export default function Cart(){
    const location = useLocation()
    const [cart, setCart] = useState(location.state || [])
    const navigate = useNavigate()

    if(location.state==null){
        navigate("/products")
    }
    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
            {
                cart.map(
                    (cartItem, index)=>{
                        return(
                            <div key={index} className="w-[600px] h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden">
                                <img className="h-[150px] aspect-square object-cover" src={cartItem.product.images} alt={cartItem.product.name}/>
                                <div className="h-full w-[280px] p-4 flex flex-col overflow-hidden justify-between">
                                    <p className="text-xs text-gray-500">{cartItem.product.productId}</p>
                                    <h1 className="text-xl font-bold">{cartItem.product.name}</h1>
                                    <div className="w-[210px] h-[50px] border border-accent rounded-full overflow-hidden flex">
                                        <button onClick={
                                            ()=>{
                                                addToCart(cartItem.product,-1)
                                                setCart(getCart())
                                            }
                                        } className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent">
                                            <BiMinus size={22} />
                                        </button>
                                        <span className="w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                            {cartItem.qty}
                                        </span>
                                        <button onClick={
                                            ()=>{
                                                addToCart(cartItem.product,1)
                                                setCart(getCart())
                                            }
                                        } className="w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent">
                                            <BiPlus size={22} />
                                        </button>

                                    </div>
                                
                                    
                                </div>
                                <div className="w-[150px] h-full flex flex-col justify-center items-end pr-2">
                                    {
                                        cartItem.product.labeledPrice>cartItem.product.price && (
                                            <span className="text-sm text-gray-500 line-through">{getFormattedPrice(cartItem.product.labeledPrice)}</span>
                                        )
                                    }
                                    <span className="text-sm font-semibold text-secondary ">{getFormattedPrice(cartItem.product.price)}</span>
                                    <span className="text-lg text-secondary font-bold">{getFormattedPrice(cartItem.product.price*cartItem.qty)}</span>
                                </div>
                            </div>

                        )
                    }
                )
            }
            <div className="bg-blue-200 border-accent border-2 w-[600px] h-[150px] sticky bottom-0 rounded-xl shadow flex pt-5">
                
                <span className="text-lg font-bold text-secondary absolute left-5">Sub Total </span>
                <span className="text-lg font-bold text-secondary absolute right-5 border-b-4 border-double">{getFormattedPrice(getCartTotal(cart))}</span>

                <div>
                    <button className="w-[180px] h-[40px] bg-secondary text-white rounded-full absolute bottom-5 right-8 hover:bg-secondary/80">
                    <Link to="/checkout">
                        Proceed to Checkout
                    </Link>
                </button>
                <button onClick={
                    ()=>{
                        navigate("/products")
                    }
                }
                className="w-[180px] h-[40px] bg-gray-500 text-white rounded-full absolute bottom-5 left-8 hover:bg-gray-500/80">
                    Continue Shopping
                </button>
                </div>
            </div>
            </div>
        </div>
    )

}