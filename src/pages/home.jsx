import Header from "../components/header"
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import AboutPage from "./about";
import ContactUsPage from "./contactUs";
import SettingPage from "./settings";
import MyOrdersPage from "./myOrdersPage";


export default function HomePage(){
    return(
        <div className="w-full min-h-screen pt-[100px]">
            <Header/>
            <Routes>
                <Route path="/" element={<div>Home page</div>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactUsPage/>}/>
                <Route path="/settings" element={<SettingPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/overview/:productId" element={<Overview/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/my-orders" element={<MyOrdersPage/>}/>
                <Route path="/*" element={<div>404 Not Found</div>}/>
            </Routes>
        </div>
    )
}