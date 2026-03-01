import { use, useState } from "react";

export default function CheckoutDetailsModal({ placeOrder }) {
	const [isVisible, setIsVisible] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  


  return (
    <>
      <button
        onClick={placeOrder}
        className="w-[100px] h-[40px] bg-secondary/90 text-white rounded-full absolute bottom-3 right-4 hover:bg-secondary"
      >
        Pay Now
      </button>
      {isVisible && <div className="w-full h-full bg-black/50 fixed z-50 top-0 left-0 flex justify-center items-center">
        <div className="w-[400px] h-[500px] bg-white rounded-lg p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" />
          <button className="bg-accent text-white py-2 rounded" >Confirm</button>
      
        </div>
      </div>
      }
    </>
  )
}

