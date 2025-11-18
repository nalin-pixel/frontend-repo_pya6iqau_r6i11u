import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-slate-900/90 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-white"
        >
          StudySnap Web
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-4 text-lg md:text-xl text-slate-200 max-w-2xl"
        >
          Foto hochladen. Lernen. Bestehen.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-slate-300 max-w-2xl"
        >
          Die Browser-KI, die aus deinem Schulstoff automatisch einen kompletten Lernplan erstellt.
        </motion.p>
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 rounded-full bg-gradient-to-r from-teal-400 via-sky-400 to-violet-400 text-slate-900 font-semibold px-6 py-3 shadow-lg"
        >
          Direkt starten
        </motion.button>
      </div>
    </section>
  )
}
