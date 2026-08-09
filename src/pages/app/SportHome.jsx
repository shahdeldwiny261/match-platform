import { useEffect } from "react"
import { Link, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Search, Sparkles, TrendingUp, Tag, MapPin, RotateCcw, Users, ArrowLeft } from "lucide-react"
import VenueCard from "../../components/common/VenueCard"
import { Card } from "../../components/ui"
import { setSport } from "../../redux/userReducer"
import { VENUES } from "../../services/mockData"
import { SPORTS } from "../../constants"
import { formatEGP } from "../../utils"

function Row({ icon: Icon, title, action, children }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Icon className="h-5 w-5 text-accent" /> {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export default function SportHome() {
  const { sport } = useParams()
  const dispatch = useDispatch()
  const bookings = useSelector((s) => s.booking.list)
  const meta = SPORTS[sport] || SPORTS.football

  useEffect(() => {
    dispatch(setSport(sport))
  }, [sport, dispatch])

  const venues = VENUES.filter((v) => v.sport === sport)
  const nearby = [...venues].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3)
  const popular = [...venues].sort((a, b) => b.popular - a.popular).slice(0, 3)
  const rebook = bookings.filter((b) => b.sport === sport).slice(0, 2)

  return (
    <div style={{ backgroundColor: meta.theme.soft }}>
      {/* sport hero */}
      <section
        className="relative overflow-hidden py-14"
        style={{ background: `linear-gradient(135deg, ${meta.theme.primary}, ${meta.theme.dark})` }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white">
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              {meta.name} • الإسكندرية
            </span>
            <h1 className="mt-4 text-3xl font-black text-balance md:text-4xl">
              أهلاً بيك في عالم {meta.short}
            </h1>
            <p className="mt-2 max-w-xl text-white/85">اكتشف أفضل الملاعب القريبة منك واحجز في ثوانٍ</p>

            <Link
              to="/app/search"
              className="mt-6 flex max-w-lg items-center gap-2 rounded-2xl bg-surface p-2 shadow-lg"
            >
              <Search className="mr-2 h-5 w-5 text-muted" />
              <span className="flex-1 py-2 text-sm text-muted">ابحث بالاسم أو جرّب البحث الذكي...</span>
              <span
                className="rounded-[var(--radius)] px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: meta.theme.dark }}
              >
                بحث
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* AI recommendation */}
        <Card className="mb-10 flex flex-col items-start gap-4 border-accent/30 bg-accent/5 p-6 md:flex-row md:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">توصية ذكية ليك</h3>
            <p className="text-sm text-muted">
              بناءً على حجوزاتك السابقة، ننصحك بـ <b>{venues[0]?.name}</b> النهاردة الساعة 8 مساءً بسعر مخفّض.
            </p>
          </div>
          <Link
            to={`/app/venue/${venues[0]?.id}`}
            className="rounded-[var(--radius)] bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            احجز التوصية
          </Link>
        </Card>

        <Row
          icon={MapPin}
          title="قريب مني"
          action={
            <Link to="/app/search" className="flex items-center gap-1 text-sm font-semibold text-primary">
              الكل <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </Row>

        <Row icon={TrendingUp} title="الأكثر حجزًا">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </Row>

        {/* offers */}
        <Row icon={Tag} title="عروض وخصومات">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "خصم نهاية الأسبوع", off: "15%", desc: "على كل حجوزات الجمعة والسبت" },
              { title: "الحجز الجماعي", off: "20%", desc: "احجز مع 3 أصحاب أو أكتر" },
              { title: "ساعات الصباح", off: "25%", desc: "احجز قبل 12 ظهرًا" },
            ].map((o) => (
              <Card key={o.title} className="relative overflow-hidden p-5">
                <div className="text-3xl font-black text-accent num">{o.off}</div>
                <div className="mt-2 font-bold">{o.title}</div>
                <p className="text-sm text-muted">{o.desc}</p>
              </Card>
            ))}
          </div>
        </Row>

        {/* rebook */}
        {rebook.length > 0 && (
          <Row icon={RotateCcw} title="احجز تاني">
            <div className="grid gap-4 md:grid-cols-2">
              {rebook.map((b) => (
                <Card key={b.id} className="flex items-center justify-between p-5">
                  <div>
                    <div className="font-bold">{b.venueName}</div>
                    <div className="text-sm text-muted">
                      {b.courtName} • {formatEGP(b.price)}
                    </div>
                  </div>
                  <Link
                    to={`/app/venue/${b.venueId}`}
                    className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    احجز تاني
                  </Link>
                </Card>
              ))}
            </div>
          </Row>
        )}

        {/* find players banner */}
        <Card className="flex flex-col items-center gap-4 bg-primary p-8 text-center text-primary-foreground md:flex-row md:text-right">
          <Users className="h-10 w-10 shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl font-black">ملكش فريق؟ دوّر على لاعبين</h3>
            <p className="text-primary-foreground/80">انضم لماتشات مفتوحة أو اعمل ماتش بنفسك وخلي الناس تنضم ليك</p>
          </div>
          <Link
            to="/app/find-players"
            className="rounded-[var(--radius)] bg-primary-foreground px-5 py-2.5 font-semibold text-primary"
          >
            اكتشف الماتشات
          </Link>
        </Card>
      </div>
    </div>
  )
}
