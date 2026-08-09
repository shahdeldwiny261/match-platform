import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { TrendingUp, Calendar, Wallet, ShieldCheck, ArrowLeft } from "lucide-react"
import { useDispatch } from "react-redux"
import { Button } from "../../components/ui"
import { setRole } from "../../redux/authReducer"

const BENEFITS = [
  { icon: Calendar, title: "إدارة الحجوزات", desc: "تحكم كامل في مواعيد ملاعبك والحجوزات القادمة" },
  { icon: TrendingUp, title: "تحليلات ذكية", desc: "تقارير الإيرادات ونسب الإشغال في الوقت الفعلي" },
  { icon: Wallet, title: "أرباح فورية", desc: "استلم أرباحك بسهولة عبر التحويل المباشر" },
  { icon: ShieldCheck, title: "توثيق موثوق", desc: "حساب موثق يزيد ثقة اللاعبين في ملاعبك" },
]

export default function OwnerLanding() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const start = () => {
    dispatch(setRole("owner"))
    navigate("/owner")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button onClick={() => navigate("/")} className="text-xl font-black text-primary">
            ماتش
          </button>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" /> للاعبين
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-balance text-4xl font-black md:text-5xl"
        >
          حوّل ملعبك إلى مصدر دخل ثابت
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground"
        >
          انضم لمنصة ماتش وأدر حجوزات ملاعبك، تابع أرباحك، وتواصل مع آلاف اللاعبين في مكان واحد.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center gap-3"
        >
          <Button size="lg" onClick={start}>
            ابدأ الآن مجاناً
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/owner")}>
            عرض لوحة التحكم
          </Button>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
