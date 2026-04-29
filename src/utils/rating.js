export function getAverageRating(product){
    if(!product) return 0

    const candidate =
        product.reviewSummary?.average ??
        product.reviewSummary?.averageRating ??
        product.reviewSummary?.avgRating ??
        product.reviewSummary?.avg ??
        product.review_summary?.average ??
        product.review_summary?.averageRating ??
        product.review_summary?.avgRating ??
        product.review_summary?.avg ??
        product.averageRating ??
        product.avgRating ??
        product.average_rating ??
        product.rating
    const numeric = Number(candidate)
    if(Number.isFinite(numeric) && numeric > 0){
        return Math.max(0, Math.min(5, numeric))
    }

    const list = Array.isArray(product.reviews) ? product.reviews : Array.isArray(product.reviewList) ? product.reviewList : []
    if(list.length === 0) return 0

    const total = list.reduce((sum, r) => sum + Number(r?.rating || 0), 0)
    return total / list.length
}

export function getReviewCount(product){
    if(!product) return 0
    const candidate =
        product.reviewSummary?.total ??
        product.reviewSummary?.reviewCount ??
        product.reviewSummary?.count ??
        product.reviewSummary?.totalReviews ??
        product.review_summary?.total ??
        product.review_summary?.reviewCount ??
        product.review_summary?.count ??
        product.review_summary?.totalReviews ??
        product.reviewCount ??
        product.review_count ??
        product.reviewsCount ??
        product.totalReviews ??
        product.reviews?.length ??
        product.reviewList?.length ??
        0
    const numeric = Number(candidate)
    return Number.isFinite(numeric) ? Math.max(0, numeric) : 0
}

export function getReviewSummaryFromList(reviews){
    const list = Array.isArray(reviews) ? reviews : []
    if(list.length === 0) return { averageRating: 0, reviewCount: 0 }
    const total = list.reduce((sum, r) => sum + Number(r?.rating || 0), 0)
    return { averageRating: total / list.length, reviewCount: list.length }
}