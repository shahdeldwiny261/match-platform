import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Check, User, ShieldCheck, Building2, MapPin, ImageIcon, DollarSign, PartyPopper, Clock3, CalendarOff } from "lucide-react"
import { SectionTitle } from "../../../components/dashboard/widgets"
import { Card, Button, Badge } from "../../../components/ui"
import { setSetupStep, updateSetupDraft, publishVenue } from "../../../redux/ownerReducer"
import { setVenueSchedule } from "../../../redux/bookingReducer"

const STEPS = [
  { key: "account", label: "الحساب", icon: User },
  { key: "verification", label: "التوثيق", icon: ShieldCheck },
  { key: "business", label: "بيانات النشاط", icon: Building2 },
  { key: "venue", label: "الملعب", icon: MapPin },
  { key: "images", label: "الصور", icon: ImageIcon },
  { key: "pricing", label: "التسعير", icon: DollarSign },
  { key: "availability", label: "المواعيد", icon: Clock3 },
  { key: "publish", label: "النشر", icon: PartyPopper },
]

const DAY_LABELS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

export function OwnerSetup() {
  const dispatch = useDispatch()
  const step = useSelector((s) => s.owner.setupStep)
  const draft = useSelector((s) => s.owner.setupDraft)

  const update = (section, data) => dispatch(updateSetupDraft({ section, data }))
  const updateAvailabilityDay = (day, data) => {
    const days = { ...draft.availability.days, [day]: { ...draft.availability.days[day], ...data } }
    update("availability", { days })
    dispatch(setVenueSchedule({ venueId: draft.availability.venueId, schedule: { ...days, slotDuration: draft.availability.slotDuration } }))
  }
  const next = () => dispatch(setSetupStep(Math.min(step + 1, STEPS.length - 1)))
  const prev = () => dispatch(setSetupStep(Math.max(step - 1, 0)))

  const current = STEPS[step]

  return (
    <div className="space-y-6">
      <SectionTitle>إعداد الملعب خطوة بخطوة</SectionTitle>

      {/* stepper */}
      <div className="flex items-center overflow-x-auto pb-2">
        {STEPS.map((s, i) => {
          const done = i < step
          const active = i === step
          const Icon = s.icon
          return (
            <div key={s.key} className="flex flex-shrink-0 items-center">
              <button
                onClick={() => dispatch(setSetupStep(i))}
                className="flex flex-col items-center gap-1"
                aria-label={s.label}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </span>
                <span className={`text-xs ${active ? "font-bold text-primary" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && <div className={`mx-2 h-0.5 w-10 ${done ? "bg-primary" : "bg-border"}`} />}
            </div>
          )
        })}
      </div>

      <Card className="p-6">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="mb-4 text-lg font-bold">{current.label}</h3>

          {current.key === "account" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="اسم المالك" value={draft.account.name} onChange={(v) => update("account", { name: v })} />
              <Input label="البريد الإلكتروني" value={draft.account.email} onChange={(v) => update("account", { email: v })} />
              <Input label="رقم الجوال" value={draft.account.phone} onChange={(v) => update("account", { phone: v })} />
            </div>
          )}

          {current.key === "verification" && (
            <div className="space-y-4">
              <Input
                label="رقم السجل التجاري / الرخصة"
                value={draft.verification.license}
                onChange={(v) => update("verification", { license: v })}
              />
              <button
                onClick={() => update("verification", { verified: !draft.verification.verified })}
                className={`flex items-center gap-2 rounded-xl border p-4 ${
                  draft.verification.verified ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <ShieldCheck className={`h-5 w-5 ${draft.verification.verified ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm">رفع مستند التوثيق (محاكاة)</span>
                {draft.verification.verified && <Badge tone="success">تم الرفع</Badge>}
              </button>
            </div>
          )}

          {current.key === "business" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="اسم الشركة" value={draft.business.company} onChange={(v) => update("business", { company: v })} />
              <Input label="الرقم الضريبي" value={draft.business.taxId} onChange={(v) => update("business", { taxId: v })} />
              <Input
                label="حساب استلام الأرباح (IBAN)"
                value={draft.business.payoutAccount}
                onChange={(v) => update("business", { payoutAccount: v })}
              />
            </div>
          )}

          {current.key === "venue" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="اسم الملعب" value={draft.venue.name} onChange={(v) => update("venue", { name: v })} />
              <Input label="العنوان" value={draft.venue.address} onChange={(v) => update("venue", { address: v })} />
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">الموقع على الخريطة</label>
                <div className="flex h-40 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <MapPin className="ml-2 h-6 w-6" /> اختر الموقع (محاكاة الخريطة)
                </div>
              </div>
            </div>
          )}

          {current.key === "images" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground"
                >
                  <ImageIcon className="h-6 w-6" />
                </div>
              ))}
            </div>
          )}

          {current.key === "pricing" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="سعر الساعة العادية"
                value={draft.pricing.hourly}
                onChange={(v) => update("pricing", { hourly: v })}
              />
              <Input
                label="سعر وقت الذروة"
                value={draft.pricing.peak}
                onChange={(v) => update("pricing", { peak: v })}
              />
            </div>
          )}

          {current.key === "availability" && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">الملعب</span>
                  <select className="input" value={draft.availability.venueId} onChange={(e) => update("availability", { venueId: e.target.value })}>
                    <option value="v1">النخبة الرياضي</option>
                    <option value="v2">أرينا الكورنيش</option>
                    <option value="v3">نادي بادل الإسكندرية</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">مدة الحجز</span>
                  <select className="input" value={draft.availability.slotDuration} onChange={(e) => { const value = Number(e.target.value); update("availability", { slotDuration: value }); dispatch(setVenueSchedule({ venueId: draft.availability.venueId, schedule: { ...draft.availability.days, slotDuration: value } })) }}>
                    <option value="30">30 دقيقة</option>
                    <option value="60">ساعة</option>
                  </select>
                </label>
              </div>
              <p className="text-sm text-muted-foreground">افتح أو أغلق كل يوم، فعّل العمل 24 ساعة، أو حدّد ساعات التشغيل بشكل مستقل.</p>
              <div className="space-y-2">
                {DAY_LABELS.map((label, day) => {
                  const schedule = draft.availability.days[day]
                  return (
                    <div key={day} className="grid items-center gap-3 rounded-xl border border-border p-3 sm:grid-cols-[120px_90px_1fr_1fr]">
                      <span className="font-semibold">{label}</span>
                      <button type="button" onClick={() => updateAvailabilityDay(day, { enabled: !schedule.enabled })} className={`rounded-full px-3 py-1 text-xs font-semibold ${schedule.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {schedule.enabled ? "مفتوح" : "مغلق"}
                      </button>
                      {schedule.enabled ? (
                        <>
                          <label className="flex items-center gap-2 text-sm"><span>من</span><input type="time" className="input" value={schedule.open} disabled={schedule.allDay} onChange={(e) => updateAvailabilityDay(day, { open: e.target.value })} /></label>
                          <label className="flex items-center gap-2 text-sm"><span>إلى</span><input type="time" className="input" value={schedule.close} disabled={schedule.allDay} onChange={(e) => updateAvailabilityDay(day, { close: e.target.value })} /></label>
                        </>
                      ) : <span className="text-sm text-muted-foreground sm:col-span-2">لا تقبل حجوزات</span>}
                      {schedule.enabled && <button type="button" onClick={() => updateAvailabilityDay(day, { allDay: !schedule.allDay })} className="flex items-center gap-2 text-xs text-primary sm:col-start-2"><CalendarOff className="h-4 w-4" /> {schedule.allDay ? "إلغاء 24 ساعة" : "إتاحة 24 ساعة"}</button>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {current.key === "publish" && (
            <div className="text-center">
              {draft.published ? (
                <>
                  <PartyPopper className="mx-auto h-12 w-12 text-primary" />
                  <p className="mt-3 text-lg font-bold">تم نشر ملعبك بنجاح!</p>
                  <p className="text-sm text-muted-foreground">أصبح ملعبك ظاهراً الآن لجميع اللاعبين.</p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground">راجع بياناتك ثم انشر ملعبك ليظهر للاعبين.</p>
                  <Button className="mt-4" onClick={() => dispatch(publishVenue())}>
                    انشر الملعب الآن
                  </Button>
                </>
              )}
            </div>
          )}
        </motion.div>

        <div className="mt-6 flex justify-between border-t border-border pt-4">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            السابق
          </Button>
          {step < STEPS.length - 1 && <Button onClick={next}>التالي</Button>}
        </div>
      </Card>
    </div>
  )
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}
