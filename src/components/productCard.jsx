import getFormatPrice from "../utils/price-format.js"
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getAverageRating, getReviewCount } from "../utils/rating";

function RatingBadge({ product }){
    const averageRating = getAverageRating(product)
    const reviewCount = getReviewCount(product)

    return (
        <div className="mt-2 flex items-center gap-2 text-sm text-secondary/80">
            <div className="flex items-center gap-1" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => {
                    const starNumber = index + 1
                    return starNumber <= Math.round(averageRating) ? (
                        <FaStar key={starNumber} className="text-amber-400" />
                    ) : (
                        <FaRegStar key={starNumber} className="text-amber-400" />
                    )
                })}
            </div>
            <span className="text-secondary/50">|</span>
            <span>{reviewCount} reviews</span>
        </div>
    )
}


export default function ProductCard(props){
    const product = props.product
    return(
        <Link to={"/overview/"+product.productId} className="w-75 h-100 m-4 rounded-lg shadow-lg bg-white overflow-hidden hover:[&_.main-image]:opacity-0 relative ">
            <div className="bg-white w-full absolute top-0 left-0">
                <img src={product.images[1]} alt={product.name} className="h-62.5 w-full object-center "/>
            </div>
            <div className="bg-white main-image w-full absolute top-0 left-0 transition-opacity duration-500">
                <img src={product.images[0]} alt={product.name} className="h-62.5 w-full object-center "/>
            </div>
            <div className="h-37.5 w-full absolute flex bottom-0 justify-center flex-col">
                <span className="text-xs opacity-50">{product.productId}</span>
                <h1 className="font-semibold text-lg">{product.name}</h1>
                {
                    product.labeledPrice > product.price && <p className="text-sm text-red-600 line-through opacity-60">{getFormatPrice(product.labeledPrice)}</p>
                }
                <p className="text-md font-bold">{getFormatPrice(product.price)}</p>
                <RatingBadge product={product} />

            </div>
        </Link>
    )
}