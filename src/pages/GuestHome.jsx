import { Link, useNavigate } from "react-router"
import { motion } from "framer-motion"
import { Search, MapPin, Star, ArrowLeft, ShieldCheck, Zap, Users, Trophy } from "lucide-react"
import { Button, Card } from "../components/ui"
import VenueCard from "../components/common/VenueCard"
import { VENUES } from "../services/mockData"
import { SPORTS } from "../constants"

function GuestNav() {
  const navigate = useNavigate()
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground font-black text-primary">
            M
          </div>
          <span className="text-xl font-black text-primary-foreground">ماتش</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-primary-foreground hover:bg-white/10" onClick={() => navigate("/owner/start")}>
            سجّل ملعبك
          </Button>
          <Button variant="accent" onClick={() => navigate("/login")}>
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </header>
  )
}

export default function GuestHome() {
  const navigate = useNavigate()
  const featured = VENUES.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <GuestNav />

      {/* HERO */}
      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <img src="/images/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/80 to-primary/40" />
        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-semibold text-primary-foreground backdrop-blur">
              <MapPin className="h-4 w-4" /> الإسكندرية، مصر
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-primary-foreground text-balance md:text-6xl">
              احجز ملعبك في ثوانٍ، والعب مع أصحابك
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              أكبر شبكة ملاعب كرة قدم خماسي وبادل في اسكندرية. اتصفح، قارن الأسعار، واحجز أونلاين بكل سهولة.
            </p>

            {/* search bar */}
            <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-surface p-2 shadow-xl sm:flex-row">
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-5 w-5 text-muted" />
                <input
                  className="h-12 w-full bg-transparent text-sm outline-none"
                  placeholder="ابحث عن ملعب أو منطقة..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) navigate("/app/select-sport")
                  }}
                />
              </div>
              <Button size="lg" onClick={() => navigate("/app/select-sport")}>
                ابدأ الحجز <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-primary-foreground/90">
              {[
                { icon: Zap, text: "حجز فوري" },
                { icon: ShieldCheck, text: "دفع آمن" },
                { icon: Users, text: "قسّم الحساب" },
              ].map((f) => (
                <span key={f.text} className="flex items-center gap-2 text-sm font-medium">
                  <f.icon className="h-4.5 w-4.5" /> {f.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPORTS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black text-balance">اختر رياضتك</h2>
          <p className="mt-2 text-muted">لكل رياضة عالمها الخاص</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.values(SPORTS).map((sport, i) => (
            <motion.button
              key={sport.id}
              type="button"
              onClick={() => navigate(`/app/sport/${sport.id}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative h-64 overflow-hidden rounded-2xl text-right"
            >
              <img
                src={sport.id === "football" ? "/images/venue-football-1.png" : "/images/venue-padel-1.png"}
                alt={sport.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${sport.theme.dark}f0, ${sport.theme.primary}40)` }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-black">{sport.name}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold opacity-90">
                  اكتشف الملاعب <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">ملاعب مميزة</h2>
          <Link to="/app/select-sport" className="flex items-center gap-1 text-sm font-semibold text-primary">
            عرض الكل <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-10 text-center text-3xl font-black">إزاي تحجز؟</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: Search, title: "اختر الملعب", desc: "اتصفح وقارن الملاعب القريبة منك" },
              { icon: MapPin, title: "اختر الميعاد", desc: "شوف الأوقات المتاحة بالأسعار" },
              { icon: ShieldCheck, title: "ادفع أونلاين", desc: "دفع كامل أو عربون بأمان" },
              { icon: Trophy, title: "العب واكسب نقاط", desc: "كل حجز يرفع مستواك ويجيب مكافآت" },
            ].map((s, i) => (
              <Card key={s.title} className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mb-1 text-sm font-bold text-accent num">0{i + 1}</div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA owners */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Card className="overflow-hidden bg-primary p-10 text-center text-primary-foreground">
          <h2 className="text-3xl font-black text-balance">عندك ملعب؟ ضاعف حجوزاتك مع ماتش</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            سجّل ملعبك في دقائق وابدأ استقبال الحجوزات أونلاين، مع لوحة تحكم كاملة وتحليلات ذكية.
          </p>
          <Button variant="accent" size="lg" className="mt-6" onClick={() => navigate("/owner/start")}>
            سجّل ملعبك الآن
          </Button>
        </Card>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © 2026 ماتش — الإسكندرية، مصر
      </footer>
    </div>
  )
}
