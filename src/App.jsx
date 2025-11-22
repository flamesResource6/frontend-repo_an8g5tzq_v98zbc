import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CarGrid from './components/CarGrid'
import Footer from './components/Footer'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'

function Home(){
  const navigate = useNavigate()
  const onSearch = (params) => {
    const q = new URLSearchParams()
    if(params.type) q.set('type', params.type)
    navigate(`/cars?${q.toString()}`)
  }
  return (
    <>
      <Hero onSearch={onSearch} />
      <Features />
      <CarGrid />
    </>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}
