import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import getFormatPrice from "../../utils/price-format";
import axios from "axios";
import { CiEdit, CiTrash } from "react-icons/ci";
import { toast } from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import DeleteModel from "../../components/deleteModel";



export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  //the useEffect hook is used to fetch the products from the backend when the component mounts. It also has an empty dependency array, which means it will only run once when the component is first rendered.
  useEffect(()=>{

    if(loading){
      const token = localStorage.getItem("token");
      axios.get(import.meta.env.VITE_API_URL + "/products",{
        headers:{
          Authorization:"Bearer " + token
        }
      }).then((response)=>{
        setProducts(response.data);
        setLoading(false)//set loading to false after products are fetched      
      })
  }
  }, [loading])
  //if a variable inside the dependancy array changes, the useEffect will run again to fetch the updated products. This is useful for refreshing the product list after adding, updating, or deleting a product.


  return (
    
    <div className="w-full h-full flex flex-col">

      <div className="bg-gradient-to-r from-secondary via-accent to-secondary text-white px-6 h-20 flex items-center rounded-t-xl shadow-lg ">
          <h2 className="text-3xl font-bold tracking-wide drop-shadow-md">
            Product Inventory
          </h2>
        </div>

      <div className="w-full flex-1 overflow-y-auto">

        {/* Table Container */}
        <div className="overflow-x-auto shadow-xl h-full">
          {loading? <div className="w-full h-full flex flex-col  justify-center items-center">
            <LoadingAnimation/>
            <h1 className=" text-xl mt-5 font-semibold text-secondary">Loading Products...</h1>
          </div>
          :<table className="w-full bg-white min-w-[1100px] relative table-fixed ">

          <thead>
            <tr className="bg-white border-b-2 border-accent sticky top-0 z-10">
              <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[12%]">
                Product ID
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[14%]">
                Name
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[12%]">
                Labelled Price
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[10%]">
                Price
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[10%] align-middle">
                Category
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[13%]">
                Image
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[12%]">
                Brand
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[10%]">
                Model
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[10%]">
                Visible
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-gradient-to-r from-accent/10 to-primary/30 w-[9%]">
                Actions
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
                  <td className="px-6 py-4">
                    <span className=" text-[11px] font-mono font-medium text-secondary bg-accent/10 px-3 py-1 rounded-full break-words">
                      {item.productId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-semibold text-secondary break-words">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-gray-500 line-through break-words">
                      {getFormatPrice(item.labeledPrice)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-secondary  break-words">
                      {getFormatPrice(item.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center h-full">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-secondary break-words">
                        {item.category || "Uncategorized"}
                      </span>
                    </div>
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
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-secondary break-words">
                      {item.brand || <span className="text-gray-400 italic">N/A</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] text-gray-600 break-words">
                      {item.model || <span className="text-gray-400 italic">N/A</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.isVisible ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold bg-red-100 text-red-800">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 min-w-[100px]">
                    <div className="flex items-center justify-center gap-5 min-w-[60px] ">
                    <Link
                      to="/admin/update-product"
                      state={item}
                      className="text-blue-600 hover:text-blue-800 text-xl  transition-colors"
                      ><CiEdit/></Link>

                      {/* delete action */}
                      <DeleteModel product={item} setLoading={setLoading}/>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>}
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
