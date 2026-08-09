import { useSelector } from "react-redux"
import { ShieldAlert } from "lucide-react"
import { SectionTitle } from "../../../components/dashboard/widgets"
import { Card } from "../../../components/ui"

export function AdminAudit() {
  const logs = useSelector((s) => s.admin.auditLogs)

  return (
    <div className="space-y-4">
      <SectionTitle>سجل نشاط الإدارة</SectionTitle>
      <Card className="p-0">
        <ul className="divide-y divide-border">
          {logs.map((l) => (
            <li key={l.id} className="flex items-start gap-3 p-4">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{l.actor}</span> — {l.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {l.target} · {l.ts}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
