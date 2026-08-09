import { createSlice } from "@reduxjs/toolkit"
import { BOOKINGS, OPEN_SESSIONS, VENUES } from "../services/mockData"
import { uid } from "../utils"

const initialState = {
  // the current selection being built
  draft: {
    venueId: null,
    venueName: null,
    sport: null,
    courtId: null,
    courtName: null,
    date: null,
    slot: null, // {id,start,end,price}
    splitWith: [], // [{name, phone, paid}]
    depositOnly: false,
  },
  list: BOOKINGS,
  // Shared catalog/session state keeps the player flows connected to the mock API.
  venues: VENUES,
  venueSchedules: Object.fromEntries(
    VENUES.map((venue) => [
      venue.id,
      {
        0: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        1: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        2: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        3: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        4: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        5: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
        6: { enabled: true, allDay: false, open: "10:00", close: "23:00" },
      },
    ]),
  ),
  openGames: OPEN_SESSIONS.map((session) => ({
    ...session,
    dateLabel: session.date,
    time: session.start,
  })),
  lastConfirmed: null,
}

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    startSelection(state, action) {
      state.draft = { ...state.draft, ...action.payload }
    },
    setDraft(state, action) {
      state.draft = { ...state.draft, ...action.payload }
    },
    setVenueSchedule(state, action) {
      const { venueId, schedule } = action.payload
      state.venueSchedules[venueId] = schedule
    },
    selectCourt(state, action) {
      state.draft.courtId = action.payload.courtId
      state.draft.courtName = action.payload.courtName
    },
    selectDate(state, action) {
      state.draft.date = action.payload
      state.draft.slot = null
    },
    selectSlot(state, action) {
      state.draft.slot = action.payload
    },
    setSplit(state, action) {
      state.draft.splitWith = action.payload
    },
    setDepositOnly(state, action) {
      state.draft.depositOnly = action.payload
    },
    confirmBooking(state, action) {
      const d = state.draft
      const booking = {
        id: uid("b"),
        venueId: d.venueId,
        venueName: d.venueName,
        courtName: d.courtName,
        sport: d.sport,
        date: d.date,
        dateLabel: d.dateLabel,
        start: d.slot?.start,
        end: d.slot?.end,
        time: d.slot?.start,
        venueImage: d.venueImage,
        price: d.slot?.price || 0,
        status: "confirmed",
        paid: d.depositOnly ? Math.round((d.slot?.price || 0) * 0.3) : d.slot?.price || 0,
        qr: `MATCH-${uid("Q").toUpperCase()}`,
        splitWith: d.splitWith,
        ...action.payload,
      }
      state.list.unshift(booking)
      state.lastConfirmed = booking
    },
    cancelBooking(state, action) {
      const b = state.list.find((x) => x.id === action.payload)
      if (b) b.status = "cancelled"
    },
    checkInBooking(state, action) {
      const b = state.list.find((x) => x.id === action.payload)
      if (b) b.status = "completed"
    },
    resetDraft(state) {
      state.draft = initialState.draft
    },
    joinGame(state, action) {
      const game = state.openGames.find((item) => item.id === action.payload)
      if (game && game.needed > 0) {
        game.needed -= 1
        game.joined += 1
      }
    },
    createGame(state, action) {
      state.openGames.unshift({
        id: uid("s"),
        ...action.payload,
        joined: 1,
      })
    },
  },
})

export const {
  startSelection,
  selectCourt,
  selectDate,
  selectSlot,
  setSplit,
  setDepositOnly,
  confirmBooking,
  cancelBooking,
  checkInBooking,
  resetDraft,
  setDraft,
  setVenueSchedule,
  joinGame,
  createGame,
} = bookingSlice.actions
export const selectMyBookings = (state) => state.booking.list
export default bookingSlice.reducer
