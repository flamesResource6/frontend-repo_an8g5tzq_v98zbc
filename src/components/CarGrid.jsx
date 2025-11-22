import { useEffect, useState } from 'react'
import { Fuel, Gauge, Cog, Users, BadgeDollarSign } from 'lucide-react'

export default function CarGrid({ initialQuery = {} }) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ type: '', transmission: '', fuel_type: '', brand: '', seats_gte: '', sort: 'popularity' })

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries({ ...filters, ...initialQuery }).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    const res = await fetch(`${baseUrl}/api/cars?${params.toString()}`)
    const data = await res.json()
    setCars(data.items)
    setLoading(false)
  }

  const updateFilter = (name, value) => {
    const next = { ...filters, [name]: value }
    setFilters(next)
    // live filtering
    setTimeout(() => fetchCars(), 0)
  }

  return (
    <section className="py-16 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="space-y-3 text-sm">
                <select onChange={(e)=>updateFilter('type', e.target.value)} className="w-full bg-white/10 rounded-lg p-2">
                  <option value="">Any type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="sport">Sport</option>
                </select>
                <select onChange={(e)=>updateFilter('transmission', e.target.value)} className="w-full bg-white/10 rounded-lg p-2">
                  <option value="">Any transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
                <select onChange={(e)=>updateFilter('fuel_type', e.target.value)} className="w-full bg-white/10 rounded-lg p-2">
                  <option value="">Any fuel</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
                <select onChange={(e)=>updateFilter('sort', e.target.value)} className="w-full bg-white/10 rounded-lg p-2">
                  <option value="popularity">Most popular</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between text-white mb-4">
              <h3 className="font-semibold">Available Cars</h3>
              <button onClick={fetchCars} className="text-sm underline text-white/70 hover:text-white">Refresh</button>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function CarCard({ car }) {
  return (
    <a href={`/cars/${car.id || car._id}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:from-white/10 transition-colors">
      <div className="aspect-video overflow-hidden">
        <img src={car.images?.[0] || 'https://images.unsplash.com/photo-1549921296-3c2b3f6b33b5?q=80&w=1200&auto=format&fit=crop'} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">{car.brand} {car.model}</h4>
            <p className="text-xs text-white/60 capitalize">{car.type}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">${car.price_per_day}/day</p>
            <p className="text-xs text-white/60">incl. taxes</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/70">
          <div className="flex items-center gap-1"><Cog size={14}/> {car.transmission}</div>
          <div className="flex items-center gap-1"><Users size={14}/> {car.seats} seats</div>
          <div className="flex items-center gap-1"><Fuel size={14}/> {car.fuel_type}</div>
        </div>
      </div>
    </a>
  )
}
