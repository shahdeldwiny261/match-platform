import { useMemo } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { Heart } from "lucide-react"
import VenueCard from "../../components/common/VenueCard"
import { Button, Card } from "../../components/ui"

export default function Favorites() {
  const navigate = useNavigate()
  const venues = useSelector((s) => s.booking.venues)
  const favorites = useSelector((s) => s.user.favorites)

  const favVenues = useMemo(() => venues.filter((v) => favorites.includes(v.id)), [venues, favorites])

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <Heart className="h-6 w-6 text-accent" /> المفضلة
      </h1>
      <p className="text-sm text-muted-foreground">الملاعب التي أضفتها لمفضلتك</p>

      {favVenues.length === 0 ? (
        <Card className="mt-6 p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-muted-foreground">لم تضف أي ملعب للمفضلة بعد</p>
          <Button className="mt-4" onClick={() => navigate("/app")}>
            استكشف الملاعب
          </Button>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favVenues.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      )}
    </div>
  )
}
