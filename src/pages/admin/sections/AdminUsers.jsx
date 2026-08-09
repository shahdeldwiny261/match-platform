import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Search, Ban, CheckCircle2 } from "lucide-react"
import { SectionTitle, DataTable } from "../../../components/dashboard/widgets"
import { Button, Badge } from "../../../components/ui"
import { toggleUserStatus } from "../../../redux/adminReducer"

export function AdminUsers() {
  const dispatch = useDispatch()
  const users = useSelector((s) => s.admin.users)
  const [q, setQ] = useState("")

  const rows = users.filter((u) => u.name.includes(q) || u.phone.includes(q))

  return (
    <div className="space-y-4">
      <SectionTitle
        action={
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="input pr-9 sm:w-64"
              placeholder="ابحث بالاسم أو الجوال"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        }
      >
        إدارة المستخدمين
      </SectionTitle>

      <DataTable
        columns={["المستخدم", "الجوال", "الحجوزات", "تاريخ الانضمام", "الحالة", "إجراء"]}
        rows={rows}
        renderRow={(u) => (
          <tr key={u.id} className="hover:bg-muted/40">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 font-bold text-accent">
                  {u.name[0]}
                </span>
                <span className="font-medium">{u.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-muted-foreground">{u.phone}</td>
            <td className="px-4 py-3">{u.bookings}</td>
            <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
            <td className="px-4 py-3">
              <Badge tone={u.status === "active" ? "success" : "danger"}>
                {u.status === "active" ? "نشط" : "موقوف"}
              </Badge>
            </td>
            <td className="px-4 py-3">
              <Button
                size="sm"
                variant={u.status === "active" ? "danger" : "primary"}
                onClick={() => dispatch(toggleUserStatus(u.id))}
              >
                {u.status === "active" ? (
                  <>
                    <Ban className="h-3.5 w-3.5" /> إيقاف
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" /> تفعيل
                  </>
                )}
              </Button>
            </td>
          </tr>
        )}
      />
    </div>
  )
}
