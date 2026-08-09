import { useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, X, RotateCcw } from "lucide-react"
import { Button, Card, Badge } from "../../components/ui"
import { cancelBooking } from "../../redux/bookingReducer"
import { formatCurrency } from "../../utils"

const TABS = [
  { id: "upcoming", label: "القادمة" },
  { id: "completed", label: "المكتملة" },
  { id: "cancelled", label: "الملغاة" },
]

export default function Bookings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bookings = useSelector((s) => s.booking.list)
  const [tab, setTab] = useState("upcoming")

  const filtered = bookings.filter((b) => {
    if (tab === "upcoming") return ["confirmed", "pending_payment"].includes(b.status)
    return b.status === tab
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold">حجوزاتي</h1>
      <p className="text-sm text-muted-foreground">تابع وأدر جميع حجوزاتك</p>

      <div className="mt-5 flex gap-2 rounded-2xl bg-muted p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              tab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">لا توجد حجوزات {TABS.find((t) => t.id === tab)?.label}</p>
            <Button className="mt-4" onClick={() => navigate("/app")}>
              احجز الآن
            </Button>
          </Card>
        )}
        {filtered.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="flex gap-4 p-4">
              <img
                src={b.venueImage || "/placeholder.svg"}
                alt={b.venueName}
                className="h-20 w-20 rounded-xl object-cover"
                crossOrigin="anonymous"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold">{b.venueName}</p>
                    <Badge className="mt-1">{b.sport === "football" ? "كرة قدم" : "بادل"}</Badge>
                  </div>
                  <span className="font-bold text-primary">{formatCurrency(b.total ?? b.price)}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {b.courtName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {b.dateLabel ?? b.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {b.time ?? b.start}
                  </span>
                </div>
                {tab === "upcoming" && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="danger" onClick={() => dispatch(cancelBooking(b.id))}>
                      <X className="h-3.5 w-3.5" /> إلغاء
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/app/venue/${b.venueId}`)}>
                      التفاصيل
                    </Button>
                  </div>
                )}
                {tab === "completed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={() => navigate(`/app/booking/${b.venueId}`)}
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> احجز مرة أخرى
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
