import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { CheckCircle2, Calendar, Clock, MapPin, Star } from "lucide-react"
import { Button, Card } from "../../components/ui"
import { formatCurrency } from "../../utils"

export default function Confirmation() {
  const navigate = useNavigate()
  const booking = useSelector((s) => s.booking.lastConfirmed)

  if (!booking) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">لا يوجد حجز مؤكد</p>
        <Button className="mt-4" onClick={() => navigate("/app")}>
          العودة للرئيسية
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </motion.div>

      <h1 className="text-center text-2xl font-bold">تم تأكيد الحجز!</h1>
      <p className="mt-1 text-center text-muted-foreground">رقم الحجز: #{booking.id}</p>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="relative h-36">
          <img
            src={booking.venueImage || "/placeholder.svg"}
            alt={booking.venueName}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h2 className="absolute bottom-3 right-4 text-xl font-bold text-white">{booking.venueName}</h2>
        </div>
        <div className="space-y-3 p-5">
          <Info icon={MapPin} label="الملعب" value={booking.courtName} />
          <Info icon={Calendar} label="التاريخ" value={booking.dateLabel} />
          <Info icon={Clock} label="الوقت" value={booking.time} />
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-semibold">المبلغ المدفوع</span>
            <span className="text-lg font-bold text-primary">{formatCurrency(booking.total)}</span>
          </div>
          {booking.pointsEarned > 0 && (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 p-3 text-sm text-accent">
              <Star className="h-4 w-4" />
              ربحت {booking.pointsEarned} نقطة ولاء من هذا الحجز
            </div>
          )}
        </div>
      </Card>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => navigate("/app/bookings")}>
          حجوزاتي
        </Button>
        <Button className="flex-1" onClick={() => navigate("/app")}>
          العودة للرئيسية
        </Button>
      </div>
    </div>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
