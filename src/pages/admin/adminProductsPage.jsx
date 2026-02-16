import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import getFormatPrice from "../../utils/price-format";

const sampleProducts = [
  {
    productId: "P001",
    name: "Gaming Mouse",
    description: "High precision RGB gaming mouse",
    altNames: ["Mouse", "RGB Mouse", "Gaming Accessories"],
    price: 4500,
    labeledPrice: 5500,
    category: "accessories",
    images: ["/images/mouse1.jpg", "/images/mouse2.jpg"],
    isVisible: true,
    brand: "Logitech",
    model: "G102",
  },
  {
    productId: "P002",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    altNames: ["Keyboard", "Mechanical Keyboard"],
    price: 12500,
    labeledPrice: 14000,
    category: "accessories",
    images: ["/images/keyboard1.jpg", "/images/keyboard2.jpg"],
    isVisible: true,
    brand: "Redragon",
    model: "K552",
  },
  {
    productId: "P003",
    name: "Gaming Laptop",
    description: "High performance laptop for gaming and development",
    altNames: ["Laptop", "Gaming PC"],
    price: 285000,
    labeledPrice: 300000,
    category: "laptops",
    images: ["/images/laptop1.jpg", "/images/laptop2.jpg"],
    isVisible: true,
    brand: "MSI",
    model: "GF63",
  },
  {
    productId: "P004",
    name: '27" Gaming Monitor',
    description: "Full HD 165Hz IPS gaming monitor",
    altNames: ["Monitor", "Gaming Display"],
    price: 68500,
    labeledPrice: 72000,
    category: "monitors",
    images: ["/images/monitor1.jpg", "/images/monitor2.jpg"],
    isVisible: true,
    brand: "ASUS",
    model: "VG27AQ",
  },
  {
    productId: "P005",
    name: "1TB NVMe SSD",
    description: "High speed PCIe Gen 4 NVMe SSD",
    altNames: ["SSD", "Storage Drive"],
    price: 28500,
    labeledPrice: 32000,
    category: "storage",
    images: ["/images/ssd1.jpg", "/images/ssd2.jpg"],
    isVisible: true,
    brand: "Samsung",
    model: "980 Pro",
  },
  {
    productId: "P006",
    name: "16GB DDR4 RAM",
    description: "High performance 3200MHz gaming memory",
    altNames: ["RAM", "Memory Module"],
    price: 14500,
    labeledPrice: 16000,
    category: "components",
    images: ["/images/ram1.jpg", "/images/ram2.jpg"],
    isVisible: true,
    brand: "Corsair",
    model: "Vengeance LPX",
  },
  {
    productId: "P007",
    name: "Gaming Headset",
    description: "Surround sound RGB gaming headset",
    altNames: ["Headphones", "Gaming Audio"],
    price: 18500,
    labeledPrice: 21000,
    category: "audio",
    images: ["/images/headset1.jpg", "/images/headset2.jpg"],
    isVisible: true,
    brand: "Razer",
    model: "BlackShark V2",
  },
  {
    productId: "P008",
    name: "Wireless Gaming Mouse",
    description: "Ultra lightweight wireless gaming mouse",
    altNames: ["Wireless Mouse", "Pro Mouse"],
    price: 22500,
    labeledPrice: 25000,
    category: "accessories",
    images: ["/images/mouse3.jpg", "/images/mouse4.jpg"],
    isVisible: false,
    brand: "Logitech",
    model: "G Pro X Superlight",
  },
  {
    productId: "P009",
    name: '15.6" Ultrabook Laptop',
    description: "Slim and lightweight productivity laptop",
    altNames: ["Ultrabook", "Office Laptop"],
    price: 195000,
    labeledPrice: 210000,
    category: "laptops",
    images: ["/images/laptop3.jpg", "/images/laptop4.jpg"],
    isVisible: true,
    brand: "Dell",
    model: "XPS 15",
  },
  {
    productId: "P010",
    name: "Gaming Graphics Card",
    description: "High performance RTX graphics card",
    altNames: ["GPU", "Graphics Card"],
    price: 325000,
    labeledPrice: 350000,
    category: "components",
    images: ["/images/gpu1.jpg", "/images/gpu2.jpg"],
    isVisible: true,
    brand: "NVIDIA",
    model: "RTX 4070",
  },
  {
    productId: "P011",
    name: "Mechanical Gaming Keyboard",
    description: "RGB mechanical keyboard with red switches",
    altNames: ["Keyboard", "RGB Keyboard"],
    price: 16500,
    labeledPrice: 18500,
    category: "accessories",
    images: ["/images/keyboard3.jpg", "/images/keyboard4.jpg"],
    isVisible: true,
    brand: "HyperX",
    model: "Alloy Origins",
  },
  {
    productId: "P012",
    name: "2TB External HDD",
    description: "Portable USB 3.0 external hard drive",
    altNames: ["External Drive", "Portable HDD"],
    price: 22500,
    labeledPrice: 25000,
    category: "storage",
    images: ["/images/hdd1.jpg", "/images/hdd2.jpg"],
    isVisible: true,
    brand: "Seagate",
    model: "Backup Plus",
  },
];

export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProducts);

  return (
    
    <div className="w-full h-full overflow-y-scroll">
      
      <div className="w-full">

        {/* Header */}
        <div className="bg-gradient-to-r from-secondary via-accent to-secondary text-white px-6 h-20 flex items-center rounded-t-xl shadow-lg sticky top-0 z-20">
          <h2 className="text-3xl font-bold tracking-wide drop-shadow-md">
            Product Inventory
          </h2>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto shadow-xl">
        <table className="w-full bg-white min-w-[1100px]">
          <thead className="sticky top-0 z-10 ">
            <tr className="bg-white border-b-2 border-accent">
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Product ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Labelled Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Brand
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Model
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30">
                Visible
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((item) => {
              return (
                <tr
                  key={item.productId}
                  className="odd:bg-accent/30 hover:bg-primary/90 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className=" text-sm font-mono font-medium text-secondary bg-accent/10 px-3 py-1 rounded-full">
                      {item.productId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-secondary">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500 line-through">
                      {getFormatPrice(item.labeledPrice)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-base font-bold text-accent">
                      {getFormatPrice(item.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-secondary">
                      {item.category || "Uncategorized"}
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
                    <span className="text-sm text-secondary">
                      {item.brand || <span className="text-gray-400 italic">N/A</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {item.model || <span className="text-gray-400 italic">N/A</span>}
                    </span>
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

      <Link
        to="/admin/add-product"
        className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16"
      >
        <FaPlus />
      </Link>
    </div>
    </div>
  );
}
