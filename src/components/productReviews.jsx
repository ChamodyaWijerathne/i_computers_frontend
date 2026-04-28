import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa"
import { FiEdit3, FiTrash2 } from "react-icons/fi"

function normalizeReview(review){
    return {
        ...review,
        reviewId: review.reviewId ?? review.id ?? review._id ?? review.reviewID,
        userEmail: review.userEmail ?? review.email ?? "",
        userName: review.userName ?? review.name ?? review.firstName ?? review.userEmail ?? "Anonymous",
        userAvatar: review.userAvatar ?? review.avatar ?? review.image ?? "",
        comment: review.comment ?? "",
        rating: Number(review.rating ?? 0),
        createdAt: review.createdAt ?? new Date().toISOString(),
        updatedAt: review.updatedAt ?? review.createdAt ?? new Date().toISOString()
    }
}

function formatRelativeTime(timestamp){
    const date = new Date(timestamp)
    if(Number.isNaN(date.getTime())){
        return "just now"
    }

    const secondsAgo = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000))
    if(secondsAgo < 60){
        return "just now"
    }

    const minutesAgo = Math.floor(secondsAgo / 60)
    if(minutesAgo < 60){
        return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`
    }

    const hoursAgo = Math.floor(minutesAgo / 60)
    if(hoursAgo < 24){
        return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`
    }

    const daysAgo = Math.floor(hoursAgo / 24)
    if(daysAgo < 30){
        return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`
    }

    const monthsAgo = Math.floor(daysAgo / 30)
    if(monthsAgo < 12){
        return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`
    }

    const yearsAgo = Math.floor(monthsAgo / 12)
    return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`
}

function getAuthHeaders(token){
    return {
        Authorization: `Bearer ${token}`
    }
}

function getUserDisplayName(user){
    if(!user){
        return "You"
    }

    return user.firstName || user.name || user.email || "You"
}

function getReviewStats(reviews){
    if(reviews.length === 0){
        return { average: 0, total: 0 }
    }

    const total = reviews.length
    const average = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / total
    return { average, total }
}

function StarDisplay({ rating, className = "" }){
    return (
        <div className={`flex items-center gap-1 ${className}`} aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => {
                const starNumber = index + 1
                return starNumber <= rating ? (
                    <FaStar key={starNumber} className="text-amber-400" />
                ) : (
                    <FaRegStar key={starNumber} className="text-amber-400" />
                )
            })}
        </div>
    )
}

function StarRatingInput({ value, onChange, name, disabled = false, ariaLabelPrefix }){
    return (
        <div className="flex items-center gap-2" role="radiogroup" aria-label={ariaLabelPrefix}>
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1
                const inputId = `${name}-${starValue}`
                return (
                    <label key={starValue} htmlFor={inputId} className={`cursor-pointer rounded-full p-1 transition ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-100"}`}>
                        <input
                            id={inputId}
                            type="radio"
                            name={name}
                            value={starValue}
                            checked={value === starValue}
                            onChange={() => onChange(starValue)}
                            disabled={disabled}
                            className="sr-only"
                            aria-label={`Rate ${starValue} star${starValue === 1 ? "" : "s"}`}
                        />
                        {value >= starValue ? (
                            <FaStar className="text-2xl text-amber-400" aria-hidden="true" />
                        ) : (
                            <FaRegStar className="text-2xl text-amber-400" aria-hidden="true" />
                        )}
                    </label>
                )
            })}
        </div>
    )
}

function ReviewAvatar({ review }){
    if(review.userAvatar){
        return <img src={review.userAvatar} alt={`${review.userName} avatar`} className="h-12 w-12 rounded-full object-cover border border-white/70" referrerPolicy="no-referrer" />
    }

    return <FaUserCircle className="h-12 w-12 text-slate-400" aria-hidden="true" />
}

function ReviewItem({
    review,
    currentUser,
    onStartEdit,
    onRequestDelete,
    isEditing,
    editRating,
    editComment,
    setEditRating,
    setEditComment,
    onCancelEdit,
    onSubmitEdit,
    isSaving
}){
    const canModify = Boolean(
        currentUser &&
        currentUser.role !== "admin" &&
        review.userEmail &&
        currentUser.email &&
        review.userEmail.toLowerCase() === currentUser.email.toLowerCase()
    )

    return (
        <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-3 min-w-0">
                    <ReviewAvatar review={review} />
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-900 truncate">{review.userName}</h3>
                            {review.isPending && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Sending</span>}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <StarDisplay rating={review.rating} />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{formatRelativeTime(review.createdAt)}</p>
                    </div>
                </div>

                {canModify && !isEditing && (
                    <div className="flex gap-2 self-start md:self-auto">
                        <button
                            type="button"
                            onClick={() => onStartEdit(review)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-secondary hover:text-secondary"
                        >
                            <FiEdit3 aria-hidden="true" />
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => onRequestDelete(review)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:border-red-400 hover:bg-red-50"
                        >
                            <FiTrash2 aria-hidden="true" />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {review.comment ? (
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{review.comment}</p>
            ) : (
                <p className="mt-4 text-sm italic text-slate-400">No comment added.</p>
            )}

            {isEditing && (
                <form onSubmit={onSubmitEdit} className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
                            <StarRatingInput
                                value={editRating}
                                onChange={setEditRating}
                                name={`edit-rating-${review.reviewId}`}
                                ariaLabelPrefix="Edit review rating"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor={`edit-comment-${review.reviewId}`}>Comment</label>
                            <textarea
                                id={`edit-comment-${review.reviewId}`}
                                value={editComment}
                                onChange={(event) => setEditComment(event.target.value)}
                                maxLength={500}
                                rows={4}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                                placeholder="Update your thoughts"
                            />
                            <p className="mt-1 text-xs text-slate-500">Optional, up to 500 characters.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={isSaving || editRating === 0}
                                className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save changes"}
                            </button>
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </article>
    )
}

function DeleteConfirmationModal({ review, onCancel, onConfirm, isDeleting }){
    if(!review){
        return null
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true" aria-labelledby="delete-review-title">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
                <h3 id="delete-review-title" className="text-xl font-bold text-slate-900">Delete review?</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    This will permanently remove your review for this product. You can only delete your own reviews.
                </p>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Delete review"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ProductReviews({ productId, onSummaryChange }){
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(true)
    const [loadError, setLoadError] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [profileLoading, setProfileLoading] = useState(true)

    const [createRating, setCreateRating] = useState(0)
    const [createComment, setCreateComment] = useState("")
    const [creating, setCreating] = useState(false)

    const [editingReviewId, setEditingReviewId] = useState(null)
    const [editRating, setEditRating] = useState(0)
    const [editComment, setEditComment] = useState("")
    const [savingReviewId, setSavingReviewId] = useState(null)

    const [deleteTarget, setDeleteTarget] = useState(null)
    const [deletingReviewId, setDeletingReviewId] = useState(null)

    useEffect(() => {
        let isActive = true

        async function loadCurrentUser(){
            const token = localStorage.getItem("token")
            if(!token){
                if(isActive){
                    setCurrentUser(null)
                    setProfileLoading(false)
                }
                return
            }

            try{
                const response = await axios.get(import.meta.env.VITE_API_URL + "/users/profile", {
                    headers: getAuthHeaders(token)
                })

                if(isActive){
                    setCurrentUser(response.data)
                }
            }catch(error){
                localStorage.removeItem("token")
                if(isActive){
                    setCurrentUser(null)
                }
                if(error.response?.status === 401){
                    toast.error("Your session expired. Please log in again.")
                    navigate("/login")
                }
            }finally{
                if(isActive){
                    setProfileLoading(false)
                }
            }
        }

        loadCurrentUser()

        return () => {
            isActive = false
        }
    }, [navigate])

    useEffect(() => {
        let isActive = true

        async function loadReviews(){
            setLoadingReviews(true)
            setLoadError("")

            try{
                const response = await axios.get(import.meta.env.VITE_API_URL + `/products/${productId}/reviews`)
                const reviewList = Array.isArray(response.data) ? response.data.map(normalizeReview).sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)) : []
                if(isActive){
                    setReviews(reviewList)
                }
            }catch(error){
                if(isActive){
                    setLoadError("We could not load reviews right now.")
                }
                toast.error(error.response?.data?.message || "Failed to load reviews.")
            }finally{
                if(isActive){
                    setLoadingReviews(false)
                }
            }
        }

        loadReviews()

        return () => {
            isActive = false
        }
    }, [productId])

    const reviewSummary = useMemo(() => getReviewStats(reviews), [reviews])

    useEffect(() => {
        if(onSummaryChange){
            onSummaryChange(reviewSummary)
        }
    }, [onSummaryChange, reviewSummary])

    function getTokenOrRedirect(){
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please log in to review this product.")
            navigate("/login")
            return null
        }

        return token
    }

    function resolveDuplicateMessage(error){
        const status = error.response?.status
        const message = String(error.response?.data?.message || "").toLowerCase()
        if(status === 409 || (status === 400 && (message.includes("duplicate") || message.includes("already reviewed")))){
            return "You already reviewed this product."
        }

        return error.response?.data?.message || "We could not save your review. Please try again."
    }

    function handleAuthFailure(error){
        if(error.response?.status === 401){
            localStorage.removeItem("token")
            toast.error("Please log in again to continue.")
            navigate("/login")
            return true
        }

        if(error.response?.status === 403){
            toast.error("You can only modify your own reviews.")
            return true
        }

        return false
    }

    function startEdit(review){
        if(!currentUser){
            toast.error("Please log in to edit your review.")
            navigate("/login")
            return
        }

        setEditingReviewId(review.reviewId)
        setEditRating(Number(review.rating || 0))
        setEditComment(review.comment || "")
    }

    function cancelEdit(){
        setEditingReviewId(null)
        setEditRating(0)
        setEditComment("")
        setSavingReviewId(null)
    }

    async function submitCreateReview(event){
        event.preventDefault()

        const token = getTokenOrRedirect()
        if(!token){
            return
        }

        if(createRating < 1){
            toast.error("Please choose a rating before submitting.")
            return
        }

        if(createComment.length > 500){
            toast.error("Comment must be 500 characters or less.")
            return
        }

        setCreating(true)
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + `/products/${productId}/reviews`, {
                rating: createRating,
                comment: createComment.trim()
            }, {
                headers: {
                    ...getAuthHeaders(token),
                    "Content-Type": "application/json"
                }
            })

            const createdReview = normalizeReview(response.data.review || response.data)
            setReviews((previousReviews) => [createdReview, ...previousReviews])
            setCreateRating(0)
            setCreateComment("")
            toast.success(response.data.message || "Review created successfully")
        }catch(error){
            if(!handleAuthFailure(error)){
                toast.error(resolveDuplicateMessage(error))
            }
        }finally{
            setCreating(false)
        }
    }

    async function submitEditReview(event, review){
        event.preventDefault()

        const token = getTokenOrRedirect()
        if(!token){
            return
        }

        if(editRating < 1){
            toast.error("Please choose a rating before saving.")
            return
        }

        if(editComment.length > 500){
            toast.error("Comment must be 500 characters or less.")
            return
        }

        if(currentUser?.role === "admin" || currentUser?.email?.toLowerCase() !== review.userEmail?.toLowerCase()){
            toast.error("You can only modify your own reviews.")
            return
        }

        setSavingReviewId(review.reviewId)
        try{
            const response = await axios.put(import.meta.env.VITE_API_URL + `/products/${productId}/reviews/${review.reviewId}`, {
                rating: editRating,
                comment: editComment.trim()
            }, {
                headers: getAuthHeaders(token)
            })

            const updatedReview = normalizeReview(response.data.review || response.data)
            setReviews((previousReviews) => previousReviews.map((item) => item.reviewId === review.reviewId ? updatedReview : item))
            toast.success(response.data.message || "Review updated successfully")
            cancelEdit()
        }catch(error){
            if(!handleAuthFailure(error)){
                toast.error(error.response?.data?.message || "We could not update your review. Please try again.")
            }
        }finally{
            setSavingReviewId(null)
        }
    }

    function requestDelete(review){
        if(!currentUser){
            toast.error("Please log in to delete your review.")
            navigate("/login")
            return
        }

        setDeleteTarget(review)
    }

    async function confirmDelete(){
        if(!deleteTarget){
            return
        }

        const token = getTokenOrRedirect()
        if(!token){
            return
        }

        if(currentUser?.role === "admin" || currentUser?.email?.toLowerCase() !== deleteTarget.userEmail?.toLowerCase()){
            toast.error("You can only modify your own reviews.")
            setDeleteTarget(null)
            return
        }
        setDeletingReviewId(deleteTarget.reviewId)
        try{
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/products/${productId}/reviews/${deleteTarget.reviewId}`, {
                headers: getAuthHeaders(token)
            })

            setReviews((previousList) => previousList.filter((review) => review.reviewId !== deleteTarget.reviewId))
            toast.success(response.data.message || "Review deleted successfully")
            setDeleteTarget(null)
        }catch(error){
            if(!handleAuthFailure(error)){
                toast.error(error.response?.data?.message || "We could not delete your review. Please try again.")
            }
        }finally{
            setDeletingReviewId(null)
        }
    }

    const reviewsAreEmpty = !loadingReviews && reviews.length === 0

    return (
        <section className="mx-auto max-w-5xl rounded-4xl border border-white/70 bg-white/75 p-4 shadow-lg backdrop-blur-sm lg:p-8">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900">Product Reviews</h2>
                    <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white">
                        <span aria-hidden="true">★</span>
                        <span className="text-white/70">|</span>
                        <span>{reviewSummary.total} total</span>
                    </div>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                    Reviews are sorted newest first. You can edit or delete only your own reviews, and admins are blocked from modifying reviews.
                </p>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-900/5 p-4 lg:p-6">
                <h3 className="text-lg font-semibold text-slate-900">Write a review</h3>
                <p className="mt-1 text-sm text-slate-600">Share a rating and optional comment. Comments can be up to 500 characters.</p>

                {profileLoading ? (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-600">Checking your account...</div>
                ) : currentUser ? (
                    <form onSubmit={submitCreateReview} className="mt-4 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
                            <StarRatingInput
                                value={createRating}
                                onChange={setCreateRating}
                                name="create-review-rating"
                                ariaLabelPrefix="Review rating"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="create-review-comment">Comment</label>
                            <textarea
                                id="create-review-comment"
                                value={createComment}
                                onChange={(event) => setCreateComment(event.target.value)}
                                maxLength={500}
                                rows={4}
                                placeholder="What did you think about this product?"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                            />
                            <p className="mt-1 text-xs text-slate-500">Optional, up to 500 characters.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="submit"
                                disabled={creating || createRating === 0}
                                className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {creating ? "Submitting..." : "Submit review"}
                            </button>
                            <span className="text-xs text-slate-500">Signed in as {getUserDisplayName(currentUser)}</span>
                        </div>
                    </form>
                ) : (
                    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
                        <p>Log in to create, edit, or delete a review.</p>
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90"
                        >
                            Go to login
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">All reviews</h3>
                    {loadingReviews && <span className="text-sm text-slate-500">Loading reviews...</span>}
                </div>

                {loadError && !loadingReviews && (
                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        {loadError}
                    </div>
                )}

                {reviewsAreEmpty && (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                        Be the first to review this product.
                    </div>
                )}

                <div className="mt-4 space-y-4">
                    {reviews.map((review) => (
                        <ReviewItem
                            key={review.reviewId}
                            review={review}
                            currentUser={currentUser}
                            onStartEdit={startEdit}
                            onRequestDelete={requestDelete}
                            isEditing={editingReviewId === review.reviewId}
                            editRating={editRating}
                            editComment={editComment}
                            setEditRating={setEditRating}
                            setEditComment={setEditComment}
                            onCancelEdit={cancelEdit}
                            onSubmitEdit={(event) => submitEditReview(event, review)}
                            isSaving={savingReviewId === review.reviewId}
                        />
                    ))}
                </div>
            </div>

            <DeleteConfirmationModal
                review={deleteTarget}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
                isDeleting={Boolean(deleteTarget && deletingReviewId === deleteTarget.reviewId)}
            />
        </section>
    )
}