import { useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { CreditCard, Wallet, Banknote, ChevronLeft, Tag } from "lucide-react"
import { Button, Card, Badge } from "../../components/ui"
import { confirmBooking } from "../../redux/bookingReducer"
import { spendPoints, addPoints } from "../../redux/userReducer"
import { formatCurrency } from "../../utils"

const METHODS = [
  { id: "card", label: "بطاقة ائتمان", icon: CreditCard },
  { id: "wallet", label: "محفظة إلكترونية", icon: Wallet },
  { id: "cash", label: "الدفع في الملعب", icon: Banknote },
]

export default function Payment() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const draft = useSelector((s) => s.booking.draft)
  const points = useSelector((s) => s.user.loyaltyPoints)
  const [method, setMethod] = useState("card")
  const [usePoints, setUsePoints] = useState(false)
  const [processing, setProcessing] = useState(false)

  if (!draft?.venueId || !draft?.slot) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">لا يوجد حجز قيد المعالجة</p>
        <Button className="mt-4" onClick={() => navigate("/app")}>
          العودة للرئيسية
        </Button>
      </div>
    )
  }

  // Ten loyalty points are worth one pound, capped at the booking price.
  const discount = usePoints ? Math.min(Math.floor(points / 10), draft.price) : 0
  const pointsUsed = discount * 10
  const total = draft.price - discount

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      if (pointsUsed > 0) dispatch(spendPoints(pointsUsed))
      const pointsEarned = Math.floor(total / 10)
      if (pointsEarned > 0) dispatch(addPoints(pointsEarned))
      dispatch(confirmBooking({ method, total, pointsUsed, pointsEarned }))
      navigate("/app/confirmation")
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        رجوع
      </button>

      <h1 className="text-2xl font-bold">إتمام الدفع</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          <h3 className="font-bold">طريقة الدفع</h3>
          <div className="space-y-2">
            {METHODS.map((m) => {
              const Icon = m.icon
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-right transition ${
                    method === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      method === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{m.label}</span>
                </button>
              )
            })}
          </div>

          {points > 0 && (
            <Card className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold">استخدم نقاط الولاء</p>
                  <p className="text-xs text-muted-foreground">لديك {points} نقطة</p>
                </div>
              </div>
              <button
                onClick={() => setUsePoints((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition ${usePoints ? "bg-primary" : "bg-muted"}`}
                aria-label="استخدام النقاط"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                    usePoints ? "left-0.5" : "left-[22px]"
                  }`}
                />
              </button>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          <Card className="p-5">
            <div className="flex gap-3">
              <img
                src={draft.venueImage || "/placeholder.svg"}
                alt={draft.venueName}
                className="h-16 w-16 rounded-xl object-cover"
                crossOrigin="anonymous"
              />
              <div>
                <p className="font-bold">{draft.venueName}</p>
                <Badge className="mt-1">{draft.sport === "football" ? "كرة قدم" : "بادل"}</Badge>
              </div>
            </div>
            <div className="my-4 space-y-1 border-y border-border py-3 text-sm">
              <Row label="الملعب" value={draft.courtName} />
              <Row label="التاريخ" value={draft.dateLabel} />
              <Row label="الوقت" value={draft.time} />
            </div>
            <div className="space-y-1 text-sm">
              <Row label="السعر" value={formatCurrency(draft.price)} />
              {discount > 0 && <Row label="خصم النقاط" value={`- ${formatCurrency(discount)}`} accent />}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-semibold">الإجمالي</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
            </div>
            <Button className="mt-4 w-full" loading={processing} onClick={handlePay}>
              {method === "cash" ? "تأكيد الحجز" : `ادفع ${formatCurrency(total)}`}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-medium text-accent" : "font-medium"}>{value}</span>
    </div>
  )
}
