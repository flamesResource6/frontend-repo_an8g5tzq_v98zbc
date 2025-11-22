import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Fuel, Users, Cog, ChevronLeft } from 'lucide-react'

export default function CarDetail(){
  const { id } = useParams()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [car, setCar] = useState(null)

  useEffect(()=>{
    fetch(`${baseUrl}/api/cars/${id}`).then(r=>r.json()).then(setCar)
  },[id])

  if(!car){
    return <div className="min-h-screen bg-slate-950 pt-20" />
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <Link to="/cars" className="inline-flex items-center gap-2 text-white/70 hover:text-white"><ChevronLeft size={18}/> Back</Link>
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-3">
            {(car.images || []).slice(0,3).map((src, i)=> (
              <img key={i} src={src} className="w-full rounded-xl border border-white/10" />
            ))}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
            <p className="text-white/70 mt-2">{car.description}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2"><Cog size={16}/> {car.transmission}</div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2"><Users size={16}/> {car.seats} seats</div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2"><Fuel size={16}/> {car.fuel_type}</div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Price per day</p>
                  <p className="text-3xl font-bold">${car.price_per_day}</p>
                </div>
                <Link to={`/book/${car.id}`} className="px-5 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
