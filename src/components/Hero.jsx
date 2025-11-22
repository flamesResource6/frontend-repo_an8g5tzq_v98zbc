import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onSearch }) {
  return (
    <section className="relative min-h-[85vh] pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-slate-950/90 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center min-h-[85vh]">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Premium Car Rentals, Reimagined
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-white/80"
          >
            Handcrafted experience. Lightning-fast search. Luxury to economy — find the perfect ride in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-2xl"
          >
            <SearchBar onSearch={onSearch} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 flex items-center gap-6 text-white/80"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm">Trusted by 50k+ drivers</span>
            </div>
            <div className="text-sm">24/7 support • Free cancellations • No hidden fees</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const params = {
      pickup: form.get('pickup') || '',
      dropoff: form.get('dropoff') || '',
      start: form.get('start') || '',
      end: form.get('end') || '',
      type: form.get('type') || '',
    }
    onSearch?.(params)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <input name="pickup" placeholder="Pick-up location" className="px-4 py-3 rounded-xl bg-white/90 text-slate-900 placeholder-slate-500 focus:outline-none" />
      <input name="dropoff" placeholder="Drop-off location" className="px-4 py-3 rounded-xl bg-white/90 text-slate-900 placeholder-slate-500 focus:outline-none" />
      <input name="start" type="date" className="px-4 py-3 rounded-xl bg-white/90 text-slate-900 placeholder-slate-500 focus:outline-none" />
      <input name="end" type="date" className="px-4 py-3 rounded-xl bg-white/90 text-slate-900 placeholder-slate-500 focus:outline-none" />
      <div className="flex gap-2">
        <select name="type" className="flex-1 px-4 py-3 rounded-xl bg-white/90 text-slate-900 focus:outline-none">
          <option value="">Any type</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="sport">Sport</option>
          <option value="convertible">Convertible</option>
        </select>
        <button className="px-5 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">
          Find Your Ride
        </button>
      </div>
    </form>
  )
}
