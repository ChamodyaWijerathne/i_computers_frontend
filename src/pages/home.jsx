import Header from "../components/header"
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import AboutPage from "./about";
import ContactUsPage from "./contactUs";


export default function HomePage(){
    return(
        <div className="w-full min-h-screen ">
            <Header/>
            <Routes>
                <Route path="/" element={<div>Home page</div>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactUsPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/overview/:productId" element={<Overview/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/*" element={<div>404 Not Found</div>}/>
            </Routes>
        </div>
    )
}