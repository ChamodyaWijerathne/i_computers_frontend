import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import LoadingAnimation from "../components/loadingAnimation"
import ImageSlideShow from "../components/imageSlideShow"
import getFormatPrice from "../utils/price-format"
import { addToCart } from "../utils/cart"
import { Link } from "react-router-dom"
import ProductReviews from "../components/productReviews"

export default function Overview(){
    const params = useParams()
    const [product, setProduct] = useState(null)
    const [reviewSummary, setReviewSummary] = useState({ average: 0, total: 0 })

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products/" + params.productId)
            .then((response) => {
                setProduct(response.data)
            })
            .catch(() => {
                toast.error("Failed to load product details.")
            })
    }, [params.productId])

    return(
        <div className="w-full min-h-screen bg-primary pb-12">
            {
                product == null ? <div className="flex justify-center items-center min-h-[calc(100vh-100px)]"><LoadingAnimation/></div> :
                <>
                    <div className="w-full flex flex-col lg:flex-row bg-primary">
                        <h1 className="text-3xl font-bold p-4 lg:hidden">{product.name}
                            {product.altNames.map((altName, index) => {
                                return(
                                    <span key={index} className="text-gray-500 font-medium"> | {altName}</span>
                                )
                            })}
                        </h1>
                        <div className="w-full lg:w-[50%] lg:h-full flex justify-center items-center p-4 lg:p-0">
                            <ImageSlideShow images={product.images}/>
                        </div>
                        <div className="w-full lg:w-[50%] h-full p-5 flex flex-col justify-center gap-4">
                            <h1 className="text-3xl font-bold hidden lg:block">{product.name}
                                {product.altNames.map((altName, index) => {
                                    return(
                                        <span key={index} className="text-gray-500 font-medium"> | {altName}</span>
                                    )
                                })}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-secondary shadow-sm" aria-label={`${reviewSummary.total > 0 ? reviewSummary.average.toFixed(1) : "New"} out of 5 stars`}>
                                    <span aria-hidden="true">★</span>
                                    <span className="text-secondary/60">|</span>
                                    <span>{reviewSummary.total} reviews</span>
                                </div>
                                <span className="text-sm text-secondary/70">Updated as reviews change</span>
                            </div>
                            {/* brand and model if available */}
                            {(product.brand || product.model) &&
                                <p className="text-lg font-medium mb-2">
                                    {product.brand && <span>{product.brand}</span>}
                                    {product.brand && product.model && <span> - </span>}
                                    {product.model && <span>{product.model}</span>}                               
                                </p>
                            }
                            <p className="text-sm text-gray-500 mb-4">{product.productId}</p>
                            <p className="text-lg font-bold mb-4">{getFormatPrice(product.price)}</p>
                            {
                                product.labeledPrice &&
                                <p className="text-md text-gray-500 mb-4 line-through">{getFormatPrice(product.labeledPrice)}</p>
                            }
                            <p className="text-md mb-4">{product.description}</p>

                            <div className="w-full flex flex-wrap gap-4">
                                <button onClick={() => {
                                    addToCart(product, 1)
                                    toast.success(product.name + " Product added to cart")
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 cursor-pointer">Add to Cart</button>

                                <Link to="/checkout" state={[
                                    {
                                        product: {
                                            name: product.name,
                                            price: product.price,
                                            labeledPrice: product.labeledPrice,
                                            images: product.images[0],
                                            productId: product.productId
                                        },
                                        qty: 1
                                    }
                                ]}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">Buy Now</Link>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 lg:px-10 py-10">
                        <ProductReviews
                            productId={params.productId}
                            onSummaryChange={setReviewSummary}
                        />
                    </div>
                </>
            }
        </div>
    )
}