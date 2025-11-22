import { ShieldCheck, Clock, CreditCard, Star, Gauge } from 'lucide-react'

export default function Features() {
  const items = [
    { icon: ShieldCheck, title: 'Trusted & Insured', desc: 'Full coverage options and transparent policies.' },
    { icon: Clock, title: 'Instant Booking', desc: 'Live availability with real-time confirmation.' },
    { icon: CreditCard, title: 'Secure Checkout', desc: 'Multiple payment methods with encryption.' },
    { icon: Star, title: 'Top-rated Fleet', desc: 'Premium vehicles maintained to perfection.' },
    { icon: Gauge, title: 'Unlimited Mileage', desc: 'Drive freely with flexible mileage plans.' },
  ]
  return (
    <section className="py-16 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Why Choose Us</h2>
        <p className="text-white/60 text-center mt-2">Convenient. Reliable. Designed for modern travel.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 text-white">
              <it.icon className="text-blue-400" />
              <h3 className="mt-4 font-semibold">{it.title}</h3>
              <p className="text-sm text-white/70 mt-2">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
