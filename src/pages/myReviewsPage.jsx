import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import LoadingAnimation from "../components/loadingAnimation"
import { FaRegStar, FaStar, FaUserCircle } from "react-icons/fa"
import { CgClose } from "react-icons/cg"
import { FiEdit3, FiTrash2, FiEye } from "react-icons/fi"

function normalizeReview(review){
    return {
        ...review,
        reviewId: review.reviewId ?? review.id ?? review._id ?? review.reviewID,
        productId: review.productId ?? review.product?.productId ?? "",
        productName: review.productName ?? review.product?.name ?? "Unknown product",
        productImage: review.productImage ?? review.product?.image ?? review.product?.images?.[0] ?? "",
        userEmail: review.userEmail ?? review.email ?? "",
        userName: review.userName ?? review.name ?? review.firstName ?? review.userEmail ?? "Anonymous",
        userAvatar: review.userAvatar ?? review.avatar ?? review.image ?? "",
        comment: review.comment ?? "",
        rating: Number(review.rating ?? 0),
        createdAt: review.createdAt ?? new Date().toISOString(),
        updatedAt: review.updatedAt ?? review.createdAt ?? new Date().toISOString()
    }
}

function getAuthHeaders(token){
    return { Authorization: `Bearer ${token}` }
}

function formatRelativeTime(timestamp){
    const date = new Date(timestamp)
    if(Number.isNaN(date.getTime())) return "just now"

    const secondsAgo = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000))
    if(secondsAgo < 60) return "just now"

    const minutesAgo = Math.floor(secondsAgo / 60)
    if(minutesAgo < 60) return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`

    const hoursAgo = Math.floor(minutesAgo / 60)
    if(hoursAgo < 24) return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`

    const daysAgo = Math.floor(hoursAgo / 24)
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`
}

function StarDisplay({ rating }){
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1
                return starValue <= rating ? (
                    <FaStar key={starValue} className="text-amber-400" />
                ) : (
                    <FaRegStar key={starValue} className="text-amber-400" />
                )
            })}
        </div>
    )
}

function ReviewAvatar({ review }){
    if(review.userAvatar){
        return <img src={review.userAvatar} alt={`${review.userName} avatar`} className="h-14 w-14 rounded-full object-cover border border-white/70" referrerPolicy="no-referrer" />
    }

    return <FaUserCircle className="h-14 w-14 text-slate-400" aria-hidden="true" />
}

function ViewReviewModal({ review, onClose }){
    if(!review) return null

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true" aria-labelledby="view-review-title">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200" aria-label="Close review details">
                    <CgClose />
                </button>
                <div className="bg-secondary px-6 py-5 text-white">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">Your review</p>
                    <h3 id="view-review-title" className="mt-1 text-2xl font-bold">{review.productName}</h3>
                    <p className="mt-2 text-sm text-white/80">Reviewed {formatRelativeTime(review.createdAt)}</p>
                </div>
                <div className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-3">
                            <ReviewAvatar review={review} />
                            <div>
                                <h4 className="text-lg font-semibold text-slate-900">{review.userName}</h4>
                                <p className="text-sm text-slate-500">{review.userEmail}</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <StarDisplay rating={review.rating} />
                                                </div>
                            </div>
                        </div>
                        {review.productId && (
                            <Link to={`/overview/${review.productId}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90">
                                <FiEye />
                                View product
                            </Link>
                        )}
                    </div>
                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                        <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Comment</h5>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{review.comment || "No comment provided."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EditReviewModal({ review, onClose, onSave }){
    const [rating, setRating] = useState(review?.rating || 0)
    const [comment, setComment] = useState(review?.comment || "")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setRating(review?.rating || 0)
        setComment(review?.comment || "")
    }, [review])

    if(!review) return null

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true" aria-labelledby="edit-review-title">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
                <h3 id="edit-review-title" className="text-2xl font-bold text-slate-900">Edit review</h3>
                <p className="mt-2 text-sm text-slate-500">Update your rating or comment. Comments are limited to 500 characters.</p>
                <div className="mt-5 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
                        <div className="flex items-center gap-2" role="radiogroup" aria-label="Edit review rating">
                            {Array.from({ length: 5 }, (_, index) => {
                                const value = index + 1
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setRating(value)}
                                        className="rounded-full p-1 transition hover:bg-amber-100"
                                        aria-label={`Set rating to ${value} star${value === 1 ? "" : "s"}`}
                                    >
                                        {rating >= value ? <FaStar className="text-2xl text-amber-400" /> : <FaRegStar className="text-2xl text-amber-400" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor={`review-comment-${review.reviewId}`}>Comment</label>
                        <textarea
                            id={`review-comment-${review.reviewId}`}
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            maxLength={500}
                            rows={5}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                        />
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="button" disabled={saving || rating === 0} onClick={async () => {
                        setSaving(true)
                        try{
                            await onSave({ rating, comment })
                        }finally{
                            setSaving(false)
                        }
                    }} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90 disabled:opacity-50">
                        {saving ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}

function DeleteReviewModal({ review, onClose, onConfirm, isDeleting }){
    if(!review) return null

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true" aria-labelledby="delete-review-title">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
                <h3 id="delete-review-title" className="text-2xl font-bold text-slate-900">Delete review?</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">This removes your review for <span className="font-semibold">{review.productName}</span>. Admin accounts are blocked from deleting reviews.</p>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} disabled={isDeleting} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function MyReviewsPage(){
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [viewingReview, setViewingReview] = useState(null)
    const [editingReview, setEditingReview] = useState(null)
    const [deletingReview, setDeletingReview] = useState(null)
    const [savingReviewId, setSavingReviewId] = useState(null)
    const [deletingReviewId, setDeletingReviewId] = useState(null)

    useEffect(() => {
        let isActive = true

        async function loadData(){
            const token = localStorage.getItem("token")
            if(!token){
                toast.error("Please log in to view your reviews.")
                navigate("/login")
                return
            }

            try{
                const [profileResponse, reviewsResponse] = await Promise.all([
                    axios.get(import.meta.env.VITE_API_URL + "/users/profile", { headers: getAuthHeaders(token) }),
                    axios.get(import.meta.env.VITE_API_URL + "/users/me/reviews", { headers: getAuthHeaders(token) })
                ])

                if(!isActive) return

                setUser(profileResponse.data)
                const reviewList = Array.isArray(reviewsResponse.data)
                    ? reviewsResponse.data.map(normalizeReview).sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
                    : []
                setReviews(reviewList)
            }catch(err){
                if(!isActive) return

                if(err.response?.status === 401){
                    localStorage.removeItem("token")
                    toast.error("Your session expired. Please log in again.")
                    navigate("/login")
                    return
                }

                setError(err.response?.data?.message || "We could not load your reviews right now.")
                toast.error(err.response?.data?.message || "Failed to load your reviews.")
            }finally{
                if(isActive) setLoading(false)
            }
        }

        loadData()

        return () => { isActive = false }
    }, [navigate])

    const stats = useMemo(() => {
        const total = reviews.length
        const average = total === 0 ? 0 : reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / total
        return { total, average }
    }, [reviews])

    const isAdmin = user?.role === "admin"

    async function saveReviewChanges(payload){
        if(!editingReview) return
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please log in again to continue.")
            navigate("/login")
            return
        }

        if(isAdmin){
            toast.error("Admins cannot edit reviews.")
            return
        }

        if(payload.rating < 1){
            toast.error("Please choose a rating before saving.")
            return
        }

        if(payload.comment.length > 500){
            toast.error("Comment must be 500 characters or less.")
            return
        }

        setSavingReviewId(editingReview.reviewId)
        try{
            const response = await axios.put(
                import.meta.env.VITE_API_URL + `/products/${editingReview.productId}/reviews/${editingReview.reviewId}`,
                { rating: payload.rating, comment: payload.comment.trim() },
                { headers: getAuthHeaders(token) }
            )

            const updatedReview = normalizeReview(response.data.review || response.data)
            setReviews((current) => current.map((review) => review.reviewId === editingReview.reviewId ? updatedReview : review))
            toast.success(response.data.message || "Review updated successfully")
            setEditingReview(null)
        }catch(err){
            if(err.response?.status === 403){
                toast.error("You can only modify your own reviews.")
            }else if(err.response?.status === 401){
                localStorage.removeItem("token")
                toast.error("Please log in again to continue.")
                navigate("/login")
            }else{
                toast.error(err.response?.data?.message || "We could not update your review.")
            }
        }finally{
            setSavingReviewId(null)
        }
    }

    async function confirmDeleteReview(){
        if(!deletingReview) return
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please log in again to continue.")
            navigate("/login")
            return
        }

        if(isAdmin){
            toast.error("Admins cannot delete reviews.")
            return
        }

        setDeletingReviewId(deletingReview.reviewId)
        try{
            const response = await axios.delete(
                import.meta.env.VITE_API_URL + `/products/${deletingReview.productId}/reviews/${deletingReview.reviewId}`,
                { headers: getAuthHeaders(token) }
            )
            setReviews((current) => current.filter((review) => review.reviewId !== deletingReview.reviewId))
            toast.success(response.data.message || "Review deleted successfully")
            setDeletingReview(null)
        }catch(err){
            if(err.response?.status === 403){
                toast.error("You can only modify your own reviews.")
            }else if(err.response?.status === 401){
                localStorage.removeItem("token")
                toast.error("Please log in again to continue.")
                navigate("/login")
            }else{
                toast.error(err.response?.data?.message || "We could not delete your review.")
            }
        }finally{
            setDeletingReviewId(null)
        }
    }

    return (
        <div className="min-h-[calc(100vh-100px)] bg-primary px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60">
                    <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-secondary/60">Account</p>
                            <h1 className="mt-1 text-3xl font-bold text-slate-900">My Reviews</h1>
                            <p className="mt-2 text-sm text-slate-600">View, edit, or delete your own product reviews from your account profile.</p>
                        </div>
                        {user && (
                            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                                <img src={user.image} alt={`${user.firstName} avatar`} referrerPolicy="no-referrer" className="h-12 w-12 rounded-full object-cover" />
                                <div>
                                    <h2 className="font-semibold text-slate-900">{user.firstName} {user.lastName}</h2>
                                    <p className="text-sm text-slate-500">{user.email || "Signed in user"}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Total reviews</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Average rating</p>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="flex items-center" aria-label={`${stats.total > 0 ? stats.average.toFixed(1) : "0.0"} out of 5 stars`}>
                                    {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                                        n <= Math.round(stats.average) ? (
                                            <FaStar key={n} className="text-amber-400" />
                                        ) : (
                                            <FaRegStar key={n} className="text-amber-400" />
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Account role</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 capitalize">{user?.role || "user"}</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex min-h-80 flex-col items-center justify-center gap-4">
                            <LoadingAnimation />
                            <p className="text-sm font-medium text-secondary">Loading your reviews...</p>
                        </div>
                    ) : error ? (
                        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
                    ) : reviews.length === 0 ? (
                        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
                            You have not written any reviews yet.
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {reviews.map((review) => (
                                <article key={review.reviewId} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <ReviewAvatar review={review} />
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h2 className="truncate text-lg font-semibold text-slate-900">{review.productName}</h2>
                                                    {review.isPending && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Pending</span>}
                                                </div>
                                                <p className="text-sm text-slate-500">{review.productId}</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <StarDisplay rating={review.rating} />
                                                </div>
                                                <p className="mt-1 text-xs text-slate-500">{formatRelativeTime(review.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 self-start md:self-auto">
                                            <button type="button" onClick={() => setViewingReview(review)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-secondary hover:text-secondary">
                                                <FiEye />
                                                View
                                            </button>
                                            <button type="button" onClick={() => isAdmin ? toast.error("Admins cannot edit reviews.") : setEditingReview(review)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-secondary hover:text-secondary disabled:opacity-50" disabled={isAdmin}>
                                                <FiEdit3 />
                                                Edit
                                            </button>
                                            <button type="button" onClick={() => isAdmin ? toast.error("Admins cannot delete reviews.") : setDeletingReview(review)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:border-red-400 hover:bg-red-50 disabled:opacity-50" disabled={isAdmin}>
                                                <FiTrash2 />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Review comment</h3>
                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                            {review.comment || "No comment provided."}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ViewReviewModal review={viewingReview} onClose={() => setViewingReview(null)} />
            <EditReviewModal
                review={editingReview}
                onClose={() => setEditingReview(null)}
                onSave={saveReviewChanges}
                isSaving={savingReviewId === editingReview?.reviewId}
            />
            <DeleteReviewModal
                review={deletingReview}
                onClose={() => setDeletingReview(null)}
                onConfirm={confirmDeleteReview}
                isDeleting={deletingReviewId === deletingReview?.reviewId}
            />
        </div>
    )
}