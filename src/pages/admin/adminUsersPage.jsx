import { useEffect, useState } from "react"
import axios from "axios"
import LoadingAnimation from "../../components/loadingAnimation"
import { toast } from "react-hot-toast";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const loading = !isLoaded

    function getCurrentUserEmail() {
        const token = localStorage.getItem("token")
        if (!token) {
            return null
        }

        try {
            const base64Url = token.split(".")[1]
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
            const payload = JSON.parse(atob(padded))
            return payload?.email?.toLowerCase?.() ?? null
        } catch {
            return null
        }
    }

    useEffect(
        () => {
            if (!isLoaded) {
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_API_URL + "/users/all/" + pageSize + "/" + pageNumber, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setUsers(response.data.users)
                        setTotalPages(response.data.totalPages)
                        setIsLoaded(true)
                    }
                ).catch(
                    () => {
                        setUsers([])
                        setTotalPages(0)
                        setIsLoaded(true)
                    }
                )
            }
        }, [isLoaded]
    )

    const currentUserEmail = getCurrentUserEmail()

    return (

        <div className="w-full h-full flex flex-col">

            <div className="bg-linear-to-r from-secondary via-accent to-secondary text-white px-6 h-20 flex items-center justify-between rounded-t-xl shadow-lg ">
                <h2 className="text-3xl font-bold tracking-wide drop-shadow-md">
                    Users
                </h2>
                <div className="text-sm font-semibold text-secondary bg-white/90 px-4 py-2 rounded-full border border-white/40 shadow-sm">
                    Total: {loading ? "..." : users.length}
                </div>
            </div>

            <div className="w-full flex-1 flex flex-col min-h-0">

                {/* Table Container */}
                <div className="overflow-auto shadow-xl flex-1 min-h-0">
                    {loading ? <div className="w-full h-full flex flex-col  justify-center items-center">
                        <LoadingAnimation />
                        <h1 className=" text-xl mt-5 font-semibold text-secondary">Loading Users...</h1>
                    </div>
                        : <table className="w-full bg-white min-w-275 relative table-fixed ">

                            <thead>
                                <tr className="bg-white border-b-2 border-accent sticky top-0 z-10">
                                    <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[7%]">
                                        Profile Image
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[20%]">
                                        Email
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[10%]">
                                        First Name
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[10%]">
                                        Last Name
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[6%] align-middle">
                                        Role
                                    </th>

                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[9%]">
                                        Email Verification
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[7%]">
                                        Account Status
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[8%]">
                                        Block/ Unblock
                                    </th>
                                    <th className="sticky top-0 z-10 px-6 py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider bg-linear-to-r from-accent/10 to-primary/30 w-[10%]">
                                        Change into
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => {
                                    const isSelf = Boolean(currentUserEmail && currentUserEmail === user.email?.toLowerCase())

                                    return (
                                        <tr
                                            key={user.userId}
                                            className="odd:bg-accent/30 hover:bg-primary/90 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                <img referrerPolicy="no-reference" src={user.image} alt="User Image" className="w-10 h-10 rounded-full object-cover" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {user.firstName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {user.lastName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {user.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {user.isEmailVerified ? "Verified" : "Not Verified"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {/*block user button*/}
                                                <button
                                                    className={`px-4 py-2 rounded text-white transition-colors duration-200 w-full items-center justify-center flex ${isSelf
                                                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                                                        : user.isBlocked
                                                            ? "bg-green-500 hover:bg-green-600"
                                                            : "bg-red-500 hover:bg-red-600"
                                                        }`}
                                                    disabled={isSelf}
                                                    onClick={() => {
                                                        const currentUserEmail = getCurrentUserEmail()
                                                        if (currentUserEmail && currentUserEmail === user.email?.toLowerCase()) {
                                                            toast.error("You cannot block your own account")
                                                            return
                                                        }

                                                        axios.post(import.meta.env.VITE_API_URL + "/users/toggle-block", {
                                                            email: user.email
                                                        }, {
                                                            headers: {
                                                                "Authorization": "Bearer " + localStorage.getItem("token")
                                                            }
                                                        }).then(
                                                            (res) =>{
                                                                setIsLoaded(false)
                                                                toast.success(res.data.message)
                                                            }  
                                                        ).catch(
                                                            (error) => {
                                                                toast.error(error?.response?.data?.message || "Failed to update account status")
                                                            }
                                                        )
                                                    }}
                                                >
                                                    {user.isBlocked ? "Unblock" : "Block"}
                                                </button>

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                {/*make admin or customer button*/}
                                                <button
                                                    className={`px-4 py-2 rounded text-white transition-colors duration-200 w-full items-center justify-center flex ${isSelf
                                                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                                                        : user.role === "admin"
                                                            ? "bg-blue-500 hover:bg-blue-600"
                                                            : "bg-yellow-500 hover:bg-yellow-600"
                                                        }`}
                                                    disabled={isSelf}
                                                 onClick={() => {
                                                        const currentUserEmail = getCurrentUserEmail()
                                                        if (currentUserEmail && currentUserEmail === user.email?.toLowerCase()) {
                                                            toast.error("You cannot change your own role")
                                                            return
                                                        }

                                                        axios.post(import.meta.env.VITE_API_URL + "/users/toggle-role", {
                                                            email: user.email
                                                        }, {
                                                            headers: {
                                                                "Authorization": "Bearer " + localStorage.getItem("token")
                                                            }
                                                        }).then(
                                                            (res) =>{
                                                                setIsLoaded(false)
                                                                toast.success(res.data.message)
                                                            }  
                                                        ).catch(
                                                            (error) => {
                                                                toast.error(error?.response?.data?.message || "Failed to update user role")
                                                            }
                                                        )
                                                    }}>
                                                    {user.role === "admin" ? " Customer" : " Admin"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>}
                </div>

                <div className="sticky bottom-0 z-20 flex items-center justify-center gap-4 py-4 bg-primary/95 border-t border-accent/20">
                    <button
                        className="px-4 py-2 rounded bg-secondary text-white disabled:opacity-50"
                        disabled={pageNumber <= 1}
                        onClick={() => {
                            setPageNumber((prev) => prev - 1)
                            setIsLoaded(false)
                        }}
                    >
                        Previous
                    </button>

                    <span className="text-sm font-semibold text-secondary">
                        Page {pageNumber} / {totalPages || 1}
                    </span>

                    <button
                        className="px-4 py-2 rounded bg-secondary text-white disabled:opacity-50"
                        disabled={pageNumber >= totalPages || totalPages === 0}
                        onClick={() => {
                            setPageNumber((prev) => prev + 1)
                            setIsLoaded(false)
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

    )
}