import getFormatPrice from "../utils/price-format.js"
import { Link } from "react-router-dom";


export default function ProductCard(props){
    const product = props.product
    return(
        <Link to={"/overview/"+product.productId} className="w-[300px] h-[400px] m-4 rounded-lg shadow-lg bg-white overflow-hidden hover:[&_.main-image]:opacity-0 relative ">
            <div className="bg-white w-full absolute top-0 left-0">
                <img src={product.images[1]} alt={product.name} className="h-[250px] w-full object-center "/>
            </div>
            <div className="bg-white main-image w-full absolute top-0 left-0 transition-opacity duration-500">
                <img src={product.images[0]} alt={product.name} className="h-[250px] w-full object-center "/>
            </div>
            <div className="h-[150px] w-full absolute flex bottom-0 justify-center flex-col">
                <span className="text-xs opacity-50">{product.productId}</span>
                <h1 className="font-semibold text-lg">{product.name}</h1>
                {
                    product.labeledPrice > product.price && <p className="text-sm text-red-600 line-through opacity-60">{getFormatPrice(product.labeledPrice)}</p>
                }
                <p className="text-md font-bold">{getFormatPrice(product.price)}</p>

            </div>
        </Link>
    )
}