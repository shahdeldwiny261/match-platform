import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import { Lock, X, ShieldCheck } from "lucide-react"
import { Button } from "../ui"
import { loginAs, closeLoginWall } from "../../redux/authReducer"

// A global modal that blocks checkout for guests and preserves their selection.
export default function LoginWall() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showLoginWall, pendingIntent } = useSelector((s) => s.auth)

  function handleLogin() {
    dispatch(loginAs("player"))
    // restore the guest's exact selection
    if (pendingIntent?.redirect) navigate(pendingIntent.redirect)
  }

  return (
    <AnimatePresence>
      {showLoginWall && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(closeLoginWall())}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => dispatch(closeLoginWall())}
              className="absolute left-4 top-4 text-muted transition hover:text-foreground"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-center text-xl font-bold">محتاج تسجل دخول تكمل الحجز</h3>
            <p className="mt-2 text-center text-sm text-muted">
              متقلقش، اختياراتك محفوظة وهترجعلك بالظبط بعد تسجيل الدخول.
            </p>

            {pendingIntent?.summary && (
              <div className="mt-4 rounded-[var(--radius)] bg-surface-muted p-3 text-sm">
                <div className="font-semibold text-foreground">{pendingIntent.summary.venue}</div>
                <div className="mt-1 text-muted">
                  {pendingIntent.summary.court} • {pendingIntent.summary.date} •{" "}
                  {pendingIntent.summary.time}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <Button className="w-full" onClick={handleLogin}>
                تسجيل الدخول
              </Button>
              <Button variant="outline" className="w-full" onClick={handleLogin}>
                إنشاء حساب جديد
              </Button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck className="h-3.5 w-3.5" /> دخول آمن ومشفّر
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
