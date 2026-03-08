import { useState } from "react"
import getFormatPrice from "../utils/price-format"


export default function ViewOrderInfoModel(props){
    const [isVisible, setIsVisible] = useState(false)
    const order = props.order
    const formattedOrderDate = order?.date ? new Date(order.date).toLocaleString() : "N/A"

    return(
        <>
            <button className="bg-secondary text-white px-2 py-1 rounded hover:bg-secondary/60" onClick={() => setIsVisible(true)}>
            View Details
            </button>
            {
                isVisible &&(
                    <div className="fixed inset-0 bg-black/50 flex items-center  z-50">
                        <div className="w-[600px] h-[600px] bg-white rounded-md">
                            <div className="w-full h-[200px] bg-accent rounded-md">
                                <div className="w-full flex items-center justify-between"> 
                                    <h1 className="text-2xl font-semibold text-white p-5"> {order.orderId}</h1>
                                    <h2 className="text-xl font-thin text-white p-5">{formattedOrderDate}</h2>
                                </div>
                                <div className="w-full flex items-center "> 
                                    <h1 className="text-2xl font-semibold text-white p-5"> {order.firstName + " " + order.lastName}</h1>
                                    <h2 className="text-sm font-thin text-white p-5">{order.email}</h2>
                                </div>
                                <div className="w-full flex items-center "> 
                                    <h1 className="text-2xl font-semibold text-white p-5">Total:  {getFormatPrice(order.total)}</h1>
                                    <h2 className="text-sm font-thin text-white p-5">Status: {order.status}</h2>
                                </div>
                            </div>
                        </div>
                            
                    </div>
                )
            }
        </>

    )
}