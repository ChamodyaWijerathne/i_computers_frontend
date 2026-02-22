import { useParams } from "react-router-dom"

export default function Overview(){
    const params = useParams()
    console.log(params)

    return(
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold">Product overview page of {params.productId}</h1>
        </div>
    )
}