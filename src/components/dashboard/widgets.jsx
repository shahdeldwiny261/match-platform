import { motion } from "framer-motion"
import { Card } from "../ui"

export function StatCard({ icon: Icon, label, value, sub, trend, i = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
          </div>
          {Icon && (
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
          )}
        </div>
        {trend != null && (
          <p className={`mt-3 text-xs font-medium ${trend >= 0 ? "text-primary" : "text-destructive"}`}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% عن الشهر الماضي
          </p>
        )}
      </Card>
    </motion.div>
  )
}

export function SectionTitle({ children, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold">{children}</h2>
      {action}
    </div>
  )
}

export function DataTable({ columns, rows, renderRow }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{rows.map(renderRow)}</tbody>
        </table>
      </div>
    </Card>
  )
}
