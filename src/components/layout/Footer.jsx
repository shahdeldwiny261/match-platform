import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground font-black text-primary">
              M
            </div>
            <span className="text-xl font-black">ماتش</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/70">
            منصة حجز ملاعب كرة القدم الخماسي والبادل في الإسكندرية. احجز في ثوانٍ.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-bold">المنصة</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/app/select-sport" className="hover:text-primary-foreground">ابحث عن ملعب</Link></li>
            <li><Link to="/app/find-players" className="hover:text-primary-foreground">دوّر على لاعبين</Link></li>
            <li><Link to="/owner" className="hover:text-primary-foreground">سجّل ملعبك</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold">الرياضات</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/app/sport/football" className="hover:text-primary-foreground">كرة قدم خماسي</Link></li>
            <li><Link to="/app/sport/padel" className="hover:text-primary-foreground">بادل</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold">للإدارة</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/owner" className="hover:text-primary-foreground">لوحة صاحب الملعب</Link></li>
            <li><Link to="/admin" className="hover:text-primary-foreground">لوحة الأدمن</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">
        © 2026 ماتش — جميع الحقوق محفوظة • الإسكندرية، مصر
      </div>
    </footer>
  )
}
