import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { setSport } from "../../redux/userReducer"
import { SPORTS } from "../../constants"

export default function SelectSport() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function pick(sportId) {
    dispatch(setSport(sportId))
    navigate(`/app/sport/${sportId}`)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-balance md:text-4xl">أي رياضة حابب تلعب؟</h1>
        <p className="mt-2 text-muted">اختار وهنوديك لعالم الرياضة اللي اخترتها</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.values(SPORTS).map((sport, i) => (
          <motion.button
            key={sport.id}
            type="button"
            onClick={() => pick(sport.id)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-80 overflow-hidden rounded-3xl text-right shadow-lg"
          >
            <img
              src={sport.id === "football" ? "/images/venue-football-1.png" : "/images/venue-padel-1.png"}
              alt={sport.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${sport.theme.dark}f5, ${sport.theme.primary}30)` }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <h2 className="text-3xl font-black">{sport.name}</h2>
              <p className="mt-2 text-white/80">
                {sport.id === "football" ? "ملاعب خماسي بنجيل احترافي" : "ملاعب بادل بجدران زجاجية"}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                يلا بينا <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
