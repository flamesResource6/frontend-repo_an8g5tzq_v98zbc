import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function Booking(){
  const { id } = useParams()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [car, setCar] = useState(null)
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`${baseUrl}/api/cars/${id}`).then(r=>r.json()).then(setCar)
  },[id])

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const payload = {
      user_id: 'demo-user',
      car_id: id,
      pickup_location: f.get('pickup'),
      dropoff_location: f.get('dropoff'),
      start_date: f.get('start'),
      end_date: f.get('end'),
      total_price: Number(f.get('days')) * (car?.price_per_day || 0),
      notes: f.get('notes')
    }
    const res = await fetch(`${baseUrl}/api/bookings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setStatus(data)
    setTimeout(()=> navigate('/dashboard'), 1000)
  }

  if(!car){
    return <div className="min-h-screen bg-slate-950 pt-20" />
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <input name="pickup" placeholder="Pickup location" className="px-4 py-3 rounded-lg bg-white/10" required />
                <input name="dropoff" placeholder="Drop-off location" className="px-4 py-3 rounded-lg bg-white/10" required />
                <input type="date" name="start" className="px-4 py-3 rounded-lg bg-white/10" required />
                <input type="date" name="end" className="px-4 py-3 rounded-lg bg-white/10" required />
                <input type="number" name="days" placeholder="Days" className="px-4 py-3 rounded-lg bg-white/10" min={1} required />
              </div>
              <textarea name="notes" placeholder="Notes (optional)" className="w-full px-4 py-3 rounded-lg bg-white/10" />
              <button className="px-5 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow">Pay & Confirm</button>
              {status && <p className="text-sm text-white/70">Booking created: {status.id || 'pending'}</p>}
            </form>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <img src={car.images?.[0]} className="w-24 h-16 object-cover rounded-lg" />
              <div>
                <p className="font-semibold">{car.brand} {car.model}</p>
                <p className="text-sm text-white/70">${car.price_per_day}/day</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-white/70">
              <p>Free cancellation within 24h</p>
              <p>All taxes included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
