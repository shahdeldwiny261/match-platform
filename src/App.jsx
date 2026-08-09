import { lazy, Suspense } from "react"
import { Navigate, Routes, Route } from "react-router"
import { Loader2 } from "lucide-react"
import AppLayout from "./layouts/AppLayout"
import OwnerDashboard from "./pages/owner/OwnerDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"

// Guest / public
const GuestHome = lazy(() => import("./pages/GuestHome"))
const Login = lazy(() => import("./pages/Login"))
const OwnerLanding = lazy(() => import("./pages/owner/OwnerLanding"))

// Player app (grouped route pages)
const SelectSport = lazy(() => import("./pages/app/SelectSport"))
const SportHome = lazy(() => import("./pages/app/SportHome"))
const Search = lazy(() => import("./pages/app/Search"))
const VenueDetails = lazy(() => import("./pages/app/VenueDetails"))
const Booking = lazy(() => import("./pages/app/Booking"))
const Payment = lazy(() => import("./pages/app/Payment"))
const Confirmation = lazy(() => import("./pages/app/Confirmation"))
const Bookings = lazy(() => import("./pages/app/Bookings"))
const Loyalty = lazy(() => import("./pages/app/Loyalty"))
const Favorites = lazy(() => import("./pages/app/Favorites"))
const Profile = lazy(() => import("./pages/app/Profile"))
const FindPlayers = lazy(() => import("./pages/app/FindPlayers"))

function Fallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<GuestHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner/start" element={<OwnerLanding />} />

        {/* Player-facing app */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="select-sport" replace />} />
          <Route path="select-sport" element={<SelectSport />} />
          <Route path="sport/:sport" element={<SportHome />} />
          <Route path="search" element={<Search />} />
          <Route path="venue/:id" element={<VenueDetails />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="booking" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile />} />
          <Route path="find-players" element={<FindPlayers />} />
        </Route>

        {/* Owner dashboard */}
        <Route path="/owner/*" element={<OwnerDashboard />} />

        {/* Admin dashboard */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  )
}
