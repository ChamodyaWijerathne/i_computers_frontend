export default function AdminOrdersPage(){
    const [orders, setOrders] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(
        ()=>{
            if(!isLoading){
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber, {
                    headers :{
                        Authorization: "Bearer " + token
                    }
                }).then(
                    (response)=>{
                        setOrders(response.data.orders)
                        setTotalPages(response.data.totalPages)
                        setIsLoading(true)
                    }
                )
            }
        }
    )
    return(
        <div className="w-full h-full overflow-y-scroll">

        </div>
    )
}