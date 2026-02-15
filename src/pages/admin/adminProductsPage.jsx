import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const sampleProducts = [
    {
    productId: "P001",
    name: "Gaming Mouse",
    description: "High precision RGB gaming mouse",
    altNames: ["Mouse", "RGB Mouse", "Gaming Accessories"],
    price: 4500,
    labeledPrice: 5500,
    category: "accessories",
    images: [
      "/images/mouse1.jpg",
      "/images/mouse2.jpg"
    ],
    isVisible: true,
    brand: "Logitech",
    model: "G102"
  },
  {
    productId: "P002",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    altNames: ["Keyboard", "Mechanical Keyboard"],
    price: 12500,
    labeledPrice: 14000,
    category: "accessories",
    images: [
      "/images/keyboard1.jpg",
      "/images/keyboard2.jpg"
    ],
    isVisible: true,
    brand: "Redragon",
    model: "K552"
  },
  {
    productId: "P003",
    name: "Gaming Laptop",
    description: "High performance laptop for gaming and development",
    altNames: ["Laptop", "Gaming PC"],
    price: 285000,
    labeledPrice: 300000,
    category: "laptops",
    images: [
      "/images/laptop1.jpg",
      "/images/laptop2.jpg"
    ],
    isVisible: true,
    brand: "MSI",
    model: "GF63"
  }
];

export default function AdminProductPage(){
    const[products, setProducts] = useState(sampleProducts);

    return(
        <div className="w-full h-full overflow-y-scroll">
            {
                products.map(
                    (item, index)=>{
                        
                        return <h1 key={index}>{item.name}</h1>
                    }
                )
             }
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16">
                <FaPlus />
            </Link>
            
        </div>
    )
}