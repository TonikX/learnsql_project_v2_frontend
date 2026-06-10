import apiClient from '@/api/client'
import type { FeedbackPayload } from '@/types/feedbackTypes'

class FeedbackService {
    async sendFeedback(payload: FeedbackPayload): Promise<void> {
        await apiClient.post('/api/feedback/add', payload)
    }
}

const feedbackService = new FeedbackService()

export default feedbackService

