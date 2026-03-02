import { use, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function CheckoutDetailsModal(props) {
	const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  

  const cart = props.cart
  
  async function placeOrder(){// This is where you would typically send the order data to your backend server for processing

    const token = localStorage.getItem("token")
    if(token == null){
        toast.error("Please login to place an order.")
        window.location.href = "/login"
        return
    }

        const order = {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            phone: phone,
            country : "Sri Lanka",
            items: [],
            
        }
        cart.forEach(
            (item)=>{
                order.items.push({
                    productId: item.product.productId,
                    qty: item.qty
                })
            }
        )
        console.log(order)
        
        try{
            await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
				headers:{
					Authorization: `Bearer ${token}`
				}
			})
			toast.success("Order placed successfully!")
			window.location.href = "/"
            
                


        }catch(error){
            
            toast.error(error.response.data.message || "Failed to place order. Please try again.")
			return
        }


    }

  return (
    <>
      <button onClick={() => setIsVisible(true)}
        className="w-[100px] h-[40px] bg-secondary/90 text-white rounded-full absolute bottom-3 right-4 hover:bg-secondary"
      >
        Pay Now
      </button>

      {isVisible && <div className="w-full h-full bg-black/50 fixed z-50 top-0 left-0 flex justify-center items-center">
        <div className="w-[400px] h-[550px] bg-white rounded-lg p-6 flex flex-col gap-4 relative">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-red-600 text-2xl font-bold leading-none hover:text-red-700"
            aria-label="Close checkout details"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" />
          <button onClick={placeOrder} className="bg-accent hover:bg-blue-600 text-white py-2 rounded" >Confirm</button>
      
        </div>
      </div>
      }
    </>
  )
}

