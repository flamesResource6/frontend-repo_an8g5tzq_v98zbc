import { useEffect, useState } from 'react'

export default function Dashboard(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch(`${baseUrl}/api/bookings`).then(r=>r.json()).then(d=>setItems(d.items || []))
  },[])

  return (
    <div className="min-h-screen bg-slate-950 pt-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold">Your Bookings</h1>
        <div className="mt-6 grid gap-4">
          {items.map(b => (
            <div key={b.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{b.pickup_location} → {b.dropoff_location}</p>
                <p className="text-sm text-white/70">{b.start_date} to {b.end_date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${b.total_price}</p>
                <p className="text-xs text-white/60">{b.status} • {b.payment_status}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-white/60">No bookings yet. Book a car to see it here.</p>
          )}
        </div>
      </div>
    </div>
  )
}
