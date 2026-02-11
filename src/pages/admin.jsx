import { Route, Routes, Link } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import AdminProductPage from "./admin/adminProductsPage";

export default function AdminPage(){
    return(
        <div className="w-full h-full  flex bg-accent">
            <div className="w-75 h-full flex flex-col bg-accent text-white text-xl">
                <h1 className="text-3xl font-bold p-5 ">Admin Panel</h1>
                <Link className="flex width-full p-[10px] gap-3 items-center hover:bg-white hover:text-accent" to ="/admin/"><FaRegListAlt/>Orders</Link>
                <Link className="flex width-full p-[10px] gap-3 items-center hover:bg-white hover:text-accent" to="/admin/products/"><MdOutlineInventory2/>Products</Link>
                <Link className="flex width-full p-[10px] gap-3 items-center hover:bg-white hover:text-accent" to="/admin/users/"><LuUsersRound/>Users</Link>
            </div>
            
            <div className="w-[calc(100%-300px)] h-full border-8 border-accent rounded-[20px] bg-primary p-4">
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>  
                    <Route path="/users" element={<h1>Users Page</h1>}/>
                </Routes>
            </div>
            
        </div>
    )
}
