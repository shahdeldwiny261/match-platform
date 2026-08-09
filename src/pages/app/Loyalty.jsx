import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Gift, Star, TrendingUp, Award, Ticket } from "lucide-react"
import { Card, Badge, Button } from "../../components/ui"
import { redeemReward } from "../../redux/userReducer"

const REWARDS = [
  { id: 1, title: "خصم 25 ريال", points: 250, icon: Ticket },
  { id: 2, title: "ساعة لعب مجانية", points: 500, icon: Gift },
  { id: 3, title: "خصم 50%", points: 750, icon: Award },
  { id: 4, title: "حجز مجاني كامل", points: 1000, icon: Star },
]

const TIERS = [
  { name: "برونزي", min: 0, color: "bg-amber-700" },
  { name: "فضي", min: 500, color: "bg-slate-400" },
  { name: "ذهبي", min: 1000, color: "bg-yellow-500" },
  { name: "بلاتيني", min: 2000, color: "bg-cyan-500" },
]

export default function Loyalty() {
  const dispatch = useDispatch()
  const points = useSelector((s) => s.user.loyaltyPoints)
  const history = useSelector((s) => s.user.pointsHistory)

  const currentTier = [...TIERS].reverse().find((t) => points >= t.min) || TIERS[0]
  const nextTier = TIERS.find((t) => t.min > points)
  const progress = nextTier ? Math.min(100, (points / nextTier.min) * 100) : 100

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold">نقاط الولاء</h1>
      <p className="text-sm text-muted-foreground">اجمع النقاط واستبدلها بمكافآت رائعة</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-l from-primary to-primary/70 p-6 text-primary-foreground"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">رصيدك الحالي</p>
            <p className="text-4xl font-bold">{points}</p>
            <p className="text-sm opacity-90">نقطة</p>
          </div>
          <div className="text-center">
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${currentTier.color}`}>
              <Award className="h-7 w-7 text-white" />
            </span>
            <p className="mt-1 text-sm font-semibold">{currentTier.name}</p>
          </div>
        </div>
        {nextTier && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs opacity-90">
              <span>{currentTier.name}</span>
              <span>
                {nextTier.min - points} نقطة للوصول لـ {nextTier.name}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/25">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-white"
              />
            </div>
          </div>
        )}
      </motion.div>

      <h2 className="mt-8 mb-3 flex items-center gap-2 text-lg font-bold">
        <Gift className="h-5 w-5 text-primary" /> استبدل نقاطك
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {REWARDS.map((r) => {
          const Icon = r.icon
          const canRedeem = points >= r.points
          return (
            <Card key={r.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.points} نقطة</p>
                </div>
              </div>
              <Button
                size="sm"
                disabled={!canRedeem}
                variant={canRedeem ? "primary" : "outline"}
                onClick={() => dispatch(redeemReward({ title: r.title, points: r.points }))}
              >
                {canRedeem ? "استبدل" : "غير كافٍ"}
              </Button>
            </Card>
          )
        })}
      </div>

      <h2 className="mt-8 mb-3 flex items-center gap-2 text-lg font-bold">
        <TrendingUp className="h-5 w-5 text-primary" /> سجل النقاط
      </h2>
      <Card className="divide-y divide-border p-0">
        {history.map((h) => (
          <div key={h.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">{h.title}</p>
              <p className="text-xs text-muted-foreground">{h.date}</p>
            </div>
            <span className={`font-bold ${h.amount > 0 ? "text-primary" : "text-destructive"}`}>
              {h.amount > 0 ? "+" : ""}
              {h.amount}
            </span>
          </div>
        ))}
      </Card>
    </div>
  )
}
