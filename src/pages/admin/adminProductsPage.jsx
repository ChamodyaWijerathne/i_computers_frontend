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
            

             <div className="w-full overflow-hidden">
  {/* Header */}
  <div className="bg-gradient-to-r from-secondary via-accent to-secondary text-white px-6 py-5 rounded-t-xl shadow-lg">
    <h2 className="text-3xl font-bold tracking-wide drop-shadow-md">Product Inventory</h2>
  </div>

  {/* Table Container */}
  <div className="overflow-x-auto shadow-xl rounded-b-xl">
    <table className="w-full bg-white">
      <thead>
        <tr className="bg-gradient-to-r from-accent/10 to-primary/30 border-b-2 border-accent">
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Product ID
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Labelled Price
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Image
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Brand
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Model
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
            Visible
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr className="hover:bg-primary/20 transition-colors duration-200 group">
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm font-mono font-medium text-secondary bg-accent/10 px-3 py-1 rounded-full">
              IK-0019
            </span>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-semibold text-secondary">Logitech G102</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500 line-through">₹5500</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-base font-bold text-accent">₹4500</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-secondary">
              Accessories
            </span>
          </td>
          <td className="px-6 py-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-accent/30 group-hover:border-accent transition-all duration-200 shadow-md">
              <img 
                src="/images/mouse1.jpg" 
                alt="Product Image" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-secondary">Logitech</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-600">G102</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Yes
            </span>
          </td>
        </tr>
        {products.map((item) => {
          return (
            <tr 
              key={item.productId} 
              className="hover:bg-primary/20 transition-colors duration-200 group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-mono font-medium text-secondary bg-accent/10 px-3 py-1 rounded-full">
                  {item.productId}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-secondary">{item.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500 line-through">₹{item.labeledPrice}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-base font-bold text-accent">₹{item.price}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-secondary">
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-accent/30 group-hover:border-accent transition-all duration-200 shadow-md">
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-secondary">{item.brand}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">{item.model}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.isVisible ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    No
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16">
                <FaPlus />
            </Link>
            
        </div>
    )
}