import { useSelector } from "react-redux"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { SectionTitle } from "../../../components/dashboard/widgets"
import { Card } from "../../../components/ui"
import { formatCurrency } from "../../../utils"

const PIE = [
  { name: "كرة قدم", value: 62 },
  { name: "بادل", value: 38 },
]
const COLORS = ["var(--color-primary)", "var(--color-accent)"]

const PEAK = [
  { time: "6ص", v: 10 },
  { time: "9ص", v: 22 },
  { time: "12م", v: 35 },
  { time: "3م", v: 48 },
  { time: "6م", v: 82 },
  { time: "9م", v: 95 },
  { time: "12ص", v: 40 },
]

export function OwnerAnalytics() {
  const stats = useSelector((s) => s.owner.stats)

  return (
    <div className="space-y-6">
      <SectionTitle>التحليلات التفصيلية</SectionTitle>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-bold">الإيراد مقابل الهدف</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={stats.revenueMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} reversed />
              <YAxis tick={{ fontSize: 11 }} orientation="right" width={50} />
              <Tooltip
                contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }}
                formatter={(v) => formatCurrency(v)}
              />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-bold">توزيع الرياضات</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={PIE} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {PIE.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }}
                formatter={(v) => `${v}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 font-bold">أوقات الذروة</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PEAK}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} reversed />
              <YAxis tick={{ fontSize: 11 }} orientation="right" width={30} />
              <Tooltip
                contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }}
                formatter={(v) => [`${v}%`, "الإشغال"]}
              />
              <Bar dataKey="v" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
