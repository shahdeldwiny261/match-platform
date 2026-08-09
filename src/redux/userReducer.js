import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedSport: null, // football | padel
  favorites: ["v3", "v1"],
  loyaltyPoints: 1720,
  referralCode: "MATCH-U120",
  pointsHistory: [
    { id: "h1", title: "حجز ملعب النخبة", date: "20 يوليو", amount: 45 },
    { id: "h2", title: "استبدال خصم 25 ريال", date: "15 يوليو", amount: -250 },
    { id: "h3", title: "حجز نادي بادل الإسكندرية", date: "12 يوليو", amount: 35 },
    { id: "h4", title: "مكافأة دعوة صديق", date: "8 يوليو", amount: 100 },
    { id: "h5", title: "حجز أرينا الكورنيش", date: "3 يوليو", amount: 30 },
  ],
  notifications: [
    { id: "n1", type: "reminder", title: "تذكير بحجزك", body: "ماتش الكورة بكرة الساعة 8 مساءً", read: false, ts: Date.now() - 3600000 },
    { id: "n2", type: "payment", title: "تم الدفع بنجاح", body: "تم تأكيد دفع 450 ج.م لملعب النخبة", read: false, ts: Date.now() - 7200000 },
    { id: "n3", type: "offer", title: "عرض خاص", body: "خصم 15% على ملاعب البادل نهاية الأسبوع", read: true, ts: Date.now() - 86400000 },
  ],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSport(state, action) {
      state.selectedSport = action.payload
    },
    toggleFavorite(state, action) {
      const id = action.payload
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id)
      } else {
        state.favorites.push(id)
      }
    },
    addPoints(state, action) {
      state.loyaltyPoints += action.payload
    },
    spendPoints(state, action) {
      state.loyaltyPoints = Math.max(0, state.loyaltyPoints - action.payload)
    },
    redeemReward(state, action) {
      const { title, points } = action.payload
      if (state.loyaltyPoints < points) return
      state.loyaltyPoints -= points
      state.pointsHistory.unshift({
        id: `redeem_${Date.now()}`,
        title,
        date: new Date().toLocaleDateString("ar-EG"),
        amount: -points,
      })
    },
    markNotificationRead(state, action) {
      const n = state.notifications.find((x) => x.id === action.payload)
      if (n) n.read = true
    },
    markAllRead(state) {
      state.notifications.forEach((n) => (n.read = true))
    },
  },
})

export const { setSport, toggleFavorite, addPoints, spendPoints, redeemReward, markNotificationRead, markAllRead } = userSlice.actions
export default userSlice.reducer
