export default function Footer(){
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-white/70 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} VelociRent. All rights reserved.</p>
        <nav className="flex gap-4">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="/faqs" className="hover:text-white">FAQs</a>
          <a href="/policies" className="hover:text-white">Policies</a>
        </nav>
      </div>
    </footer>
  )
}
