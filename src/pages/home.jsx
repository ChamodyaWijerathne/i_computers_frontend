import Header from "../components/header"
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";
import Overview from "./overview";

export default function HomePage(){
    return(
        <div className="w-full min-h-screen ">
            <Header/>
            <Routes>
                <Route path="/" element={<div>Home page</div>}/>
                <Route path="/about" element={<div>About page</div>}/>
                <Route path="/contact" element={<div>Contact page</div>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/overview/:productId" element={<Overview/>}/>
                <Route path="/*" element={<div>404 Not Found</div>}/>
            </Routes>
        </div>
    )
}