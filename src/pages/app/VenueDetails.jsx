import { useMemo } from "react"
import { useParams, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Star, ChevronLeft, Check } from "lucide-react"
import { StarRating } from "../../components/common/StarRating"
import { Button, Badge, Card } from "../../components/ui"
import { formatCurrency } from "../../utils"
import { REVIEWS } from "../../services/mockData"

export default function VenueDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const venues = useSelector((s) => s.booking.venues)
  const venue = useMemo(() => venues.find((v) => String(v.id) === String(id)), [venues, id])

  if (!venue) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">لم يتم العثور على الملعب</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          رجوع
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        رجوع
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="relative h-64 w-full sm:h-80">
          <img
            src={venue.image || "/placeholder.svg"}
            alt={venue.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 right-0 p-6 text-right">
            <Badge className="mb-2">{venue.sport === "football" ? "كرة قدم" : "بادل"}</Badge>
            <h1 className="text-3xl font-bold text-white text-balance">{venue.name}</h1>
            <div className="mt-1 flex items-center justify-end gap-2 text-sm text-white/90">
              <MapPin className="h-4 w-4" />
              <span>{venue.area}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <StarRating value={venue.rating} />
              <span className="text-sm text-muted-foreground">
                {venue.rating} ({venue.reviewsCount} تقييم)
              </span>
            </div>

            <p className="mt-4 leading-relaxed text-muted-foreground">{venue.description}</p>

            <h3 className="mt-6 mb-3 text-lg font-bold">المرافق</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {venue.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  {a}
                </div>
              ))}
            </div>

            <h3 className="mt-6 mb-3 text-lg font-bold">الملاعب المتاحة</h3>
            <div className="space-y-2">
              {venue.courts.map((court) => (
                <div
                  key={court.id}
                  className="flex items-center justify-between rounded-xl border border-border p-3"
                >
                  <div>
                    <p className="font-semibold">{court.name}</p>
                    <p className="text-sm text-muted-foreground">{court.size}</p>
                  </div>
                  <span className="font-bold text-primary">{formatCurrency(court.basePrice)}/ساعة</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24 p-5">
              <p className="text-sm text-muted-foreground">يبدأ السعر من</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(venue.priceFrom)}</p>
              <p className="mb-4 text-xs text-muted-foreground">لكل ساعة</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>10 ص - 11 م</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>للتواصل مع الملعب</span>
                </div>
              </div>

              <Button className="mt-5 w-full" onClick={() => navigate(`/app/booking/${venue.id}`)}>
                احجز الآن
              </Button>
            </Card>
          </div>
        </div>
      </motion.div>

      <section className="mt-8">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Star className="h-5 w-5 text-primary" />
          آراء اللاعبين
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {REVIEWS.filter((r) => r.venueId === venue.id).map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.user}</span>
                <StarRating value={r.rating} size={14} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
              <p className="mt-2 text-xs text-muted-foreground">{r.date}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
