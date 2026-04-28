export function getAverageRating(product){
    if(!product) return 0

    const candidate = product.reviewSummary?.average ?? product.averageRating ?? product.avgRating ?? product.rating
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
    const candidate = product.reviewSummary?.total ?? product.reviewCount ?? product.reviews?.length ?? product.reviewList?.length ?? 0
    const numeric = Number(candidate)
    return Number.isFinite(numeric) ? Math.max(0, numeric) : 0
}

export function getReviewSummaryFromList(reviews){
    const list = Array.isArray(reviews) ? reviews : []
    if(list.length === 0) return { averageRating: 0, reviewCount: 0 }
    const total = list.reduce((sum, r) => sum + Number(r?.rating || 0), 0)
    return { averageRating: total / list.length, reviewCount: list.length }
}