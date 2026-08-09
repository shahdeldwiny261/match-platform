import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Users, MapPin, Calendar, Clock, Plus, UserPlus, X, Search, SlidersHorizontal } from "lucide-react"
import { Button, Card, Badge, Input, Select, Textarea } from "../../components/ui"
import { joinGame, createGame } from "../../redux/bookingReducer"
import { getNextDays, TIME_SLOTS } from "../../utils"

export default function FindPlayers() {
  const dispatch = useDispatch()
  const games = useSelector((s) => s.booking.openGames)
  const venues = useSelector((s) => s.booking.venues)
  const currentUser = useSelector((s) => s.auth.user)
  const [showForm, setShowForm] = useState(false)
  const [sport, setSport] = useState("football")
  const [query, setQuery] = useState("")
  const [area, setArea] = useState("")
  const [level, setLevel] = useState("")
  const [onlyOpen, setOnlyOpen] = useState(true)

  const days = getNextDays(5)
  const [form, setForm] = useState({
    venueId: venues.find((venue) => venue.sport === "football")?.id,
    date: days[0].value,
    time: TIME_SLOTS[6],
    needed: 4,
    level: "متوسط",
    note: "مباراة ودية، نرحب بكل لاعب ملتزم بالموعد.",
  })

  const filtered = games.filter((g) => {
    if (g.sport !== sport) return false
    if (query && !`${g.venueName} ${g.area} ${g.host}`.includes(query)) return false
    if (area && g.area !== area) return false
    if (level && g.level !== level) return false
    if (onlyOpen && g.needed === 0) return false
    return true
  })

  const handleCreate = (e) => {
    e.preventDefault()
    const venue = venues.find((v) => String(v.id) === String(form.venueId) && v.sport === sport)
    dispatch(
      createGame({
        sport,
        venueName: venue?.name,
        area: venue?.area,
        dateLabel: days.find((d) => d.value === form.date)?.label,
        time: form.time,
        needed: Number(form.needed),
        level: form.level,
        note: form.note,
        host: currentUser?.name || "لاعب",
      }),
    )
    setShowForm(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Users className="h-6 w-6 text-primary" /> ابحث عن لاعبين
          </h1>
          <p className="text-sm text-muted-foreground">انضم لمباراة أو أنشئ مباراتك الخاصة</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" /> أنشئ مباراة
        </Button>
      </div>

      <div className="mt-5 flex gap-2 rounded-2xl bg-muted p-1">
        {[
          { id: "football", label: "كرة قدم" },
          { id: "padel", label: "بادل" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSport(t.id)
              setForm((current) => ({
                ...current,
                venueId: venues.find((venue) => venue.sport === t.id)?.id,
              }))
            }}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              sport === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card className="mt-4 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal className="h-4 w-4 text-primary" /> فلترة الماتشات</div>
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
          <label className="relative block"><Search className="absolute right-3 top-3 h-4 w-4 text-muted" /><Input className="pr-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث بالملعب أو المنطقة أو اسم اللاعب" /></label>
          <Select value={area} onChange={(e) => setArea(e.target.value)}><option value="">كل المناطق</option>{[...new Set(venues.filter((v) => v.sport === sport).map((v) => v.area))].map((item) => <option key={item} value={item}>{item}</option>)}</Select>
          <Select value={level} onChange={(e) => setLevel(e.target.value)}><option value="">كل المستويات</option><option>مبتدئ</option><option>متوسط</option><option>متقدم</option></Select>
          <button type="button" onClick={() => setOnlyOpen((value) => !value)} className={`rounded-[var(--radius)] border px-3 text-sm font-semibold ${onlyOpen ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"}`}>المتاح فقط</button>
        </div>
      </Card>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
          <Card className="mt-4 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">مباراة جديدة</h3>
              <button onClick={() => setShowForm(false)} aria-label="إغلاق">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
              <Field label="الملعب">
                <select
                  className="input"
                  value={form.venueId}
                  onChange={(e) => setForm({ ...form, venueId: e.target.value })}
                >
                  {venues
                    .filter((v) => v.sport === sport)
                    .map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                </select>
              </Field>
              <Field label="التاريخ">
                <select className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}>
                  {days.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="الوقت">
                <select className="input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="عدد اللاعبين المطلوب">
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="input"
                  value={form.needed}
                  onChange={(e) => setForm({ ...form, needed: e.target.value })}
                />
              </Field>
              <Field label="المستوى">
                <select className="input" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  <option>مبتدئ</option>
                  <option>متوسط</option>
                  <option>متقدم</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <label className="block"><span className="mb-1 block text-sm font-medium">تفاصيل الماتش</span><Textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="اكتب المستوى المطلوب، نوع المباراة، أو أي ملاحظات للاعبين" /></label>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  نشر المباراة
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && (
          <Card className="p-10 text-center text-muted-foreground">لا توجد مباريات مفتوحة حالياً</Card>
        )}
        {filtered.map((g, i) => (
          <motion.div key={g.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{g.venueName}</p>
                    <Badge>{g.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">بواسطة {g.host}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-primary">
                    {g.joined}/{g.needed + g.joined}
                  </p>
                  <p className="text-xs text-muted-foreground">لاعب</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {g.area}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {g.dateLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {g.time}
                </span>
              </div>
              <p className="mt-3 rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">{g.note || "لا توجد ملاحظات إضافية"}</p>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>اكتمال الفريق</span><span>{g.needed} أماكن متبقية</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (g.joined / (g.joined + g.needed)) * 100)}%` }} /></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex -space-x-2 space-x-reverse">
                  {Array.from({ length: Math.min(g.joined, 4) }).map((_, idx) => (
                    <span
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted text-xs"
                    >
                      {idx + 1}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  disabled={g.needed === 0}
                  variant={g.needed === 0 ? "outline" : "primary"}
                  onClick={() => dispatch(joinGame(g.id))}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  {g.needed === 0 ? "مكتمل" : "انضم"}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}
