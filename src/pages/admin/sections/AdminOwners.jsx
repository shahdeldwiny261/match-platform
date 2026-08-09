import { useSelector, useDispatch } from "react-redux"
import { BadgeCheck, Clock } from "lucide-react"
import { SectionTitle, DataTable } from "../../../components/dashboard/widgets"
import { Button, Badge } from "../../../components/ui"
import { verifyOwner } from "../../../redux/adminReducer"
import { formatCurrency } from "../../../utils"

export function AdminOwners() {
  const dispatch = useDispatch()
  const owners = useSelector((s) => s.admin.owners)

  return (
    <div className="space-y-4">
      <SectionTitle>أصحاب الملاعب وطلبات التوثيق</SectionTitle>
      <DataTable
        columns={["المالك", "عدد الملاعب", "الإيراد", "الحالة", "إجراء"]}
        rows={owners}
        renderRow={(o) => (
          <tr key={o.id} className="hover:bg-muted/40">
            <td className="px-4 py-3 font-medium">{o.name}</td>
            <td className="px-4 py-3">{o.venues}</td>
            <td className="px-4 py-3 font-semibold text-primary">{formatCurrency(o.revenue)}</td>
            <td className="px-4 py-3">
              <Badge tone={o.status === "verified" ? "success" : "warning"}>
                {o.status === "verified" ? (
                  <span className="inline-flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5" /> موثق
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> قيد المراجعة
                  </span>
                )}
              </Badge>
            </td>
            <td className="px-4 py-3">
              {o.status === "pending" ? (
                <Button size="sm" onClick={() => dispatch(verifyOwner(o.id))}>
                  <BadgeCheck className="h-3.5 w-3.5" /> توثيق
                </Button>
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
