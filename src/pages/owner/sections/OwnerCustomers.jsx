import { useSelector } from "react-redux"
import { Star } from "lucide-react"
import { SectionTitle, DataTable } from "../../../components/dashboard/widgets"
import { formatCurrency } from "../../../utils"

export function OwnerCustomers() {
  const customers = useSelector((s) => s.owner.customers)

  return (
    <div className="space-y-4">
      <SectionTitle>قاعدة العملاء</SectionTitle>
      <DataTable
        columns={["العميل", "عدد الحجوزات", "آخر زيارة", "التقييم", "إجمالي الإنفاق"]}
        rows={customers}
        renderRow={(c) => (
          <tr key={c.id} className="hover:bg-muted/40">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {c.name[0]}
                </span>
                <span className="font-medium">{c.name}</span>
              </div>
            </td>
            <td className="px-4 py-3">{c.bookings}</td>
            <td className="px-4 py-3 text-muted-foreground">{c.lastVisit}</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {c.rating}
              </span>
            </td>
            <td className="px-4 py-3 font-semibold text-primary">{formatCurrency(c.spent)}</td>
          </tr>
        )}
      />
    </div>
  )
}
