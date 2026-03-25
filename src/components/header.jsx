import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import UserData from "./userData";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPanelLeftClose } from "react-icons/lu";

export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <header className="fixed top-0 left-0 z-50 w-full bg-accent h-[100px] flex justify-center items-center ">
            
            <div className="h-full w-full lg:w-auto flex justify-center items-center absolute lg:left-10">
                <GiHamburgerMenu onClick={()=>setIsOpen(true)} size={30} color="white" className="mr-8 lg:hidden cursor-pointer"/>
                <img src="/logo.png" alt="iComputers Logo" className="h-lg:[50px] h-[30px]"/>
                <h1 className="text-white text-md lg:text-2xl font-bold ml-3">Isuri Computers</h1>
            </div>

            <div className="h-full flex justify-center items-center hidden  lg:flex">
                <Link to="/" className="text-white mx-4 hover:border-b-2">Home</Link>
                <Link to="/products" className="text-white mx-4 hover:border-b-2">Products</Link>
                <Link to="/about" className="text-white mx-4 hover:border-b-2">About</Link>
                <Link to="/contact" className="text-white mx-4 hover:border-b-2">Contact</Link>
            </div>
            <div className=" hidden absolute right-5 lg:flex h-full justify-center items-center gap-5 w-[200px]">
                <UserData/>
                <Link to="/cart" className=" cursor-pointer text-white hover:text-secondary absolute right-50 flex items-center gap-2">
                <BiShoppingBag size={30}/>
                </Link>
                   
            </div>
            {isOpen&&<div className="fixed bg-black/50 w-full h-screen top-0 left-0 ">
                <div className="w-[300px] h-full bg-white">
                    <div className="bg-accent h-[100px] w-full flex justify-start items-center px-5">
                        <img src="/logo.png" alt="iComputers Logo" className="h-[40px] w-[40px]"/>
                        <h1 className="text-md text-white font-bold ml-3">Isuri Computers</h1>
                        <LuPanelLeftClose onClick={()=>setIsOpen(false)} size={20} className="ml-auto cursor-pointer text-white hover:text-secondary"/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <a href="/" className="text-gray-700 py-2 px-5 hover:bg-gray-200 font-medium">Home</a>
                        <a href="/products" className="text-gray-700 py-2 px-5 hover:bg-gray-200 font-medium">Products</a>
                        <a href="/about" className="text-gray-700 py-2 px-5 hover:bg-gray-200 font-medium">About</a>
                        <a href="/contact" className="text-gray-700 py-2 px-5 hover:bg-gray-200 font-medium">Contact</a>
                        <a href="/cart" className="text-gray-700 py-2 px-5 hover:bg-gray-200 font-medium flex items-center gap-2">
                            Cart    
                        </a>
                        <div className="bg-accent absolute bottom-10 h-[60px] w-[300px] rounded-2xl flex items-center justify-center ">
                            <UserData/>
                        </div>
                    </div>
                    

                </div>

            </div>}

        </header>
    )
}