import { Menu, X, Home, ShoppingCart, Layers, HelpCircle, CreditCard } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/nano.png';
import { useCart } from '../context/CartContext'
import { createPortal } from 'react-dom'
import { products } from '../data/products'
import searchIcon from '../assets/search.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();

  // DesktopSearch component inlined to keep Navbar self-contained
  function DesktopSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const searchRef = useRef(null)
    const dropdownRef = useRef(null)
    const [coords, setCoords] = useState(null)

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
      try {
        const el = searchRef.current
        if (el) {
          const r = el.getBoundingClientRect()
          setCoords({ top: r.bottom, left: r.left, width: r.width })
        }
      } catch { setCoords(null) }
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

    return (
      <>
        <div ref={searchRef} className="ml-3 w-full flex items-center gap-3">
          <input
            value={query}
            onChange={onChange}
            className="bg-transparent w-full placeholder:text-gray-500 text-gray-700 outline-none"
            placeholder="Search products..."
          />
          <img src={searchIcon} alt="search" className="h-5 w-5 text-gray-500" width="20" height="20" loading="eager" fetchPriority="high" decoding="async" />
        </div>
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
      </>
    )
  }
  const mobileNavItems = [
    { path: '/home', label: 'Home', Icon: Home },
    { path: '/shop', label: 'Shop', Icon: ShoppingCart },
    { path: '/collections', label: 'Collections', Icon: Layers },
    { path: '/faq', label: 'FAQ', Icon: HelpCircle },
    { path: '/checkout', label: 'Checkout', Icon: CreditCard },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full shadow text-black font-semibold pt-3"
      style={{
        backgroundColor: 'hsl(44, 45%, 93%)',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-6 flex justify-between items-center md:px-20">
        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-20" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen} aria-controls="mobile-menu">
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center logo-left-413 absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none z-10">
          <img src={logo} alt="Logo" className="h-12 w-auto" width="48" height="48" loading="eager" fetchPriority="high" decoding="sync" style={{objectFit: 'contain'}} />
        </Link>

        {/* Search (desktop only) - placed between logo and nav links */}
        <div className="hidden md:flex items-center md:flex-1 md:justify-center md:mx-6">
          <div ref={null} className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center shadow-md border border-white/30 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
            </svg>
            {/* Controlled search input with dropdown portal */}
            <DesktopSearch />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-7 items-center md:order-3">
          {['/home', '/shop', '/collections', '/faq'].map((path) => {
            const labelMap = {
              '/home': 'Home',
              '/shop': 'Shop',
              '/collections': 'Collections',
              '/faq': 'FAQ',
            };
            const label = labelMap[path];
            if (path === '/collections') {
              return (
                <button
                  key={path}
                  onClick={(e) => { e.preventDefault(); setShowCollections(true); }}
                  className="text-gray-700 hover:text-orange-600"
                  aria-haspopup="dialog"
                >
                  {label}
                </button>
              );
            }
            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/home'}
                className={({ isActive }) => isActive ? 'text-red-900 font-bold' : 'text-gray-700 hover:text-orange-600'}
              >
                {label}
              </NavLink>
            );
          })}

        </nav>

        {/* Cart Icon (always visible) */}
        {/* Cart button navigates to checkout */}
        <button onClick={(e) => { e.preventDefault(); navigate('/checkout'); }} className="ml-4 mr-1 flex items-center relative z-20 cart-left-413 md:order-4 md:ml-10" aria-label="Go to checkout">
            <div id="cart-icon" className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100">
            <ShoppingCart size={19} className="text-black" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.count || 0}</span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto bg-black/20 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
        style={{ backdropFilter: isOpen ? 'blur(6px)' : 'none' }}
      />

      <nav
        id="mobile-menu"
        className={`md:hidden fixed top-0 left-0 h-full w-57 pt-6 rounded-r-2xl shadow-lg transform origin-left transition-transform duration-600 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40 flex flex-col`}
        aria-hidden={!isOpen}
        role="navigation"
        style={{ backgroundColor: 'hsl(44, 45%, 93%)' }}
      >
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto mb-3" width="40" height="40" loading="eager" fetchPriority="high" decoding="sync" style={{objectFit: 'contain'}} />
          </Link>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-100">
            {mobileNavItems.map(({ path, label, Icon }) => {
              if (path === '/collections') {
                return (
                  <button
                    key={path}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      setShowCollections(true);
                    }}
                    className={`flex items-center gap-4 px-6 py-4 text-gray-800 hover:bg-gray-50`}
                    aria-haspopup="dialog"
                  >
                    <Icon size={18} className="text-gray-600" />
                    <span>{label}</span>
                  </button>
                );
              }

              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex items-center gap-4 px-6 py-4 text-gray-800 hover:bg-gray-50 ${isActive ? 'bg-emerald-950/8 text-red-900 rounded-r-full' : ''}`}
                >
                  <Icon size={18} className="text-gray-600" />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </div>

        </div>
      </nav>

      {/* Collections modal */}
      {showCollections && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowCollections(false)} aria-hidden="true" />

          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 z-10 p-6" role="dialog" aria-modal="true" aria-labelledby="collections-title">
            <div className="flex justify-between items-start">
              <div className="text-center w-full">
                <h2 id="collections-title" className="text-xl font-bold">Coming Soon</h2>
                <p className="text-sm text-gray-600 mt-2">We're working on something amazing. Stay tuned</p>
              </div>
              <button onClick={() => setShowCollections(false)} className="text-gray-500 hover:text-gray-700 ml-4" aria-label="Close">
                <X />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
