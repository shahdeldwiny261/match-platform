import { useSelector } from "react-redux"
import { SectionTitle, DataTable, StatCard } from "../../../components/dashboard/widgets"
import { Badge } from "../../../components/ui"
import { CalendarRange, CheckCircle2, XCircle } from "lucide-react"
import { formatCurrency } from "../../../utils"

const TONE = { confirmed: "success", pending: "warning", cancelled: "danger" }
const LABEL = { confirmed: "مؤكد", pending: "قيد الانتظار", cancelled: "ملغي" }

export function AdminBookings() {
  const bookings = useSelector((s) => s.owner.bookings)
  const confirmed = bookings.filter((b) => b.status === "confirmed").length
  const cancelled = bookings.filter((b) => b.status === "cancelled").length

  return (
    <div className="space-y-4">
      <SectionTitle>مراقبة الحجوزات على المنصة</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={CalendarRange} label="إجمالي الحجوزات" value={bookings.length} i={0} />
        <StatCard icon={CheckCircle2} label="مؤكدة" value={confirmed} i={1} />
        <StatCard icon={XCircle} label="ملغاة" value={cancelled} i={2} />
      </div>
      <DataTable
        columns={["#", "الملعب", "التاريخ", "الوقت", "المبلغ", "الحالة"]}
        rows={bookings}
        renderRow={(b) => (
          <tr key={b.id} className="hover:bg-muted/40">
            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
            <td className="px-4 py-3 font-medium">{b.venueName}</td>
            <td className="px-4 py-3">{b.date}</td>
            <td className="px-4 py-3">{b.start}</td>
            <td className="px-4 py-3 font-semibold text-primary">{formatCurrency(b.price)}</td>
            <td className="px-4 py-3">
              <Badge tone={TONE[b.status]}>{LABEL[b.status]}</Badge>
            </td>
          </tr>
        )}
      />
    </div>
  )
}
