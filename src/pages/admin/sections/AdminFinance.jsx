import { useSelector, useDispatch } from "react-redux"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Percent, Wallet2, Receipt } from "lucide-react"
import { StatCard, SectionTitle } from "../../../components/dashboard/widgets"
import { Card } from "../../../components/ui"
import { updateSettings } from "../../../redux/adminReducer"
import { formatCurrency } from "../../../utils"

export function AdminFinance() {
  const dispatch = useDispatch()
  const settings = useSelector((s) => s.admin.settings)
  const growth = useSelector((s) => s.admin.stats.growth)
  const totalRevenue = useSelector((s) => s.admin.stats.totals.revenue)

  const commissionRevenue = Math.round((totalRevenue * settings.commission) / 100)
  const commissionData = growth.map((g) => ({
    month: g.month,
    commission: Math.round(g.bookings * 450 * (settings.commission / 100)),
  }))

  return (
    <div className="space-y-6">
      <SectionTitle>المالية والعمولات</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet2} label="حجم التداول" value={formatCurrency(totalRevenue)} i={0} />
        <StatCard icon={Percent} label="عمولة المنصة" value={`${settings.commission}%`} i={1} />
        <StatCard icon={Receipt} label="إيراد العمولات" value={formatCurrency(commissionRevenue)} i={2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="mb-4 font-bold">ضبط النسب</h3>
          <Slider
            label="نسبة العمولة"
            value={settings.commission}
            onChange={(v) => dispatch(updateSettings({ commission: v }))}
          />
          <Slider
            label="رسوم الخدمة"
            value={settings.serviceFee}
            onChange={(v) => dispatch(updateSettings({ serviceFee: v }))}
            max={20}
          />
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 font-bold">إيراد العمولات الشهري</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={commissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} reversed />
              <YAxis tick={{ fontSize: 11 }} orientation="right" width={50} />
              <Tooltip
                contentStyle={{ direction: "rtl", borderRadius: 12, border: "1px solid var(--color-border)" }}
                formatter={(v) => [formatCurrency(v), "العمولة"]}
              />
              <Bar dataKey="commission" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

function Slider({ label, value, onChange, max = 30 }) {
  return (
    <div className="mb-5">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-bold text-primary">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-primary)]"
      />
    </div>
  )
}
