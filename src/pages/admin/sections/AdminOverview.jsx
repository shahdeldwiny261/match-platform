import { useSelector } from "react-redux"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { Users, Store, MapPin, CalendarRange, Wallet2 } from "lucide-react"
import { StatCard, SectionTitle } from "../../../components/dashboard/widgets"
import { Card } from "../../../components/ui"
import { formatCurrency, formatNumber } from "../../../utils"

export function AdminOverview() {
  const stats = useSelector((s) => s.admin.stats)
  const t = stats.totals

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={Users} label="المستخدمون" value={formatNumber(t.users)} trend={26} i={0} />
        <StatCard icon={Store} label="أصحاب الملاعب" value={t.owners} trend={8} i={1} />
        <StatCard icon={MapPin} label="الملاعب" value={t.venues} trend={11} i={2} />
        <StatCard icon={CalendarRange} label="الحجوزات" value={formatNumber(t.bookings)} trend={31} i={3} />
        <StatCard icon={Wallet2} label="حجم التداول" value={formatCurrency(t.revenue)} trend={22} i={4} />
      </div>

      <Card className="p-5">
        <SectionTitle>نمو المنصة</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stats.growth}>
            <defs>
              <linearGradient id="u" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="bk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} reversed />
            <YAxis tick={{ fontSize: 12 }} orientation="right" width={40} />
            <Tooltip contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }} />
            <Legend />
            <Area type="monotone" name="مستخدمون" dataKey="users" stroke="var(--color-accent)" strokeWidth={2} fill="url(#u)" />
            <Area type="monotone" name="حجوزات" dataKey="bookings" stroke="var(--color-primary)" strokeWidth={2} fill="url(#bk)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
