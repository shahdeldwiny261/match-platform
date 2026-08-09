import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { User, Star, Calendar, Heart, LogOut, Bell, Globe, Shield, ChevronLeft } from "lucide-react"
import { Card, Badge } from "../../components/ui"
import { logout } from "../../redux/authReducer"

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((s) => s.auth.user)
  const points = useSelector((s) => s.user.loyaltyPoints)
  const bookings = useSelector((s) => s.booking.list)
  const favorites = useSelector((s) => s.user.favorites)

  const stats = [
    { label: "الحجوزات", value: bookings.length, icon: Calendar },
    { label: "النقاط", value: points, icon: Star },
    { label: "المفضلة", value: favorites.length, icon: Heart },
  ]

  const menu = [
    { label: "الإشعارات", icon: Bell },
    { label: "اللغة", icon: Globe, value: "العربية" },
    { label: "الخصوصية والأمان", icon: Shield },
  ]

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-bold">الملف الشخصي</h1>

      <Card className="mt-5 flex items-center gap-4 p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-8 w-8" />
        </div>
        <div>
          <p className="text-lg font-bold">{user?.name || "لاعب"}</p>
          <p className="text-sm text-muted-foreground">{user?.email || user?.phone}</p>
          <Badge className="mt-1">لاعب</Badge>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="p-4 text-center">
              <Icon className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </Card>
          )
        })}
      </div>

      <Card className="mt-4 divide-y divide-border p-0">
        {menu.map((m) => {
          const Icon = m.icon
          return (
            <button key={m.label} className="flex w-full items-center justify-between p-4 text-right hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{m.label}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {m.value && <span className="text-sm">{m.value}</span>}
                <ChevronLeft className="h-4 w-4" />
              </div>
            </button>
          )
        })}
      </Card>

      <button
        onClick={handleLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 font-medium text-destructive hover:bg-destructive/10"
      >
        <LogOut className="h-5 w-5" /> تسجيل الخروج
      </button>
    </div>
  )
}
