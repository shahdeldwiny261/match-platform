import { Routes, Route } from "react-router"
import { LayoutDashboard, CalendarCheck, Users, BarChart3, Wallet, Settings2 } from "lucide-react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { OwnerOverview } from "./sections/OwnerOverview"
import { OwnerBookings } from "./sections/OwnerBookings"
import { OwnerCustomers } from "./sections/OwnerCustomers"
import { OwnerAnalytics } from "./sections/OwnerAnalytics"
import { OwnerEarnings } from "./sections/OwnerEarnings"
import { OwnerSetup } from "./sections/OwnerSetup"

const NAV = [
  { to: "/owner", end: true, label: "نظرة عامة", icon: LayoutDashboard },
  { to: "/owner/bookings", label: "الحجوزات", icon: CalendarCheck },
  { to: "/owner/customers", label: "العملاء", icon: Users },
  { to: "/owner/analytics", label: "التحليلات", icon: BarChart3 },
  { to: "/owner/earnings", label: "الأرباح", icon: Wallet },
  { to: "/owner/setup", label: "إعداد الملعب", icon: Settings2 },
]

export default function OwnerDashboard() {
  return (
    <Routes>
      <Route element={<DashboardLayout title="لوحة صاحب الملعب" items={NAV} />}>
        <Route index element={<OwnerOverview />} />
        <Route path="bookings" element={<OwnerBookings />} />
        <Route path="customers" element={<OwnerCustomers />} />
        <Route path="analytics" element={<OwnerAnalytics />} />
        <Route path="earnings" element={<OwnerEarnings />} />
        <Route path="setup" element={<OwnerSetup />} />
      </Route>
    </Routes>
  )
}
