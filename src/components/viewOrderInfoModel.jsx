import { useState } from "react"
import getFormatPrice from "../utils/price-format"
import { CgClose } from "react-icons/cg"


export default function ViewOrderInfoModel(props){
    const [isVisible, setIsVisible] = useState(false)
    const order = props.order
    const formattedOrderDate = order?.date ? new Date(order.date).toLocaleString() : "N/A"
    const [status, setStatus] = useState(order.status)
    const [notes, setNotes] = useState(order.notes)

    return(
        <>
            <button className="bg-secondary text-white px-2 py-1 rounded hover:bg-secondary/60" onClick={() => setIsVisible(true)}>
            View Details
            </button>
            {
                isVisible &&(
                    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50">
                        <div className="w-[600px] h-[600px] bg-slate-50 rounded-xl border border-slate-200 shadow-2xl relative">
                            <button
                                className="absolute top-[-20px] right-[-20px] w-10 h-10 flex items-center justify-center text-red-500 bg-red-100 text-2xl rounded-full hover:bg-slate-100 hover:text-slate-700"
                                onClick={() => setIsVisible(false)}
                                aria-label="Close order details"
                            >
                                <CgClose/>
                            </button>
                            <div className="w-full h-[200px] bg-secondary rounded-t-xl">
                                <div className="w-full flex items-center justify-between"> 
                                    <h1 className="text-md font-semibold text-white px-3 py-1"> {order.orderId}</h1>
                                    <h2 className="text-md font-thin text-white px-3 py-1">{formattedOrderDate}</h2>
                                </div>
                                <div className="w-full flex items-center  justify-between"> 
                                    <h1 className="text-md font-semibold text-white px-3 py-1"> {order.firstName + " " + order.lastName}</h1>
                                    <h2 className="text-sm font-thin text-white px-3 py-1">{order.email}</h2>
                                </div>
                                <div className="w-full flex items-center  justify-between"> 
                                    <h1 className="text-md font-semibold text-white px-3 py-1">Total:  {getFormatPrice(order.total)}</h1>
                                    <h2 className="text-sm font-thin text-white px-3 py-1">Status: {order.status}</h2>
                                    <select className="bg-white/90 border-white/40 border-2 text-slate-700 rounded-3xl mr-2 w-21 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="px-4 top-4 relative">
                                    <textarea className="w-full h-12 bg-white/90 border-white/40 border-2 text-slate-700 rounded-md p-2 placeholder:text-slate-400" placeholder="Add notes about this order..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                                <div className="w-full flex justify-end p-1">
                                    <button className="bg-white text-secondary px-2 py-1 rounded hover:bg-slate-100 text-sm top-42 mr-3 absolute">Save</button>
                                </div>
                            </div>
                            <div className="w-full h-[400px] p-5 overflow-y-scroll bg-white rounded-b-xl">
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