import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Bell, Heart, User, Menu, X, LogOut, Trophy, Users } from "lucide-react"
import { Button } from "../ui"
import { logout } from "../../redux/authReducer"
import { markAllRead } from "../../redux/userReducer"
import { cn } from "../../utils"

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black">
        M
      </div>
      <span className="text-xl font-black tracking-tight text-primary">ماتش</span>
    </Link>
  )
}

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { role } = useSelector((s) => s.auth)
  const { notifications, selectedSport } = useSelector((s) => s.user)
  const unread = notifications.filter((n) => !n.read).length
  const isPlayer = role === "player"

  const homeLink = selectedSport ? `/app/sport/${selectedSport}` : "/app/select-sport"

  const links = [
    { to: homeLink, label: "الرئيسية" },
    { to: "/app/search", label: "بحث" },
    { to: "/app/find-players", label: "دوّر على لاعبين", icon: Users },
    ...(isPlayer ? [{ to: "/app/bookings", label: "حجوزاتي" }, { to: "/app/loyalty", label: "الولاء", icon: Trophy }] : []),
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-surface-muted hover:text-foreground"
              >
                {l.icon && <l.icon className="h-4 w-4" />}
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          {isPlayer && (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-surface-muted"
                  aria-label="الإشعارات"
                >
                  <Bell className="h-5 w-5" />
                  {unread > 0 && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                      {unread}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute left-0 mt-2 w-80 rounded-[var(--radius)] border border-border bg-surface p-2 shadow-xl">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-sm font-bold">الإشعارات</span>
                      <button
                        type="button"
                        className="text-xs text-primary"
                        onClick={() => dispatch(markAllRead())}
                      >
                        تعليم الكل كمقروء
                      </button>
                    </div>
                    <div className="max-h-80 space-y-1 overflow-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "rounded-lg p-2.5 text-sm",
                            n.read ? "bg-transparent" : "bg-primary/5",
                          )}
                        >
                          <div className="font-semibold text-foreground">{n.title}</div>
                          <div className="text-muted">{n.body}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/app/favorites"
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-surface-muted"
                aria-label="المفضلة"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link
                to="/app/profile"
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-surface-muted"
                aria-label="الملف الشخصي"
              >
                <User className="h-5 w-5" />
              </Link>
            </>
          )}

          {role === "guest" ? (
            <Button size="sm" className="hidden md:inline-flex" onClick={() => navigate("/login")}>
              تسجيل الدخول
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => {
                dispatch(logout())
                navigate("/")
              }}
            >
              <LogOut className="h-4 w-4" /> خروج
            </Button>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col p-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium hover:bg-surface-muted"
              >
                {l.icon && <l.icon className="h-4 w-4" />}
                {l.label}
              </Link>
            ))}
            {role === "guest" ? (
              <Button className="mt-2" onClick={() => navigate("/login")}>
                تسجيل الدخول
              </Button>
            ) : (
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  dispatch(logout())
                  navigate("/")
                }}
              >
                تسجيل الخروج
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
