
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import NewArrival from './NewArrival'
import Footer from './Footer'
// Use avif hero images from /images - prefer 1024
const em1 = '/images/em1-1024.avif'
const em2 = '/images/em2-1024.avif'
const em4 = '/images/em4-1024.avif'
const em5 = '/images/em5-1024.avif'
const em6 = '/images/em6-1024.avif'
import searchIcon from '../assets/search.svg' 
import { products } from '../data/products'

const Carousel = () => {
  const slides = [
    { id: 0, title: 'trucker caps ', subtitle: 'Style & Comfort For Every Head' },
    { id: 1, title: 'camouflage caps', subtitle: 'Bold Style & Street Attitude' },
    { id: 2, title: 'beanies', subtitle: 'Style & Comfort Fornose' },
    { id: 3, title: 'head warmers', subtitle: 'Warm Comfort & Bold Vibes' },
    { id: 4, title: 'Accessories', subtitle: 'Confidence & Comfort' },
  ]
  const [index, setIndex] = useState(0)
  const [autoplay] = useState(true)
  const navigate = useNavigate()

  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex(i => (i + 1) % slides.length)
  const goTo = (i) => setIndex(i)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [autoplay, slides.length])

  return (
    <div className="w-full overflow-hidden relative mt-5 ">
      <div className="flex transition-transform duration-700 md:duration-600 ease-in-out" style={{ transform: `translate3d(-${index * 100}%, 0, 0)`, willChange: 'transform' }}>
                {slides.map((s, i) => (
          <div key={s.id} className="flex-shrink-0 min-w-full">
            <div
              className={`slide-bg relative w-full px-0 pt-20 md:pt-35 pb-36 md:pb-55 flex flex-col items-center mt-3 text-center bg-transparent transition-transform duration-700 ease-in-out ${i === index ? 'scale-105 shadow-2xl' : ''}`}
              style={{ overflow: 'hidden' }}
            >
              {(() => {
                const img = i === 0 ? em1 : i === 1 ? em2 : i === 2 ? em4 : i === 3 ? em5 : i === 4 ? em6 : null
                return img ? (
                  <img
                    src={img}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    width="1600"
                    height="900"
                    aria-hidden="true"
                  />
                ) : null
              })()}

              <div className="absolute top-0 left-0 w-full h-59 bg-gradient-to-b from-blue-200/40 to-transparent pointer-events-none z-10" />
              <div className="mt-30 w-full max-w-xl relative z-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-roboto text-gray-900 tracking-wide uppercase white-text-shadow">
                  {s.title}
                </h1>
                <p className="mt-3 text-orange-100 text-sm sm:text-base font-roboto white-text-shadow">{s.subtitle}</p>

                <div className="mt-8 flex justify-center">
                  <button className="hero-cta" type="button" onClick={() => navigate('/shop')}>
                    {(`SHOP ${String(s.title).trim()}`).toUpperCase()}
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-59 bg-gradient-to-t from-blue-200/70 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        ))}
      </div>

      <button aria-label="Previous slide" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button aria-label="Next slide" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} className={`w-2 h-2 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const searchRef = useRef(null)
  const dropdownRef = useRef(null)
  const [coords, setCoords] = useState(null)

  // mount animation state (top -> bottom slide in)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // respect user preference for reduced motion
    try {
      if (window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setMounted(true)
        return
      }
    } catch (err) { /* ignore */ }
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const onChange = (e) => {
    const v = e.target.value
    setQuery(v)
    const q = String(v || '').trim().toLowerCase()
    if (!q) {
      setResults([])
      setCoords(null)
      return
    }
    const filtered = products.filter(p => String(p.title || '').toLowerCase().includes(q)).slice(0, 6)
    setResults(filtered)
    // compute position for portal dropdown
    try {
      const el = searchRef.current
      if (el) {
        const r = el.getBoundingClientRect()
        setCoords({ top: r.bottom, left: r.left, width: r.width })
      }
    } catch {
      setCoords(null)
    }
  }

  const onSelect = (p) => {
    setQuery('')
    setResults([])
    setCoords(null)
    navigate(`/product/${p.id}`)
  }

  useEffect(() => {
    const onDocClick = (e) => {
      const t = e.target
      if (searchRef.current && searchRef.current.contains(t)) return
      if (dropdownRef.current && dropdownRef.current.contains(t)) return
      setResults([])
      setCoords(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setResults([])
        setCoords(null)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('touchstart', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('touchstart', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  // Preload hero carousel background images and warm up the browser image cache
  useEffect(() => {
    const imgs = [em1, em2, em4, em5, em6];
    const links = [];
    imgs.forEach(src => {
      if (!src) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
      links.push(link);
      const i = new Image();
      i.src = src;
      i.decoding = 'sync';
    });
    return () => {
      links.forEach(l => l.parentNode && l.parentNode.removeChild(l));
    };
  }, []);

  return (
    <>
      <section
        className={`min-h-110 pt-7 md:pt-20 -mt-4 transition-transform transition-opacity duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        style={{ backgroundColor: 'white' }}
      >
        {/* Hero content moved above the background image */}
        {/* Mobile search (visible on small screens, hidden at md+) */}
        <div className="w-full px-4 sm:px-0 flex justify-center md:hidden mt-2">
          <div ref={searchRef} className="w-full max-w-md relative bg-white/45 backdrop-blur-md rounded-full px-4 py-2 flex items-center shadow-md border border-white/30 ">
            <input
              value={query}
              onChange={onChange}
              id="mobile-search"
              className="flex-1 bg-transparent mr-3 placeholder:text-gray-500 text-gray-700 outline-none text-base"
              style={{ fontSize: 16 }}
              placeholder="Search products..."
            />
            <img src={searchIcon} alt="search" className="h-5 w-5 text-gray-500" width="20" height="20" loading="eager" fetchPriority="high" decoding="async" />

            {/* dropdown will be rendered via portal to avoid stacking context issues */}
          </div>
        </div>
        <main>
          <Carousel />
        </main>
        {results && results.length > 0 && coords && createPortal(
          <div ref={dropdownRef} style={{ position: 'fixed', top: coords.top + 'px', left: coords.left + 'px', width: coords.width + 'px' }} className="bg-white rounded-lg shadow-lg max-h-64 overflow-auto z-[4000]">
            {results.map(r => (
              <button key={r.id} onClick={() => onSelect(r)} className="w-full flex items-center gap-3 p-2 hover:bg-gray-100">
                <img src={r.image} alt={r.title} className="w-12 h-12 object-cover rounded" width="48" height="48" loading="eager" fetchPriority="high" decoding="async" />
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">{r.title}</div>
                  <div className="text-xs text-gray-500">NGN {Number(r.price).toLocaleString()}</div>
                </div>
              </button>
            ))}
          </div>
        , document.body)}
      </section>
      <NewArrival />
      <Footer />
    </>
  );
};

export default Home;
