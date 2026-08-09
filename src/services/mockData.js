import { nextDays } from "../utils"

// Deterministic slot generator for a court on a given day
function buildSlots(dayIndex, courtId, basePrice) {
  const hours = Array.from({ length: 13 }, (_, index) => 10 + index)
  return hours.map((h, i) => {
    const seed = (dayIndex * 7 + i + courtId.length) % 5
    const peak = h >= 18
    return {
      id: `${courtId}-${dayIndex}-${h}`,
      start: `${String(h).padStart(2, "0")}:00`,
      end: `${String(h + 1).padStart(2, "0")}:00`,
      price: peak ? basePrice + 100 : basePrice,
      peak,
      status: seed === 0 ? "booked" : "available",
    }
  })
}

const days = nextDays(14)

function makeAvailability(courtId, basePrice) {
  const map = {}
  days.forEach((d, idx) => {
    map[d] = buildSlots(idx, courtId, basePrice)
  })
  return map
}

export const VENUES = [
  {
    id: "v1",
    name: "ملعب النخبة الرياضي",
    sport: "football",
    area: "سموحة",
    address: "شارع فوزي معاذ، سموحة، الإسكندرية",
    rating: 4.8,
    reviewsCount: 214,
    priceFrom: 350,
    distanceKm: 2.1,
    image: "/images/venue-football-1.png",
    gallery: ["/images/venue-football-1.png", "/images/football-field.png"],
    amenities: ["parking", "shower", "lighting", "cafe"],
    ownerId: "o1",
    popular: 98,
    description: "ملعب خماسي بأرضية نجيل صناعي حديثة وإضاءة ليد كاملة، مناسب للمباريات المسائية.",
    courts: [
      { id: "v1c1", name: "الملعب A", surface: "نجيل صناعي", size: "5 × 5", basePrice: 350 },
      { id: "v1c2", name: "الملعب B", surface: "نجيل صناعي", size: "5 × 5", basePrice: 400 },
    ],
  },
  {
    id: "v2",
    name: "أرينا الكورنيش",
    sport: "football",
    area: "سيدي جابر",
    address: "الكورنيش، سيدي جابر، الإسكندرية",
    rating: 4.6,
    reviewsCount: 156,
    priceFrom: 300,
    distanceKm: 3.4,
    image: "/images/football-field.png",
    gallery: ["/images/football-field.png", "/images/venue-football-1.png"],
    amenities: ["parking", "lighting", "equipment"],
    ownerId: "o1",
    popular: 84,
    description: "ملعب مطل على البحر بموقع مميز وأسعار مناسبة للطلاب والمجموعات.",
    courts: [{ id: "v2c1", name: "الملعب الرئيسي", surface: "نجيل صناعي", size: "5 × 5", basePrice: 300 }],
  },
  {
    id: "v3",
    name: "نادي بادل الإسكندرية",
    sport: "padel",
    area: "ميامي",
    address: "طريق الجيش، ميامي، الإسكندرية",
    rating: 4.9,
    reviewsCount: 302,
    priceFrom: 250,
    distanceKm: 5.0,
    image: "/images/venue-padel-1.png",
    gallery: ["/images/venue-padel-1.png", "/images/padel-court.png"],
    amenities: ["parking", "shower", "lighting", "cafe", "equipment", "wifi"],
    ownerId: "o2",
    popular: 100,
    description: "أحدث ملاعب بادل بأرضية احترافية وجدران زجاجية بانورامية وكافيه متكامل.",
    courts: [
      { id: "v3c1", name: "كورت 1 - بانوراما", surface: "احترافي", size: "10 × 20", basePrice: 250 },
      { id: "v3c2", name: "كورت 2 - داخلي", surface: "احترافي", size: "10 × 20", basePrice: 280 },
      { id: "v3c3", name: "كورت 3 - خارجي", surface: "احترافي", size: "10 × 20", basePrice: 230 },
    ],
  },
  {
    id: "v4",
    name: "بادل لاونج المنتزه",
    sport: "padel",
    area: "المنتزه",
    address: "شارع خالد بن الوليد، المنتزه، الإسكندرية",
    rating: 4.5,
    reviewsCount: 118,
    priceFrom: 220,
    distanceKm: 7.8,
    image: "/images/padel-court.png",
    gallery: ["/images/padel-court.png", "/images/venue-padel-1.png"],
    amenities: ["parking", "lighting", "cafe"],
    ownerId: "o2",
    popular: 72,
    description: "ملاعب بادل هادئة في المنتزه مع أجواء عائلية وكافيه.",
    courts: [{ id: "v4c1", name: "كورت المنتزه", surface: "احترافي", size: "10 × 20", basePrice: 220 }],
  },
  {
    id: "v5",
    name: "ستاد لوران الرياضي",
    sport: "football",
    area: "لوران",
    address: "شارع محمد نجيب، لوران، الإسكندرية",
    rating: 4.4,
    reviewsCount: 89,
    priceFrom: 320,
    distanceKm: 4.2,
    image: "/images/venue-football-1.png",
    gallery: ["/images/venue-football-1.png"],
    amenities: ["parking", "shower", "lighting"],
    ownerId: "o1",
    popular: 66,
    description: "ملعب خماسي مغطى بالكامل يعمل طوال العام.",
    courts: [{ id: "v5c1", name: "الملعب المغطى", surface: "نجيل صناعي", size: "5 × 5", basePrice: 320 }],
  },
  {
    id: "v6",
    name: "بادل سان ستيفانو",
    sport: "padel",
    area: "سان ستيفانو",
    address: "برج سان ستيفانو، الإسكندرية",
    rating: 4.7,
    reviewsCount: 175,
    priceFrom: 300,
    distanceKm: 6.1,
    image: "/images/venue-padel-1.png",
    gallery: ["/images/venue-padel-1.png", "/images/padel-court.png"],
    amenities: ["parking", "shower", "lighting", "cafe", "wifi"],
    ownerId: "o2",
    popular: 90,
    description: "ملاعب بادل فاخرة في قلب سان ستيفانو بإطلالة مميزة.",
    courts: [
      { id: "v6c1", name: "كورت فيو", surface: "احترافي", size: "10 × 20", basePrice: 300 },
      { id: "v6c2", name: "كورت برو", surface: "احترافي", size: "10 × 20", basePrice: 340 },
    ],
  },
]

// attach availability
VENUES.forEach((v) => {
  v.courts.forEach((c) => {
    c.availability = makeAvailability(c.id, c.basePrice)
  })
})

export const REVIEWS = [
  {
    id: "r1",
    venueId: "v1",
    user: "أحمد مصطفى",
    rating: 5,
    date: "2026-07-20",
    comment: "ملعب ممتاز والإضاءة رائعة، هحجز تاني أكيد.",
    criteria: { lighting: 5, surface: 5, cleanliness: 4, service: 5, parking: 4 },
  },
  {
    id: "r2",
    venueId: "v1",
    user: "محمد علي",
    rating: 4,
    date: "2026-07-15",
    comment: "كويس جدًا بس الباركينج زحمة شوية.",
    criteria: { lighting: 5, surface: 4, cleanliness: 4, service: 4, parking: 3 },
  },
  {
    id: "r3",
    venueId: "v3",
    user: "كريم سمير",
    rating: 5,
    date: "2026-07-22",
    comment: "أفضل ملعب بادل في اسكندرية، الأرضية احترافية.",
    criteria: { lighting: 5, surface: 5, cleanliness: 5, service: 5, parking: 5 },
  },
]

export const BOOKINGS = [
  {
    id: "b1",
    venueId: "v1",
    venueName: "ملعب النخبة الرياضي",
    courtName: "الملعب A",
    sport: "football",
    date: days[1],
    start: "20:00",
    end: "21:00",
    price: 450,
    status: "confirmed",
    paid: 450,
    qr: "MATCH-B1-2026",
  },
  {
    id: "b2",
    venueId: "v3",
    venueName: "نادي بادل الإسكندرية",
    courtName: "كورت 1 - بانوراما",
    sport: "padel",
    date: days[3],
    start: "18:00",
    end: "19:00",
    price: 350,
    status: "pending_payment",
    paid: 0,
    qr: "MATCH-B2-2026",
  },
  {
    id: "b3",
    venueId: "v2",
    venueName: "أرينا الكورنيش",
    courtName: "الملعب الرئيسي",
    sport: "football",
    date: days[0],
    start: "16:00",
    end: "17:00",
    price: 300,
    status: "completed",
    paid: 300,
    qr: "MATCH-B3-2026",
  },
]

// find-players open sessions
export const OPEN_SESSIONS = [
  {
    id: "s1",
    sport: "football",
    venueName: "ملعب النخبة الرياضي",
    area: "سموحة",
    date: days[2],
    start: "20:00",
    host: "عمر خالد",
    level: "متوسط",
    needed: 3,
    joined: 7,
    total: 10,
    note: "محتاجين 3 لاعبين لإكمال الفريق، مستوى متوسط ومباراة ودية.",
  },
  {
    id: "s2",
    sport: "padel",
    venueName: "نادي بادل الإسكندرية",
    area: "ميامي",
    date: days[1],
    start: "18:00",
    host: "ياسمين حسن",
    level: "مبتدئ",
    needed: 1,
    joined: 3,
    total: 4,
    note: "ناقصنا لاعب واحد لماتش بادل دوبل، أي مستوى مرحب به.",
  },
  {
    id: "s3",
    sport: "football",
    venueName: "ستاد لوران الرياضي",
    area: "لوران",
    date: days[4],
    start: "22:00",
    host: "محمود سعيد",
    level: "متقدم",
    needed: 2,
    joined: 8,
    total: 10,
    note: "مباراة قوية للمحترفين، ناقصنا 2.",
  },
]

// owner analytics data
export const OWNER_STATS = {
  revenueMonthly: [
    { month: "يناير", revenue: 42000 },
    { month: "فبراير", revenue: 48000 },
    { month: "مارس", revenue: 51000 },
    { month: "أبريل", revenue: 47000 },
    { month: "مايو", revenue: 58000 },
    { month: "يونيو", revenue: 63000 },
    { month: "يوليو", revenue: 71000 },
  ],
  occupancy: [
    { day: "السبت", rate: 92 },
    { day: "الأحد", rate: 65 },
    { day: "الاثنين", rate: 58 },
    { day: "الثلاثاء", rate: 62 },
    { day: "الأربعاء", rate: 70 },
    { day: "الخميس", rate: 88 },
    { day: "الجمعة", rate: 95 },
  ],
  popularHours: [
    { hour: "10ص", count: 12 },
    { hour: "12م", count: 18 },
    { hour: "2م", count: 22 },
    { hour: "4م", count: 34 },
    { hour: "6م", count: 58 },
    { hour: "8م", count: 72 },
    { hour: "10م", count: 61 },
  ],
  balance: 38400,
  pendingWithdraw: 12000,
}

export const ADMIN_STATS = {
  growth: [
    { month: "يناير", users: 320, bookings: 210 },
    { month: "فبراير", users: 410, bookings: 260 },
    { month: "مارس", users: 520, bookings: 330 },
    { month: "أبريل", users: 610, bookings: 390 },
    { month: "مايو", users: 780, bookings: 500 },
    { month: "يونيو", users: 940, bookings: 640 },
    { month: "يوليو", users: 1180, bookings: 820 },
  ],
  totals: { users: 1180, owners: 42, venues: 68, bookings: 3150, revenue: 890000 },
}

export const OWNER_CUSTOMERS = [
  { id: "c1", name: "أحمد مصطفى", bookings: 14, lastVisit: days[0], rating: 4.8, spent: 6200 },
  { id: "c2", name: "محمد علي", bookings: 9, lastVisit: days[2], rating: 4.5, spent: 3800 },
  { id: "c3", name: "كريم سمير", bookings: 21, lastVisit: days[1], rating: 5.0, spent: 9400 },
  { id: "c4", name: "ياسمين حسن", bookings: 6, lastVisit: days[3], rating: 4.2, spent: 2100 },
]

export const ADMIN_USERS = [
  { id: "u1", name: "أحمد مصطفى", phone: "01001234567", status: "active", bookings: 14, joined: "2026-01-12" },
  { id: "u2", name: "محمد علي", phone: "01112345678", status: "active", bookings: 9, joined: "2026-02-03" },
  { id: "u3", name: "كريم سمير", phone: "01223456789", status: "suspended", bookings: 21, joined: "2026-01-20" },
  { id: "u4", name: "ياسمين حسن", phone: "01098765432", status: "active", bookings: 6, joined: "2026-03-15" },
]

export const ADMIN_OWNERS = [
  { id: "o1", name: "شركة النخبة الرياضية", venues: 3, status: "verified", revenue: 320000 },
  { id: "o2", name: "مجموعة بادل مصر", venues: 3, status: "pending", revenue: 410000 },
]
