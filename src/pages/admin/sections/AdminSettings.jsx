import { SectionTitle } from "../../../components/dashboard/widgets"
import { Card, Button } from "../../../components/ui"
import { Globe, Bell, CreditCard, Shield, Palette } from "lucide-react"

const GROUPS = [
  {
    title: "عام",
    items: [
      { icon: Globe, label: "اسم المنصة", value: "ماتش" },
      { icon: Palette, label: "الوضع الافتراضي", value: "فاتح / داكن" },
    ],
  },
  {
    title: "الإشعارات",
    items: [
      { icon: Bell, label: "إشعارات الحجوزات", value: "مفعّل" },
      { icon: Bell, label: "تنبيهات المدفوعات", value: "مفعّل" },
    ],
  },
  {
    title: "المدفوعات والأمان",
    items: [
      { icon: CreditCard, label: "بوابات الدفع", value: "3 مفعّلة" },
      { icon: Shield, label: "التحقق بخطوتين للإدارة", value: "مطلوب" },
    ],
  },
]

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <SectionTitle action={<Button size="sm">حفظ التغييرات</Button>}>إعدادات المنصة</SectionTitle>

      <div className="grid gap-6 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <Card key={g.title} className="p-5">
            <h3 className="mb-3 font-bold">{g.title}</h3>
            <div className="space-y-3">
              {g.items.map((it) => {
                const Icon = it.icon
                return (
                  <div key={it.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {it.label}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{it.value}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
