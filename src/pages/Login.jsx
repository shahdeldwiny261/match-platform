import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { User, Building2, ShieldCheck, ArrowRight } from "lucide-react"
import { Button, Card, Input } from "../components/ui"
import { loginAs } from "../redux/authReducer"

const ROLE_CARDS = [
  { role: "player", label: "لاعب", desc: "احجز ملاعب والعب", icon: User, to: "/app/select-sport" },
  { role: "owner", label: "صاحب ملعب", desc: "أدر ملاعبك وحجوزاتك", icon: Building2, to: "/owner" },
  { role: "admin", label: "أدمن", desc: "إدارة المنصة", icon: ShieldCheck, to: "/admin" },
]

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pendingIntent = useSelector((s) => s.auth.pendingIntent)
  const [mode, setMode] = useState("login")

  function handleLogin(role, to) {
    dispatch(loginAs(role))
    // if a guest had a pending booking intent, restore it
    if (role === "player" && pendingIntent?.redirect) {
      navigate(pendingIntent.redirect)
    } else {
      navigate(to)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2" dir="rtl">
      {/* left visual */}
      <div className="relative hidden lg:block">
        <img src="/images/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground font-black text-primary">
              M
            </div>
            <span className="text-2xl font-black">ماتش</span>
          </Link>
          <div>
            <h2 className="text-4xl font-black leading-tight text-balance">
              أهلاً بيك في ماتش
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              سجّل دخولك وابدأ رحلتك مع أكبر منصة حجز ملاعب في اسكندرية.
            </p>
          </div>
          <p className="text-sm text-primary-foreground/60">© 2026 ماتش</p>
        </div>
      </div>

      {/* right form */}
      <div className="flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-black text-primary-foreground">
                M
              </div>
              <span className="text-xl font-black text-primary">ماتش</span>
            </Link>
          </div>

          <div className="mb-6 flex gap-2 rounded-[var(--radius)] bg-surface-muted p-1">
            {[
              { key: "login", label: "تسجيل دخول" },
              { key: "signup", label: "حساب جديد" },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setMode(t.key)}
                className={
                  "flex-1 rounded-lg py-2.5 text-sm font-semibold transition " +
                  (mode === t.key ? "bg-surface text-primary shadow-sm" : "text-muted")
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {mode === "signup" && <Input placeholder="الاسم بالكامل" />}
            <Input placeholder="رقم الموبايل أو البريد الإلكتروني" />
            <Input type="password" placeholder="كلمة المرور" />
          </div>

          <p className="mt-5 text-center text-sm font-semibold text-muted">اختر نوع حسابك للدخول</p>
          <div className="mt-3 space-y-2">
            {ROLE_CARDS.map((c) => (
              <Card
                key={c.role}
                as="button"
                className="flex w-full cursor-pointer items-center gap-4 p-4 text-right transition hover:border-primary hover:shadow-md"
                onClick={() => handleLogin(c.role, c.to)}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5.5 w-5.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold">{c.label}</div>
                  <div className="text-sm text-muted">{c.desc}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted" />
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
