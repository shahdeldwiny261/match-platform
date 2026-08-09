export const SPORTS = {
  football: {
    id: "football",
    name: "كرة قدم خماسي",
    short: "كورة",
    theme: {
      primary: "var(--color-fb)",
      dark: "var(--color-fb-dark)",
      soft: "var(--color-fb-soft)",
    },
  },
  padel: {
    id: "padel",
    name: "بادل",
    short: "بادل",
    theme: {
      primary: "var(--color-pd)",
      dark: "var(--color-pd-dark)",
      soft: "var(--color-pd-soft)",
    },
  },
}

export const ROLES = {
  guest: "guest",
  player: "player",
  owner: "owner",
  admin: "admin",
}

export const BOOKING_STATES = [
  { key: "available", label: "متاح" },
  { key: "selected", label: "محجوز مؤقتًا" },
  { key: "pending_payment", label: "في انتظار الدفع" },
  { key: "success", label: "نجاح الدفع" },
  { key: "confirmed", label: "مؤكد" },
  { key: "reminder", label: "تذكير" },
  { key: "checkin", label: "تشيك إن" },
  { key: "completed", label: "مكتمل" },
  { key: "review", label: "تقييم" },
]

export const LOYALTY_TIERS = [
  {
    key: "beginner",
    name: "مبتدئ",
    min: 0,
    max: 499,
    color: "#8c9c96",
    reward: "خصم في عيد ميلادك",
  },
  {
    key: "bronze",
    name: "برونزي",
    min: 500,
    max: 1499,
    color: "#b5502e",
    reward: "خصم 5% على ساعات الذروة",
  },
  {
    key: "silver",
    name: "فضي",
    min: 1500,
    max: 3999,
    color: "#9aa4a0",
    reward: "تأجير معدات مجاني",
  },
  {
    key: "gold",
    name: "ذهبي",
    min: 4000,
    max: Infinity,
    color: "#c98a1f",
    reward: "أولوية حجز + خصم 10%",
  },
]

export function tierForPoints(points) {
  return LOYALTY_TIERS.find((t) => points >= t.min && points <= t.max) || LOYALTY_TIERS[0]
}

export const AMENITIES = [
  { key: "parking", label: "باركينج", icon: "Car" },
  { key: "shower", label: "دش", icon: "ShowerHead" },
  { key: "lighting", label: "إضاءة", icon: "Lightbulb" },
  { key: "equipment", label: "تأجير معدات", icon: "Dumbbell" },
  { key: "cafe", label: "كافيه", icon: "Coffee" },
  { key: "wifi", label: "واي فاي", icon: "Wifi" },
]

export const REVIEW_CRITERIA = [
  { key: "lighting", label: "الإضاءة" },
  { key: "surface", label: "الأرضية / العشب" },
  { key: "cleanliness", label: "النظافة" },
  { key: "service", label: "الخدمة" },
  { key: "parking", label: "الباركينج" },
]

export const ALEX_AREAS = [
  "سموحة",
  "سيدي جابر",
  "ميامي",
  "المنتزه",
  "العجمي",
  "لوران",
  "كامب شيزار",
  "سان ستيفانو",
  "المندرة",
  "أبو قير",
]
