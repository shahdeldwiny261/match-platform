import { useSelector, useDispatch } from "react-redux"
import { Sparkles, Search, TrendingUp, MessageSquareText } from "lucide-react"
import { SectionTitle } from "../../../components/dashboard/widgets"
import { Card, Badge } from "../../../components/ui"
import { updateSettings } from "../../../redux/adminReducer"

const INSIGHTS = [
  { title: "توقع الطلب", desc: "من المتوقع ارتفاع الحجوزات بنسبة 18% نهاية الأسبوع في ملاعب كرة القدم.", icon: TrendingUp },
  { title: "توصية تسعير", desc: "رفع سعر وقت الذروة 10% لن يؤثر على الإشغال بناءً على التحليل.", icon: Sparkles },
  { title: "البحث الذكي", desc: "أكثر عمليات البحث: «ملعب بادل قريب مساءً» و «كرة قدم بعد 8م».", icon: Search },
]

export function AdminAI() {
  const dispatch = useDispatch()
  const settings = useSelector((s) => s.admin.settings)

  return (
    <div className="space-y-6">
      <SectionTitle>مركز الذكاء الاصطناعي</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2">
        <Toggle
          label="المساعد الذكي للاعبين"
          desc="اقتراحات ملاعب وأوقات مخصصة"
          on={settings.aiEnabled}
          onToggle={() => dispatch(updateSettings({ aiEnabled: !settings.aiEnabled }))}
        />
        <Toggle
          label="البحث الذكي (NLP)"
          desc="فهم استعلامات البحث باللغة الطبيعية"
          on={settings.smartSearch}
          onToggle={() => dispatch(updateSettings({ smartSearch: !settings.smartSearch }))}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {INSIGHTS.map((it) => {
          const Icon = it.icon
          return (
            <Card key={it.title} className="p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-bold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
              <Badge className="mt-3">توصية آلية</Badge>
            </Card>
          )
        })}
      </div>

      <Card className="p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold">
          <MessageSquareText className="h-5 w-5 text-primary" /> استعلام سريع للمساعد
        </h3>
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="مثال: ما هي أفضل أوقات الحجز هذا الأسبوع؟" />
          <button className="rounded-xl bg-primary px-5 font-medium text-primary-foreground">اسأل</button>
        </div>
        <p className="mt-3 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
          بناءً على البيانات، أفضل أوقات الحجز هي المساء من 6 إلى 10 مساءً خلال عطلة نهاية الأسبوع، مع أعلى طلب على ملاعب
          كرة القدم الخماسية.
        </p>
      </Card>
    </div>
  )
}

function Toggle({ label, desc, on, onToggle }) {
  return (
    <Card className="flex items-center justify-between p-5">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition ${on ? "bg-primary" : "bg-muted"}`}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-0.5" : "left-[22px]"}`}
        />
      </button>
    </Card>
  )
}
