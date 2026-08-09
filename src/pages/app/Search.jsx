import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Search as SearchIcon, Sparkles, SlidersHorizontal, MapPin, X } from "lucide-react"
import { Button, Card, Input, Select, Empty } from "../../components/ui"
import VenueCard from "../../components/common/VenueCard"
import { VENUES } from "../../services/mockData"
import { ALEX_AREAS, AMENITIES, SPORTS } from "../../constants"
import { cn } from "../../utils"

export default function Search() {
  const selectedSport = useSelector((s) => s.user.selectedSport)
  const [query, setQuery] = useState("")
  const [smart, setSmart] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    sport: selectedSport || "",
    area: "",
    maxPrice: 600,
    minRating: 0,
    amenities: [],
  })

  function toggleAmenity(key) {
    setFilters((f) => ({
      ...f,
      amenities: f.amenities.includes(key)
        ? f.amenities.filter((a) => a !== key)
        : [...f.amenities, key],
    }))
  }

  const results = useMemo(() => {
    // smart natural-language search overrides other filters
    if (smart && query.trim()) {
      const q = query.toLowerCase()
      return VENUES.filter((v) => {
        const priceMatch = /(\d+)/.exec(q)
        const underPrice = priceMatch ? v.priceFrom <= Number(priceMatch[1]) : true
        const sportMatch = q.includes("بادل") ? v.sport === "padel" : q.includes("كورة") || q.includes("قدم") ? v.sport === "football" : true
        return underPrice && sportMatch
      })
    }
    return VENUES.filter((v) => {
      if (query && !v.name.includes(query) && !v.area.includes(query)) return false
      if (filters.sport && v.sport !== filters.sport) return false
      if (filters.area && v.area !== filters.area) return false
      if (v.priceFrom > filters.maxPrice) return false
      if (v.rating < filters.minRating) return false
      if (filters.amenities.some((a) => !v.amenities.includes(a))) return false
      return true
    })
  }, [query, smart, filters])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* search bar */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-[var(--radius)] border border-border bg-surface px-4">
            {smart ? <Sparkles className="h-5 w-5 text-accent" /> : <SearchIcon className="h-5 w-5 text-muted" />}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 w-full bg-transparent text-sm outline-none"
              placeholder={smart ? "مثال: بادل الليلة تحت 300 جنيه" : "ابحث بالاسم أو المنطقة..."}
            />
          </div>
          <Button
            variant={smart ? "accent" : "outline"}
            onClick={() => setSmart((v) => !v)}
            className="shrink-0"
          >
            <Sparkles className="h-4 w-4" /> بحث ذكي
          </Button>
          <Button variant="outline" className="shrink-0 lg:hidden" onClick={() => setShowFilters((v) => !v)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {smart && (
          <p className="mt-2 text-xs text-accent">
            البحث الذكي بيفهم لغتك الطبيعية ويتجاهل باقي الفلاتر
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* filters */}
        <aside className={cn("space-y-5", showFilters ? "block" : "hidden lg:block")}>
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">الفلاتر</h3>
              <button
                type="button"
                className="text-xs text-muted"
                onClick={() =>
                  setFilters({ sport: "", area: "", maxPrice: 600, minRating: 0, amenities: [] })
                }
              >
                مسح
              </button>
            </div>

            <label className="mb-1 block text-sm font-semibold">الرياضة</label>
            <Select
              value={filters.sport}
              onChange={(e) => setFilters((f) => ({ ...f, sport: e.target.value }))}
            >
              <option value="">الكل</option>
              {Object.values(SPORTS).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>

            <label className="mb-1 mt-4 block text-sm font-semibold">المنطقة</label>
            <Select
              value={filters.area}
              onChange={(e) => setFilters((f) => ({ ...f, area: e.target.value }))}
            >
              <option value="">كل المناطق</option>
              {ALEX_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </Select>

            <label className="mb-1 mt-4 block text-sm font-semibold">
              أقصى سعر: <span className="num text-primary">{filters.maxPrice} ج.م</span>
            </label>
            <input
              type="range"
              min="200"
              max="600"
              step="50"
              value={filters.maxPrice}
              onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[var(--color-primary)]"
            />

            <label className="mb-1 mt-4 block text-sm font-semibold">أقل تقييم</label>
            <div className="flex gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, minRating: r }))}
                  className={cn(
                    "flex-1 rounded-lg border py-1.5 text-xs font-semibold transition",
                    filters.minRating === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border",
                  )}
                >
                  {r === 0 ? "الكل" : `+${r}`}
                </button>
              ))}
            </div>

            <label className="mb-2 mt-4 block text-sm font-semibold">الخدمات</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => toggleAmenity(a.key)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    filters.amenities.includes(a.key)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted",
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Card>
        </aside>

        {/* results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted">
              <span className="num font-bold text-foreground">{results.length}</span> ملعب متاح
            </p>
          </div>

          {/* map placeholder */}
          <Card className="map-grid mb-6 flex h-40 items-center justify-center bg-surface-muted/40">
            <span className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-5 w-5" /> عرض الملاعب على الخريطة
            </span>
          </Card>

          {results.length === 0 ? (
            <Empty icon={X} title="مفيش نتائج" subtitle="جرّب تغيّر الفلاتر أو كلمة البحث" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
