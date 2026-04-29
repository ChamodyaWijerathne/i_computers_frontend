import { useEffect, useMemo, useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import { getAverageRating, getReviewCount } from "../utils/rating"
import { publicGetJson } from "../utils/api"

const reviewSummaryCache = new Map()
const pendingSummaryCache = new Map()

function extractReviewList(response) {
	if (Array.isArray(response)) return response
	if (Array.isArray(response?.reviews)) return response.reviews
	if (Array.isArray(response?.reviewList)) return response.reviewList
	if (Array.isArray(response?.data)) return response.data
	return []
}

function summarizeReviews(reviews) {
	const list = extractReviewList(reviews)
	if (list.length === 0) {
		return { average: 0, total: 0 }
	}

	const total = list.length
	const average = list.reduce((sum, review) => sum + Number(review?.rating || 0), 0) / total
	return { average, total }
}

function getSummaryFromProduct(product) {
	return {
		average: getAverageRating(product),
		total: getReviewCount(product),
	}
}

async function loadReviewSummary(productId) {
	if (reviewSummaryCache.has(productId)) {
		return reviewSummaryCache.get(productId)
	}

	if (!pendingSummaryCache.has(productId)) {
		const pendingPromise = publicGetJson(`/products/${productId}/reviews`)
			.then((response) => {
				const summary = summarizeReviews(response)
				reviewSummaryCache.set(productId, summary)
				return summary
			})
			.finally(() => {
				pendingSummaryCache.delete(productId)
			})

		pendingSummaryCache.set(productId, pendingPromise)
	}

	return pendingSummaryCache.get(productId)
}

export default function RatingBadge({ product }) {
	const initialSummary = useMemo(() => getSummaryFromProduct(product), [product])
	const [summary, setSummary] = useState(initialSummary)

	useEffect(() => {
		let isActive = true
		const productId = product?.productId ?? product?._id
		const localSummary = getSummaryFromProduct(product)
		setSummary(localSummary)

		if (localSummary.total > 0 || !productId) {
			return undefined
		}

		loadReviewSummary(productId)
			.then((loadedSummary) => {
				if (isActive && loadedSummary.total > 0) {
					setSummary(loadedSummary)
				}
			})
			.catch((error) => {
				console.error("Failed to load public review summary", {
					productId,
					status: error.status,
					message: error.message,
					body: error.body,
					error,
				})
			})

		return () => {
			isActive = false
		}
	}, [product])

	return (
		<div className="mt-2 flex items-center gap-2 text-sm text-secondary/80">
			<div className="flex items-center gap-1" aria-label={`${summary.average.toFixed(1)} out of 5 stars`}>
				{Array.from({ length: 5 }, (_, index) => {
					const starNumber = index + 1
					return starNumber <= Math.round(summary.average) ? (
						<FaStar key={starNumber} className="text-amber-400" />
					) : (
						<FaRegStar key={starNumber} className="text-amber-400" />
					)
				})}
			</div>
			<span className="text-secondary/50">|</span>
			<span>{summary.total} reviews</span>
		</div>
	)
}