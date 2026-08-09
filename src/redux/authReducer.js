import { createSlice } from "@reduxjs/toolkit"

// role: guest | player | owner | admin
const initialState = {
  role: "guest",
  user: null,
  // preserved guest intent so the "login wall" can restore it
  pendingIntent: null,
  showLoginWall: false,
}

const PROFILES = {
  player: { id: "player1", name: "أحمد مصطفى", phone: "01001234567", email: "player@match.eg", role: "player" },
  owner: { id: "o1", name: "صاحب ملعب النخبة", phone: "01001112222", email: "owner@match.eg", role: "owner" },
  admin: { id: "admin1", name: "مدير المنصة", phone: "01000000000", email: "admin@match.eg", role: "admin" },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole(state, action) {
      const role = action.payload
      state.role = role
      state.user = role === "guest" ? null : PROFILES[role] || PROFILES.player
      state.showLoginWall = false
    },
    logout(state) {
      state.role = "guest"
      state.user = null
      state.pendingIntent = null
    },
    requireLogin(state, action) {
      // store the guest's selection then flag the wall
      state.pendingIntent = action.payload || null
      state.showLoginWall = true
    },
    closeLoginWall(state) {
      state.showLoginWall = false
    },
    clearIntent(state) {
      state.pendingIntent = null
    },
  },
})

export const { setRole, logout, requireLogin, closeLoginWall, clearIntent } = authSlice.actions
// Backwards-compatible action name used by the login surfaces.
export const loginAs = setRole
export default authSlice.reducer
