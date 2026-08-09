import { Star } from "lucide-react"
import { cn } from "../../utils"

export default function StarRating({ value = 0, size = 16, onChange, className = "" }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)}>
      {stars.map((s) => {
        const filled = value >= s
        const Wrapper = onChange ? "button" : "span"
        return (
          <Wrapper
            key={s}
            type={onChange ? "button" : undefined}
            onClick={onChange ? () => onChange(s) : undefined}
            className={onChange ? "transition hover:scale-110" : ""}
            aria-label={onChange ? `${s} نجوم` : undefined}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled ? "fill-warning text-warning" : "text-border"}
            />
          </Wrapper>
        )
      })}
    </div>
  )
}

export { StarRating }
