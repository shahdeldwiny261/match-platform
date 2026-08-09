import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Wallet, ArrowDownToLine, Clock } from "lucide-react"
import { StatCard, SectionTitle, DataTable } from "../../../components/dashboard/widgets"
import { Card, Button, Badge } from "../../../components/ui"
import { requestWithdraw } from "../../../redux/ownerReducer"
import { formatCurrency } from "../../../utils"

const PAYOUTS = [
  { id: "p1", date: "2026-07-01", amount: 63000, status: "completed" },
  { id: "p2", date: "2026-06-01", amount: 58000, status: "completed" },
  { id: "p3", date: "2026-05-01", amount: 47000, status: "completed" },
]

export function OwnerEarnings() {
  const dispatch = useDispatch()
  const stats = useSelector((s) => s.owner.stats)
  const [amount, setAmount] = useState("")

  const withdraw = () => {
    const val = Number(amount)
    if (val > 0 && val <= stats.balance) {
      dispatch(requestWithdraw(val))
      setAmount("")
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle>الأرباح والمدفوعات</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet} label="الرصيد المتاح" value={formatCurrency(stats.balance)} i={0} />
        <StatCard icon={Clock} label="قيد المعالجة" value={formatCurrency(stats.pendingWithdraw)} i={1} />
        <StatCard icon={ArrowDownToLine} label="إجمالي المسحوبات" value={formatCurrency(168000)} i={2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="mb-3 font-bold">طلب سحب</h3>
          <label className="mb-1 block text-sm font-medium">المبلغ</label>
          <input
            type="number"
            className="input"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">الحد الأقصى: {formatCurrency(stats.balance)}</p>
          <Button className="mt-3 w-full" onClick={withdraw} disabled={!amount || Number(amount) > stats.balance}>
            <ArrowDownToLine className="h-4 w-4" /> اطلب السحب
          </Button>
        </Card>

        <div className="lg:col-span-2">
          <h3 className="mb-3 font-bold">سجل المدفوعات</h3>
          <DataTable
            columns={["التاريخ", "المبلغ", "الحالة"]}
            rows={PAYOUTS}
            renderRow={(p) => (
              <tr key={p.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">{p.date}</td>
                <td className="px-4 py-3 font-semibold text-primary">{formatCurrency(p.amount)}</td>
                <td className="px-4 py-3">
                  <Badge tone="success">مكتمل</Badge>
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  )
}
