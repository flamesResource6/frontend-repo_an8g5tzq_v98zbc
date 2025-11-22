import { Link, NavLink } from 'react-router-dom'
import { Car, Menu, X, User, SunMoon } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 mt-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white shadow-lg">
              <Car size={18} />
            </div>
            <span className="font-semibold text-white tracking-tight">VelociRent</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/cars" className={linkClass}>Cars</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            <NavLink to="/faqs" className={linkClass}>FAQs</NavLink>
            <NavLink to="/policies" className={linkClass}>Policies</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
              <User size={18} />
              <span className="text-sm">Account</span>
            </Link>
            <Link to="/cars" className="inline-flex items-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4 py-2 text-sm font-semibold shadow hover:shadow-lg transition-shadow">
              Find Your Ride
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 p-2">
            <div className="flex flex-col">
              <NavLink onClick={()=>setOpen(false)} to="/cars" className={linkClass}>Cars</NavLink>
              <NavLink onClick={()=>setOpen(false)} to="/about" className={linkClass}>About</NavLink>
              <NavLink onClick={()=>setOpen(false)} to="/contact" className={linkClass}>Contact</NavLink>
              <NavLink onClick={()=>setOpen(false)} to="/faqs" className={linkClass}>FAQs</NavLink>
              <NavLink onClick={()=>setOpen(false)} to="/policies" className={linkClass}>Policies</NavLink>
              <NavLink onClick={()=>setOpen(false)} to="/dashboard" className={linkClass}>Account</NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
