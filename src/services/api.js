// Central API layer. Currently backed by mock data.
// When a real backend is ready, replace the bodies with native fetch() calls.
import { VENUES, REVIEWS, BOOKINGS, OPEN_SESSIONS } from "./mockData"

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const api = {
  async getVenues(sport) {
    await delay()
    return sport ? VENUES.filter((v) => v.sport === sport) : VENUES
  },
  async getVenue(id) {
    await delay()
    return VENUES.find((v) => v.id === id) || null
  },
  async getReviews(venueId) {
    await delay()
    return REVIEWS.filter((r) => r.venueId === venueId)
  },
  async getBookings() {
    await delay()
    return BOOKINGS
  },
  async getOpenSessions() {
    await delay()
    return OPEN_SESSIONS
  },
}
