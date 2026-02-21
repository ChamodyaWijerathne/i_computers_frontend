import { useState } from "react"

export default function ProductPage(){
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    

    return(
        <div>
            <div>Product Page</div>
        </div>
    )
}