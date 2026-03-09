import { useState } from "react"
import getFormatPrice from "../utils/price-format"
import { CgClose } from "react-icons/cg"


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
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="w-[600px] h-[600px] bg-white rounded-md relative">
                            <button
                                className="absolute top-[-20px] right-[-20px] w-10 h-10 flex items-center justify-center text-red-500 text-2xl rounded-full hover:bg-red-50"
                                onClick={() => setIsVisible(false)}
                                aria-label="Close order details"
                            >
                                <CgClose/>
                            </button>
                            <div className="w-full h-[200px] bg-accent rounded-md">
                                <div className="w-full flex items-center justify-between"> 
                                    <h1 className="text-2xl font-semibold text-white p-5"> {order.orderId}</h1>
                                    <h2 className="text-xl font-thin text-white p-5">{formattedOrderDate}</h2>
                                </div>
                                <div className="w-full flex items-center  justify-between"> 
                                    <h1 className="text-2xl font-semibold text-white p-5"> {order.firstName + " " + order.lastName}</h1>
                                    <h2 className="text-sm font-thin text-white p-5">{order.email}</h2>
                                </div>
                                <div className="w-full flex items-center  justify-between"> 
                                    <h1 className="text-2xl font-semibold text-white p-5">Total:  {getFormatPrice(order.total)}</h1>
                                    <h2 className="text-sm font-thin text-white p-5">Status: {order.status}</h2>
                                </div>
                            </div>
                            <div className="w-full h-[400px] p-5 overflow-y-scroll">
                                {
                                    order.items.map((item, index) => {
                                        const quantity =  item.qty
                                        const unitPrice = item.price

                                        return(
                                            <div key={item.productId} className="flex items-center gap-3">
                                                <img src={item.image} alt={item.name} className="h-[60px] w-[60px] object-cover"/>
                                                <div className="flex flex-col">
                                                    <h1 className="text-sm font-semibold text-secondary">{item.name}</h1>
                                                    <p className="text-sm text-secondary/70 font-semibold">Quantity: {quantity}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-secondary ml-auto">{getFormatPrice(unitPrice * quantity)}</span>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                            
                    </div>
                )
            }
        </>

    )
}