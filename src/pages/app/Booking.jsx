import { useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { ChevronLeft, Calendar, Clock } from "lucide-react"
import { Button, Card } from "../../components/ui"
import { setDraft } from "../../redux/bookingReducer"
import { formatCurrency, getNextDays } from "../../utils"

const timeToMinutes = (value) => {
  const [hours, minutes] = value.split(":").map(Number)
  return hours * 60 + minutes
}

const minutesToTime = (value) => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const venues = useSelector((s) => s.booking.venues)
  const venueSchedules = useSelector((s) => s.booking.venueSchedules)
  const venue = useMemo(() => venues.find((v) => String(v.id) === String(id)), [venues, id])

  const days = useMemo(() => getNextDays(7), [])
  const [courtId, setCourtId] = useState(venue?.courts?.[0]?.id ?? null)
  const [date, setDate] = useState(days[0]?.value)
  const [startSlot, setStartSlot] = useState(null)
  const [duration, setDuration] = useState(1)

  if (!venue) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">لم يتم العثور على الملعب</p>
      </div>
    )
  }

  const court = venue.courts.find((c) => c.id === courtId)
  const weekday = new Date(`${date}T00:00:00`).getDay()
  const venueSchedule = venueSchedules[venue.id]
  const schedule = venueSchedule?.[weekday]
  const slotMinutes = venueSchedule?.slotDuration || 60
  const rawAvailability = (court?.availability?.[date] || []).flatMap((item) => {
    if (slotMinutes !== 30) return [item]
    const start = timeToMinutes(item.start)
    const middle = minutesToTime(start + 30)
    return [
      { ...item, id: `${item.id}-a`, end: middle, price: Math.round(item.price / 2) },
      { ...item, id: `${item.id}-b`, start: middle, price: Math.round(item.price / 2) },
    ]
  })
  const availability = rawAvailability.filter((item) => {
    if (!schedule?.enabled) return false
    if (schedule.allDay) return true
    return item.start >= schedule.open && item.start < schedule.close
  })
  const canFitDuration = (candidate, hours) => {
    const start = timeToMinutes(candidate.start)
    return Array.from({ length: (hours * 60) / slotMinutes }, (_, index) => start + index * slotMinutes).every((minute) =>
      availability.some((item) => timeToMinutes(item.start) === minute && item.status === "available"),
    )
  }
  const selectedSlots = startSlot
    ? Array.from({ length: (duration * 60) / slotMinutes }, (_, index) => availability.find((item) => timeToMinutes(item.start) === timeToMinutes(startSlot.start) + index * slotMinutes)).filter(Boolean)
    : []
  const slot = startSlot && selectedSlots.length === duration
    ? {
        ...startSlot,
        end: selectedSlots[selectedSlots.length - 1].end,
        price: selectedSlots.reduce((total, item) => total + item.price, 0),
        duration,
        slotIds: selectedSlots.map((item) => item.id),
      }
    : null

  const handleContinue = () => {
    if (!slot) return
    dispatch(
      setDraft({
        venueId: venue.id,
        venueName: venue.name,
        venueImage: venue.image,
        sport: venue.sport,
        courtId: court.id,
        courtName: court.name,
        date,
        dateLabel: days.find((d) => d.value === date)?.label,
        time: slot,
        price: slot.price,
      }),
    )
    navigate("/app/payment")
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        رجوع
      </button>

      <h1 className="text-2xl font-bold">حجز {venue.name}</h1>
      <p className="text-sm text-muted-foreground">اختر الملعب والتاريخ والوقت المناسب</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <section>
            <h3 className="mb-3 font-bold">اختر الملعب</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {venue.courts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCourtId(c.id)
                    setStartSlot(null)
                    setDuration(1)
                  }}
                  className={`rounded-2xl border p-4 text-right transition ${
                    courtId === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.size}</p>
                  <p className="mt-1 font-bold text-primary">{formatCurrency(c.basePrice)}/ساعة</p>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <Calendar className="h-4 w-4 text-primary" />
              اختر التاريخ
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => (
                <button
                  key={d.value}
                  onClick={() => {
                    setDate(d.value)
                    setStartSlot(null)
                    setDuration(1)
                  }}
                  className={`flex min-w-[72px] flex-col items-center rounded-2xl border px-3 py-2 transition ${
                    date === d.value ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  <span className="text-xs">{d.weekday}</span>
                  <span className="text-lg font-bold">{d.day}</span>
                  <span className="text-xs">{d.month}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <Clock className="h-4 w-4 text-primary" />
              اختر الوقت
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {availability.map((t) => {
                const isBooked = t.status !== "available"
                return (
                  <button
                    key={t.id}
                    disabled={isBooked}
                    onClick={() => {
                      setStartSlot(t)
                      setDuration(1)
                    }}
                    className={`rounded-xl border py-2 text-sm transition ${
                      isBooked
                        ? "cursor-not-allowed border-border bg-muted text-muted-foreground/50 line-through"
                      : startSlot?.id === t.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                    }`}
                  >
                    {t.start}
                  </button>
                )
              })}
            </div>
            {startSlot && (
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-semibold">اختر مدة الحجز ابتداءً من {startSlot.start}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].filter((hours) => canFitDuration(startSlot, hours)).map((hours) => (
                    <button key={hours} type="button" onClick={() => setDuration(hours)} className={`rounded-lg border px-3 py-2 text-sm ${duration === hours ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface"}`}>
                      {hours} {hours === 1 ? "ساعة" : "ساعات"} · {formatCurrency(availability.filter((item) => timeToMinutes(item.start) >= timeToMinutes(startSlot.start) && timeToMinutes(item.start) < timeToMinutes(startSlot.start) + hours * 60).reduce((total, item) => total + item.price, 0))}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {availability.length === 0 && <p className="mt-3 text-sm text-muted-foreground">لا توجد مواعيد متاحة في هذا اليوم حسب إعدادات الملعب.</p>}
          </section>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24 p-5">
            <h3 className="mb-3 font-bold">ملخص الحجز</h3>
            <div className="space-y-2 text-sm">
              <Row label="الملعب" value={venue.name} />
              <Row label="النوع" value={court?.name} />
              <Row label="التاريخ" value={days.find((d) => d.value === date)?.label} />
              <Row label="الوقت" value={slot?.start || "لم يحدد"} />
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">الإجمالي</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(slot?.price || court?.basePrice || 0)}</span>
            </div>
            <Button className="mt-4 w-full" disabled={!slot} onClick={handleContinue}>
              متابعة الدفع
            </Button>
            {!slot && <p className="mt-2 text-center text-xs text-muted-foreground">اختر وقتاً للمتابعة</p>}
          </Card>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
