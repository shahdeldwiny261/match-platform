import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Check, X } from "lucide-react"
import { SectionTitle, DataTable } from "../../../components/dashboard/widgets"
import { Button, Badge } from "../../../components/ui"
import { confirmOwnerBooking, cancelOwnerBooking } from "../../../redux/ownerReducer"
import { formatCurrency } from "../../../utils"

const FILTERS = [
  { id: "all", label: "الكل" },
  { id: "confirmed", label: "مؤكد" },
  { id: "pending", label: "قيد الانتظار" },
  { id: "cancelled", label: "ملغي" },
]

const TONE = { confirmed: "success", pending: "warning", cancelled: "danger" }
const LABEL = { confirmed: "مؤكد", pending: "قيد الانتظار", cancelled: "ملغي" }

export function OwnerBookings() {
  const dispatch = useDispatch()
  const bookings = useSelector((s) => s.owner.bookings)
  const [filter, setFilter] = useState("all")

  const rows = bookings.filter((b) => filter === "all" || b.status === filter)

  return (
    <div className="space-y-4">
      <SectionTitle
        action={
          <div className="flex gap-1 rounded-xl bg-muted p-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  filter === f.id ? "bg-card shadow-sm" : "text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        إدارة الحجوزات
      </SectionTitle>

      <DataTable
        columns={["اللاعب", "الملعب", "التاريخ", "الوقت", "المبلغ", "الحالة", "إجراء"]}
        rows={rows}
        renderRow={(b) => (
          <tr key={b.id} className="hover:bg-muted/40">
            <td className="px-4 py-3 font-medium">{b.customer || "لاعب"}</td>
            <td className="px-4 py-3">{b.courtName}</td>
            <td className="px-4 py-3">{b.date}</td>
            <td className="px-4 py-3">{b.start}</td>
            <td className="px-4 py-3 font-semibold text-primary">{formatCurrency(b.price)}</td>
            <td className="px-4 py-3">
              <Badge tone={TONE[b.status]}>{LABEL[b.status]}</Badge>
            </td>
            <td className="px-4 py-3">
              {b.status === "pending" ? (
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => dispatch(confirmOwnerBooking(b.id))}>
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => dispatch(cancelOwnerBooking(b.id))}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </td>
          </tr>
        )}
      />
    </div>
  )
}
