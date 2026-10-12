import { ref, computed } from 'vue'

// Local storage key for user ratings
const STORAGE_KEY = 'abu_samra_product_ratings'

// Reactive dictionary of user ratings: { [productId]: score }
const userRatings = ref({})

// Reactive dictionary of active feedback toasts per product: { [productId]: message }
const ratingFeedback = ref({})

// Initialize from localStorage
try {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    userRatings.value = JSON.parse(saved)
  }
} catch (e) {
  console.warn('Could not load ratings from localStorage', e)
}

// Deterministic seed for initial ratings and counts per dish id
const getBaseRatingData = (productId) => {
  let hash = 0
  for (let i = 0; i < productId.length; i++) {
    hash = (hash << 5) - hash + productId.charCodeAt(i)
    hash |= 0
  }
  const absHash = Math.abs(hash)
  // Rating between 4.7 and 5.0
  const baseScore = 4.7 + ((absHash % 4) * 0.1)
  // Review count between 42 and 180
  const baseCount = 42 + (absHash % 138)
  return {
    score: parseFloat(baseScore.toFixed(1)),
    count: baseCount
  }
}

export function useRatings() {
  const getUserRating = (productId) => {
    return userRatings.value[productId] || 0
  }

  const getProductRatingStats = (productId) => {
    const base = getBaseRatingData(productId)
    const userScore = userRatings.value[productId]

    if (userScore) {
      const totalScore = (base.score * base.count) + userScore
      const totalCount = base.count + 1
      const average = (totalScore / totalCount).toFixed(1)
      return {
        score: parseFloat(average),
        count: totalCount,
        hasUserRated: true,
        userScore
      }
    }

    return {
      score: base.score,
      count: base.count,
      hasUserRated: false,
      userScore: 0
    }
  }

  const rateProduct = (productId, score) => {
    // Save rating
    userRatings.value = {
      ...userRatings.value,
      [productId]: score
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userRatings.value))
    } catch (e) {
      console.warn('Could not save rating to localStorage', e)
    }

    // Set instant zero-friction feedback message
    const feedbackTexts = [
      'شكراً لتقييمك!',
      'سعداء برأيك!',
      'تقييمك يسعدنا!',
      'شكراً لك! ⭐',
      'صحتين وعافية!'
    ]
    const text = feedbackTexts[Math.floor(Math.random() * feedbackTexts.length)]

    ratingFeedback.value[productId] = text

    // Clear feedback after 2.5 seconds
    setTimeout(() => {
      if (ratingFeedback.value[productId]) {
        delete ratingFeedback.value[productId]
      }
    }, 2500)
  }

  const getFeedbackMessage = (productId) => {
    return ratingFeedback.value[productId] || ''
  }

  return {
    getUserRating,
    getProductRatingStats,
    rateProduct,
    getFeedbackMessage
  }
}
