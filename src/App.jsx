import { useEffect, useMemo, useState } from 'react'
import { api } from './lib/api'
import { motion } from 'framer-motion'
import { Globe, ShieldCheck, Zap, Mail, Star, Timer, ChevronRight, ArrowRight, CreditCard, Languages } from 'lucide-react'

const currencies = ['USD','ARS','XOF','MRU']
const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
]

function Navbar({ onCTAClick, locale, setLocale, currency, setCurrency }){
  return (
    <div className="fixed top-0 inset-x-0 z-50 backdrop-blur-md/30 bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-inner" />
          <span className="text-white font-semibold tracking-wide">Flames Sports Analytics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-sm text-white/80">
            <button onClick={() => setLocale(locale)} className="px-2 py-1 rounded-md hover:bg-white/10 flex items-center gap-2"><Languages size={16}/> {languages.find(l=>l.code===locale)?.label}</button>
            <div className="w-px h-4 bg-white/10 mx-1"/>
            <select value={currency} onChange={e=>setCurrency(e.target.value)} className="bg-transparent text-white/80 text-sm px-2 py-1 rounded-md border border-white/10">
              {currencies.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={onCTAClick} className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold px-4 py-2 hover:opacity-90">See Pricing <ArrowRight size={16}/></button>
        </div>
      </div>
    </div>
  )
}

function Hero({ onCTAClick }){
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-[#0B1220] via-[#0A0F1A] to-[#0A0F1A] text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Win smarter with data-driven football picks
            </motion.h1>
            <p className="mt-4 text-white/70 leading-relaxed">Daily predictions across Latin America and Africa. Transparent results, xG models, and risk labels to help you bet responsibly.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={onCTAClick} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold px-5 py-3 hover:opacity-90">Get Today’s Picks <ChevronRight size={18}/></button>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10">See Pricing</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-white/70">
              <div className="flex items-center gap-2"><ShieldCheck size={18}/> No prepayment</div>
              <div className="flex items-center gap-2"><Star size={18}/> Transparent results</div>
              <div className="flex items-center gap-2"><Timer size={18}/> 24/7 support</div>
            </div>
          </div>
          <motion.div initial={{opacity:0, scale:0.96}} animate={{opacity:1, scale:1}} transition={{duration:0.6, delay:0.1}} className="relative">
            <div className="absolute -inset-6 bg-blue-500/20 blur-3xl rounded-3xl"/>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <LiveStats />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LiveStats(){
  const [stats, setStats] = useState({backend:"…",collections:0})
  useEffect(()=>{ api.test().then(r=> setStats({backend:r.backend, collections:r.collections?.length||0})).catch(()=>{}) },[])
  return (
    <div>
      <div className="text-white/80 font-semibold mb-3">Live system check</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
          <div className="text-white/60 text-sm">Backend</div>
          <div className="text-white text-lg mt-1">{stats.backend}</div>
        </div>
        <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
          <div className="text-white/60 text-sm">DB Collections</div>
          <div className="text-white text-lg mt-1">{stats.collections}</div>
        </div>
      </div>
      <button onClick={()=> api.seedDemo()} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-200 px-4 py-2">Seed demo data</button>
    </div>
  )
}

function PredictionCard({p}){
  return (
    <motion.div whileHover={{y:-2}} className="rounded-3xl bg-white/5 border border-white/10 p-4 text-white">
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>{p.league}</span>
        <span>{new Date(p.kickoff_iso).toLocaleString()}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{p.home_team} vs {p.away_team}</div>
          <div className="text-white/70 text-sm">Pick: <span className="text-white font-medium">{p.pick.replaceAll('_',' ')}</span></div>
        </div>
        <div className="text-right">
          <div className="text-cyan-300 text-xl font-bold">{p.odds.toFixed(2)}</div>
          <div className="text-xs text-white/70">Conf: {p.confidence}% • {p.risk}</div>
        </div>
      </div>
    </motion.div>
  )
}

function Predictions(){
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({league:'', min_odds:'', max_odds:'', min_conf:'', max_conf:''})
  useEffect(()=>{ api.listPredictions({limit:12}).then(r=> setItems(r.items||[])) },[])
  return (
    <section className="py-14 bg-[#0A0F1A]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-white text-2xl font-bold">Today’s Predictions</h2>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 text-sm">
            <input placeholder="League" value={filters.league} onChange={e=>setFilters({...filters, league:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/40"/>
            <input placeholder="Min odds" value={filters.min_odds} onChange={e=>setFilters({...filters, min_odds:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/40"/>
            <input placeholder="Max odds" value={filters.max_odds} onChange={e=>setFilters({...filters, max_odds:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/40"/>
            <input placeholder="Min conf" value={filters.min_conf} onChange={e=>setFilters({...filters, min_conf:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/40"/>
            <input placeholder="Max conf" value={filters.max_conf} onChange={e=>setFilters({...filters, max_conf:e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/40"/>
            <button onClick={()=> api.listPredictions(filters).then(r=> setItems(r.items||[]))} className="sm:col-span-5 col-span-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold px-4 py-2">Apply Filters</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {items.map(p=> <PredictionCard key={p._id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

function Pricing(){
  const [billing, setBilling] = useState('monthly')
  const [plans, setPlans] = useState([])
  useEffect(()=>{ api.getPlans().then(r=> setPlans(r.items||[])) },[])
  const price = (p) => billing==='monthly' ? p.monthly_price : p.yearly_price

  return (
    <section id="pricing" className="py-16 bg-gradient-to-b from-[#0A0F1A] to-black">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-bold">Plans & Pricing</h2>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>Monthly</span>
            <button onClick={()=> setBilling(billing==='monthly'?'yearly':'monthly')} className="relative w-12 h-6 rounded-full bg-white/10">
              <span className={`absolute top-0.5 ${billing==='monthly'?'left-0.5':'left-6'} w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all`} />
            </button>
            <span>Yearly</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.length===0 ? [
            {code:'free', name:'Free', monthly_price:0, yearly_price:0},
            {code:'starter', name:'Starter', monthly_price:19, yearly_price:180},
            {code:'pro', name:'Pro', monthly_price:49, yearly_price:468},
          ].map(p=> <PlanCard key={p.code} plan={p} billing={billing} />) : plans.map(p=> <PlanCard key={p._id||p.code} plan={p} billing={billing} />)}
        </div>
      </div>
    </section>
  )
}

function PlanCard({plan, billing}){
  const highlight = plan.code === 'pro'
  return (
    <div className={`rounded-3xl border p-6 ${highlight? 'border-cyan-400/40 bg-cyan-400/5':'border-white/10 bg-white/5'} text-white`}> 
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        {highlight && <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-300/30">Best value</span>}
      </div>
      <div className="mt-3 text-3xl font-extrabold">
        ${billing==='monthly'? plan.monthly_price:plan.yearly_price}
        <span className="text-sm text-white/60 font-normal">/{billing==='monthly'? 'mo':'yr'}</span>
      </div>
      <ul className="mt-4 space-y-2 text-white/80 text-sm">
        <li>Daily predictions</li>
        <li>Confidence & risk labels</li>
        <li>Access to blog & insights</li>
      </ul>
      <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold px-4 py-2">
        Choose {plan.name} <CreditCard size={16}/>
      </button>
    </div>
  )
}

function Blog(){
  const [posts, setPosts] = useState([])
  useEffect(()=>{ api.listBlogs(6).then(r=> setPosts(r.items||[])) },[])
  return (
    <section className="py-16 bg-black">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-bold">Latest Insights</h2>
          <a href="#" className="text-cyan-300 hover:underline">View all</a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map(p=> (
            <div key={p._id} className="rounded-3xl bg-white/5 border border-white/10 p-5 text-white">
              <div className="text-sm text-white/60">{p.language?.toUpperCase()}</div>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="text-white/70 text-sm mt-1">{p.excerpt}</p>
              <button className="mt-4 inline-flex items-center gap-2 text-cyan-300">Read more <ChevronRight size={16}/></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EmailCapture(){
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <section className="py-14 bg-gradient-to-b from-black to-[#060A12]">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h3 className="text-white text-2xl font-bold">Get free picks in your inbox</h3>
        <p className="text-white/70 mt-2">Join our newsletter for updates and promos.</p>
        <div className="mt-5 flex gap-2">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email" className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40"/>
          <button disabled={loading} onClick={async()=>{ setLoading(true); try{ await api.subscribe(email); setOk(true)} catch(e){ } finally{ setLoading(false)}}} className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold px-5">
            {loading? 'Sending…':'Subscribe'}
          </button>
        </div>
        {ok && <div className="text-green-400 mt-3">Thanks! Check your inbox.</div>}
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="py-10 bg-black text-white/70">
      <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm">© {new Date().getFullYear()} Flames Sports Analytics</div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Responsible Betting</a>
          <a href="https://t.me/" className="hover:text-white">Telegram</a>
          <a href="https://wa.me/" className="hover:text-white">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  const [locale, setLocale] = useState('en')
  const [currency, setCurrency] = useState('USD')

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <Navbar onCTAClick={()=> document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})} locale={locale} setLocale={setLocale} currency={currency} setCurrency={setCurrency} />
      <Hero onCTAClick={()=> document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})} />
      <Predictions />
      <Pricing />
      <Blog />
      <EmailCapture />
      <Footer />
    </div>
  )
}
