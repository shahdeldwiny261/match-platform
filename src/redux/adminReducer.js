import { createSlice } from "@reduxjs/toolkit"
import { ADMIN_STATS, ADMIN_USERS, ADMIN_OWNERS } from "../services/mockData"

const initialState = {
  stats: ADMIN_STATS,
  users: ADMIN_USERS,
  owners: ADMIN_OWNERS,
  auditLogs: [
    { id: "a1", actor: "مدير المنصة", action: "توثيق صاحب ملعب", target: "شركة النخبة", ts: "2026-07-25 14:20" },
    { id: "a2", actor: "مدير المنصة", action: "إيقاف مستخدم", target: "كريم سمير", ts: "2026-07-24 11:05" },
    { id: "a3", actor: "مدير المنصة", action: "تعديل نسبة العمولة", target: "12% → 15%", ts: "2026-07-22 09:40" },
  ],
  settings: { commission: 15, serviceFee: 5, aiEnabled: true, smartSearch: true },
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    toggleUserStatus(state, action) {
      const u = state.users.find((x) => x.id === action.payload)
      if (u) u.status = u.status === "active" ? "suspended" : "active"
    },
    verifyOwner(state, action) {
      const o = state.owners.find((x) => x.id === action.payload)
      if (o) o.status = "verified"
    },
    updateSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload }
    },
  },
})

export const { toggleUserStatus, verifyOwner, updateSettings } = adminSlice.actions
export default adminSlice.reducer
