// ---- className merge helper (no external deps) ----
export function cn(...args) {
  return args.filter(Boolean).join(" ")
}

// ---- currency ----
export function formatEGP(value) {
  const n = Number(value) || 0
  return `${n.toLocaleString("ar-EG")} ج.م`
}

// alias used across pages
export const formatCurrency = formatEGP

export function formatNumber(value) {
  const n = Number(value) || 0
  return n.toLocaleString("ar-EG")
}

// fixed booking time slots (18:00 → peak)
export const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]

const AR_WEEK_SHORT = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
const AR_MONTH_SHORT = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
]

// rich day objects for booking date pickers
export function getNextDays(count = 7) {
  const out = []
  const base = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const value = d.toISOString().slice(0, 10)
    out.push({
      value,
      weekday: i === 0 ? "اليوم" : AR_WEEK_SHORT[d.getDay()],
      day: d.getDate(),
      month: AR_MONTH_SHORT[d.getMonth()],
      label: `${AR_WEEK_SHORT[d.getDay()]} ${d.getDate()} ${AR_MONTH_SHORT[d.getMonth()]}`,
    })
  }
  return out
}

// ---- date/time (Arabic) ----
const AR_DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
]

export function formatDateAr(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return `${AR_DAYS[d.getDay()]} ${d.getDate()} ${AR_MONTHS[d.getMonth()]}`
}

export function shortDateAr(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return `${d.getDate()} ${AR_MONTHS[d.getMonth()]}`
}

export function to12h(time24) {
  if (!time24) return ""
  const [h, m] = time24.split(":").map(Number)
  const period = h < 12 ? "ص" : "م"
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, "0")} ${period}`
}

// build the next N days from today
export function nextDays(count = 14) {
  const days = []
  const base = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

// countdown between now and a date-time
export function countdown(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { done: true, label: "انتهى" }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return { done: false, label: `${days} يوم و ${hours} ساعة` }
  if (hours > 0) return { done: false, label: `${hours} ساعة و ${mins} دقيقة` }
  return { done: false, label: `${mins} دقيقة` }
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

export function classForStatus(status) {
  switch (status) {
    case "confirmed":
    case "completed":
      return "bg-success/12 text-success"
    case "pending":
    case "pending_payment":
    case "selected":
      return "bg-warning/12 text-warning"
    case "cancelled":
    case "failed":
      return "bg-danger/12 text-danger"
    default:
      return "bg-surface-muted text-muted"
  }
}
