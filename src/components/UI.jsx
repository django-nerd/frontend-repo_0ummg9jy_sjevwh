import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Clock, ShieldCheck, Star, Trophy, Mail, Phone, Send, Wallet } from 'lucide-react'

export function Navbar({ onLangChange, onCurrencyChange }) {
  return (
    <header className="backdrop-blur bg-black/50 sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
          <span className="font-semibold text-white">BluePicks</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link to="/predictions" className="hover:text-white">Predictions</Link>
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/blog" className="hover:text-white">Blog</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/faq" className="hover:text-white">FAQ</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <select onChange={(e)=>onLangChange?.(e.target.value)} className="bg-white/5 text-white text-sm rounded-md px-2 py-1">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="pt">PT</option>
          </select>
          <select onChange={(e)=>onCurrencyChange?.(e.target.value)} className="bg-white/5 text-white text-sm rounded-md px-2 py-1">
            <option>USD</option>
            <option>ARS</option>
            <option>XOF</option>
            <option>MRU</option>
          </select>
          <Link to="/pricing" className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1.5 rounded-lg shadow-lg shadow-cyan-500/20 hover:from-blue-500 hover:to-cyan-400">
            See Pricing <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-white/70 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded bg-gradient-to-br from-blue-500 to-cyan-400" />
            <span className="font-semibold text-white">BluePicks</span>
          </div>
          <p>Win smarter with data-driven football picks.</p>
          <div className="flex gap-3 mt-3 text-white/60">
            <a href="https://t.me" target="_blank" className="hover:text-white">Telegram</a>
            <a href="https://wa.me" target="_blank" className="hover:text-white">WhatsApp</a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2">
            <li><Link to="/predictions" className="hover:text-white">Predictions</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/legal/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/legal/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link to="/legal/responsible-betting" className="hover:text-white">Responsible Betting</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-white/50 text-xs mt-8">© {new Date().getFullYear()} BluePicks. All rights reserved.</div>
    </footer>
  )
}

export function Hero({ onCTA }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0a0f1c] to-black text-white">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-cyan-400/90 text-sm tracking-wide">No prepayment • Transparent results • 24/7 support</p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-300">
          Win smarter with data-driven football picks.
        </h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto">
          Daily predictions across Latin America and Africa. Advanced metrics, risk labels, and real-time updates.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/predictions" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/20 hover:from-blue-500 hover:to-cyan-400">
            Get Today’s Picks <ArrowRight size={18} />
          </Link>
          <Link to="/pricing" className="inline-flex items-center gap-2 bg-white/10 px-5 py-3 rounded-xl hover:bg-white/20">
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

export function BenefitGrid() {
  const items = [
    { icon: <Trophy className="text-cyan-400" size={18} />, title: 'High-Confidence Picks', desc: 'Model-based predictions with win probability.' },
    { icon: <Clock className="text-cyan-400" size={18} />, title: 'Kickoff Alerts', desc: 'Stay notified before matches begin.' },
    { icon: <ShieldCheck className="text-cyan-400" size={18} />, title: 'Risk Labels', desc: 'Low/Medium/High to match your strategy.' },
    { icon: <Globe className="text-cyan-400" size={18} />, title: 'LATAM + Africa', desc: 'Regional coverage and currencies.' },
  ]
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/8 transition">
            <div className="flex items-center gap-2">{it.icon}<h4 className="font-semibold">{it.title}</h4></div>
            <p className="text-white/70 text-sm mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Newsletter({ onSubmit }) {
  const [email, setEmail] = useState('')
  return (
    <section className="bg-gradient-to-b from-black to-[#0a0f1c] text-white py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-semibold">Stay updated</h3>
        <p className="text-white/70">Get new picks and insights in your inbox.</p>
        <form onSubmit={(e)=>{e.preventDefault(); onSubmit?.(email);}} className="mt-5 flex gap-2">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400" />
          <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400">Subscribe</button>
        </form>
      </div>
    </section>
  )
}
