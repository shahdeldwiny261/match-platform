import { Routes, Route } from "react-router"
import { LayoutDashboard, Users, Store, CalendarRange, Wallet2, Sparkles, ShieldAlert, Settings } from "lucide-react"
import DashboardLayout from "../../layouts/DashboardLayout"
import { AdminOverview } from "./sections/AdminOverview"
import { AdminUsers } from "./sections/AdminUsers"
import { AdminOwners } from "./sections/AdminOwners"
import { AdminBookings } from "./sections/AdminBookings"
import { AdminFinance } from "./sections/AdminFinance"
import { AdminAI } from "./sections/AdminAI"
import { AdminAudit } from "./sections/AdminAudit"
import { AdminSettings } from "./sections/AdminSettings"

const NAV = [
  { to: "/admin", end: true, label: "نظرة عامة", icon: LayoutDashboard },
  { to: "/admin/users", label: "المستخدمون", icon: Users },
  { to: "/admin/owners", label: "أصحاب الملاعب", icon: Store },
  { to: "/admin/bookings", label: "الحجوزات", icon: CalendarRange },
  { to: "/admin/finance", label: "المالية والعمولات", icon: Wallet2 },
  { to: "/admin/ai", label: "الذكاء الاصطناعي", icon: Sparkles },
  { to: "/admin/audit", label: "سجل النشاط", icon: ShieldAlert },
  { to: "/admin/settings", label: "الإعدادات", icon: Settings },
]

export default function AdminDashboard() {
  return (
    <Routes>
      <Route element={<DashboardLayout title="لوحة الإدارة المركزية" items={NAV} accent="var(--color-accent)" />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="owners" element={<AdminOwners />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="finance" element={<AdminFinance />} />
        <Route path="ai" element={<AdminAI />} />
        <Route path="audit" element={<AdminAudit />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
