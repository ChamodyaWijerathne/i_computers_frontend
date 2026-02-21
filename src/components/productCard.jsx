

export default function ProductCard(props){
    const product = props.product
    return(
        <div className="w-[200px] h-[300px] m-4 p-4 rounded-lg shadow-lg bg-white">
            <div className="w-full h-[150px] bg-gray-300 mb-4"></div>
            <div className="text-lg font-bold mb-2">{product.name}</div>
            <div className="text-gray-600 mb-2">{product.description}</div>
            <div className="text-green-500 font-semibold">{product.price}</div>
        </div>
    )
}