import { useState } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { Menu, X, LogOut, ArrowRight } from "lucide-react"
import { logout } from "../redux/authReducer"
import { cn } from "../utils"

// Shared sidebar dashboard shell used by both Owner and Admin.
export default function DashboardLayout({ title, items, accent = "var(--color-primary)" }) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-white"
          style={{ backgroundColor: accent }}
        >
          M
        </div>
        <div>
          <div className="font-black text-primary-foreground">ماتش</div>
          <div className="text-xs text-primary-foreground/60">{title}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )
            }
          >
            <it.icon className="h-4.5 w-4.5" />
            {it.label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-primary-foreground/10 p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary-foreground/70 hover:bg-primary-foreground/10"
        >
          <ArrowRight className="h-4.5 w-4.5" /> الموقع الرئيسي
        </Link>
        <button
          type="button"
          onClick={() => {
            dispatch(logout())
            navigate("/")
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary-foreground/70 hover:bg-primary-foreground/10"
        >
          <LogOut className="h-4.5 w-4.5" /> تسجيل الخروج
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 right-0 hidden w-64 bg-primary lg:block">{sidebar}</aside>

      {/* mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-64 bg-primary lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute left-3 top-4 text-primary-foreground"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </>
      )}

      <div className="lg:mr-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/85 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            aria-label="القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="w-10 lg:w-0" />
        </header>
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
