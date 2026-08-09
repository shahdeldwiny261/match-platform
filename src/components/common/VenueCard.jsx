import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { MapPin, Star, Heart, Navigation } from "lucide-react"
import { motion } from "framer-motion"
import { Card, Badge } from "../ui"
import { toggleFavorite } from "../../redux/userReducer"
import { formatEGP, cn } from "../../utils"
import { SPORTS } from "../../constants"

export default function VenueCard({ venue }) {
  const dispatch = useDispatch()
  const favorites = useSelector((s) => s.user.favorites)
  const isFav = favorites.includes(venue.id)
  const sport = SPORTS[venue.sport]

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="group overflow-hidden">
        <Link to={`/app/venue/${venue.id}`} className="block">
          <div className="relative h-44 overflow-hidden">
            <img
              src={venue.image || "/placeholder.svg"}
              alt={venue.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <Badge
              className="absolute right-3 top-3 text-white"
              style={{ backgroundColor: sport.theme.primary }}
            >
              {sport.name}
            </Badge>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                dispatch(toggleFavorite(venue.id))
              }}
              className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 backdrop-blur transition hover:scale-110"
              aria-label="أضف للمفضلة"
            >
              <Heart className={cn("h-4.5 w-4.5", isFav ? "fill-accent text-accent" : "text-muted")} />
            </button>
          </div>
        </Link>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-foreground">{venue.name}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="num font-semibold">{venue.rating}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {venue.area}
            </span>
            <span className="flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5" /> {venue.distanceKm} كم
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div>
              <span className="text-xs text-muted">يبدأ من</span>
              <div className="num font-bold text-primary">{formatEGP(venue.priceFrom)}</div>
            </div>
            <Link
              to={`/app/venue/${venue.id}`}
              className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              احجز الآن
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
