import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authReducer"
import userReducer from "./userReducer"
import bookingReducer from "./bookingReducer"
import ownerReducer from "./ownerReducer"
import adminReducer from "./adminReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    booking: bookingReducer,
    owner: ownerReducer,
    admin: adminReducer,
  },
})

export default store
