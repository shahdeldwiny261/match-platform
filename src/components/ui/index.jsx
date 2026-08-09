import { Loader2 } from "lucide-react"
import { cn } from "../../utils"

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  as: Comp = "button",
  loading = false,
  disabled = false,
  children,
  ...props
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    accent: "bg-accent text-accent-foreground hover:brightness-95",
    outline: "border border-border bg-surface text-foreground hover:bg-surface-muted",
    ghost: "text-foreground hover:bg-surface-muted",
    danger: "bg-danger text-white hover:brightness-95",
  }
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-13 px-7 text-base",
    icon: "h-10 w-10",
  }
  return (
    <Comp
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Comp>
  )
}

export function Card({ className = "", ...props }) {
  return (
    <div
      className={cn("rounded-[var(--radius)] border border-border bg-surface shadow-sm", className)}
      {...props}
    />
  )
}

export function Badge({ children, tone, className = "" }) {
  const tones = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-danger/12 text-danger",
    accent: "bg-accent/12 text-accent",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        tone ? tones[tone] || tones.default : className ? "" : tones.default,
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-[var(--radius)] border border-border bg-surface px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20",
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-[var(--radius)] border border-border bg-surface p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20",
        className,
      )}
      {...props}
    />
  )
}

export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-[var(--radius)] border border-border bg-surface px-4 text-sm outline-none transition focus:border-primary",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-foreground text-balance md:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Stat({ icon: Icon, label, value, tone = "primary" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  }
  return (
    <Card className="flex items-center gap-4 p-5">
      {Icon && (
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", tones[tone])}>
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div>
        <div className="num text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted">{label}</div>
      </div>
    </Card>
  )
}

export function Empty({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
      {Icon && <Icon className="mb-3 h-10 w-10 text-muted" />}
      <p className="font-semibold text-foreground">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  )
}
