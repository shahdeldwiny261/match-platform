import { useSelector } from "react-redux"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"
import { Wallet, CalendarCheck, TrendingUp, Percent } from "lucide-react"
import { StatCard, SectionTitle } from "../../../components/dashboard/widgets"
import { Card, Badge } from "../../../components/ui"
import { formatCurrency } from "../../../utils"

export function OwnerOverview() {
  const stats = useSelector((s) => s.owner.stats)
  const bookings = useSelector((s) => s.owner.bookings)
  const upcoming = bookings.filter((b) => b.status === "confirmed").slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Wallet} label="الرصيد الحالي" value={formatCurrency(stats.balance)} trend={12} i={0} />
        <StatCard icon={TrendingUp} label="إيراد يوليو" value={formatCurrency(71000)} trend={13} i={1} />
        <StatCard icon={CalendarCheck} label="حجوزات اليوم" value={stats.bookingsToday} sub="حجز نشط" i={2} />
        <StatCard icon={Percent} label="نسبة الإشغال" value={`${stats.avgOccupancy}%`} trend={4} i={3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle>الإيرادات الشهرية</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={stats.revenueMonthly}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} reversed />
              <YAxis tick={{ fontSize: 12 }} orientation="right" width={50} />
              <Tooltip
                contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }}
                formatter={(v) => [formatCurrency(v), "الإيراد"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <SectionTitle>الإشغال الأسبوعي</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.occupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} reversed />
              <YAxis tick={{ fontSize: 12 }} orientation="right" width={30} />
              <Tooltip
                contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }}
                formatter={(v) => [`${v}%`, "الإشغال"]}
              />
              <Bar dataKey="rate" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle>الحجوزات القادمة</SectionTitle>
        <div className="divide-y divide-border">
          {upcoming.map((b) => (
            <div key={b.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{b.venueName}</p>
                <p className="text-xs text-muted-foreground">
                  {b.courtName} · {b.date} · {b.start}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-primary">{formatCurrency(b.price)}</span>
                <Badge tone="success">مؤكد</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
