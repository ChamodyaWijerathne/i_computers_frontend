import { useState } from "react";   
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"




export default function Cart(){

    const [cart, setCart] = useState(getCart())
    const navigate = useNavigate()

    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll">
            <div className="w-full flex justify-center items-center flex-col gap-4 p-5">
            {
                cart.map(
                    (cartItem, index)=>{
                        return(
                            <div key={index} className="w-full lg:w-[600px] lg:h-[150px] bg-white flex flex-row rounded-lg shadow overflow-hidden items-center ">
                                <img className="h-[150px] aspect-square object-cover" src={cartItem.product.images} alt={cartItem.product.name}/>
                                <div className="h-full w-[280px] p-4 flex flex-col overflow-hidden ">
                                    <p className="text-xs text-gray-500">{cartItem.product.productId}</p>
                                    <h1 className="text-xl font-bold">{cartItem.product.name}</h1>
                                    <div className=" lg:w-[210px] h-[50px] border border-accent rounded-full overflow-hidden flex overflow-hidden justify-center lg:justify-between">
                                        <button onClick={
                                            ()=>{
                                                addToCart(cartItem.product,-1)
                                                setCart(getCart())
                                            }
                                        } className="lg:w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent">
                                            <BiMinus size={22} />
                                        </button>
                                        <span className="lg:w-[70px] h-full flex justify-center items-center text-lg font-bold text-gray-700">
                                            {cartItem.qty}
                                        </span>
                                        <button onClick={
                                            ()=>{
                                                addToCart(cartItem.product,1)
                                                setCart(getCart())
                                            }
                                        } className="lg:w-[70px] h-full flex justify-center items-center text-2xl font-bold text-gray-700 hover:bg-accent">
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
            <div className="bg-blue-200 border-accent border-2 w-full lg:w-[600px] min-h-[190px] lg:h-[150px] sticky bottom-0 rounded-xl shadow flex pt-5 px-4 pb-4 lg:px-0 lg:pb-0">
                
                <span className="text-lg font-bold text-secondary absolute left-5">Sub Total </span>
                <span className="text-lg font-bold text-secondary absolute right-5 border-b-4 border-double">{getFormattedPrice(getCartTotal(cart))}</span>

                <div className="w-full mt-12 flex flex-col gap-3 lg:mt-0 lg:block">
                    <Link state={cart}  to="/checkout" className="w-full lg:w-[180px] h-[40px] bg-secondary text-white rounded-full hover:bg-secondary/80 flex items-center justify-center lg:absolute lg:bottom-5 lg:right-8">
                        Proceed to Checkout
                    </Link>

                    <button onClick={
                        ()=>{
                            navigate("/products")
                        }
                    }
                    className="w-full lg:w-[180px] h-[40px] bg-gray-500 text-white rounded-full hover:bg-gray-500/80 lg:absolute lg:bottom-5 lg:left-8">
                        Continue Shopping
                    </button>
                </div>
            </div>
            </div>
        </div>
    )

}