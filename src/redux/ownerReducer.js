import { createSlice } from "@reduxjs/toolkit"
import { OWNER_STATS, OWNER_CUSTOMERS, BOOKINGS } from "../services/mockData"

const initialState = {
  stats: OWNER_STATS,
  customers: OWNER_CUSTOMERS,
  bookings: BOOKINGS,
  // step-by-step venue setup wizard (auto-saved draft)
  setupStep: 0,
  setupDraft: {
    account: { name: "", email: "", phone: "" },
    verification: { license: "", verified: false },
    business: { company: "", taxId: "", payoutAccount: "" },
    venue: { name: "", address: "", location: "" },
    courts: [],
    images: [],
    amenities: [],
    pricing: { hourly: "", peak: "" },
    availability: {
      venueId: "v1",
      slotDuration: 60,
      days: {
        0: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        1: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        2: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        3: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        4: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        5: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        6: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
      },
      blockedDates: [],
    },
    published: false,
  },
}

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setSetupStep(state, action) {
      state.setupStep = action.payload
    },
    updateSetupDraft(state, action) {
      const { section, data } = action.payload
      state.setupDraft[section] = { ...state.setupDraft[section], ...data }
    },
    publishVenue(state) {
      state.setupDraft.published = true
    },
    confirmOwnerBooking(state, action) {
      const b = state.bookings.find((x) => x.id === action.payload)
      if (b) b.status = "confirmed"
    },
    cancelOwnerBooking(state, action) {
      const b = state.bookings.find((x) => x.id === action.payload)
      if (b) b.status = "cancelled"
    },
    requestWithdraw(state, action) {
      state.stats.pendingWithdraw += action.payload
      state.stats.balance -= action.payload
    },
  },
})

export const {
  setSetupStep,
  updateSetupDraft,
  publishVenue,
  confirmOwnerBooking,
  cancelOwnerBooking,
  requestWithdraw,
} = ownerSlice.actions
export default ownerSlice.reducer
