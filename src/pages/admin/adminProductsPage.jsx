import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AdminProductPage(){
    return(
        <div className="w-full h-full overflow-y-scroll">
            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16">
                <FaPlus />
            </Link>
            <h1 className="w-full text-3xl font-bold mb-4 sticky top-0 bg-primary">Products</h1>
        </div>
    )
}