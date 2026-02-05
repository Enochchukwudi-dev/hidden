import React, { useEffect, useState, useRef } from 'react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import soldBadge from '../assets/soldout.png'
import MountReveal from '../components/MountReveal' 

// cache preloaded image urls to avoid duplicate Image objects
const preloadedImages = new Set()

const preloadImages = (p) => {
  if (!p) return
  const list = p.images && p.images.length ? p.images : [p.image]
  list.forEach(src => {
    if (!src) return
    if (preloadedImages.has(src)) return
    try {
      const im = new Image()
      im.src = src
      preloadedImages.add(src)
    } catch (err) { void err }
  })
}

function NewArrival({ limit, className = '', hideTitle = false, product = null }) {
  const cart = useCart()
  // show temporary "Added" state per product when user clicks add-to-cart
  const [addedIds, setAddedIds] = useState(() => new Set())
  const addedTimers = useRef({})

  useEffect(() => {
    return () => {
      const timers = addedTimers.current || {}
      Object.values(timers).forEach(t => clearTimeout(t))
      addedTimers.current = {}
    }
  }, [])

  const markAdded = (id, duration = 1500) => {
    setAddedIds(prev => {
      const s = new Set(prev)
      s.add(id)
      return s
    })
    if (addedTimers.current[id]) clearTimeout(addedTimers.current[id])
    addedTimers.current[id] = setTimeout(() => {
      setAddedIds(prev => {
        const s = new Set(prev)
        s.delete(id)
        return s
      })
      delete addedTimers.current[id]
    }, duration)
  }

  const handleAdd = (e, p) => {
    const card = e.currentTarget.closest('.product-card') || e.currentTarget.closest('.rounded-lg') || e.currentTarget.parentElement
    const img = card ? (card.querySelector('img[data-product-image]') || card.querySelector('img')) : null
    const rect = img && img.getBoundingClientRect ? img.getBoundingClientRect() : null
    cart.addItem(p, { sourceEl: img, imgSrc: img?.src || p.image, imgRect: rect })
    // show visual added state while preserving fly animation
    markAdded(p.id)
  }

  const [items, setItems] = useState(() => {
    let pool = products
    if (product && product.title) {
      const t = product.title.toLowerCase()
      if (t.includes('trucker')) pool = products.filter(p => p.title.toLowerCase().includes('trucker'))
      else if (t.includes('beanie')) pool = products.filter(p => p.title.toLowerCase().includes('beanie'))
    }
    if (product && product.id) pool = pool.filter(p => p.id !== product.id)

    // Fisher-Yates shuffle
    const shuffled = pool.slice()
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    const result = typeof limit === 'number' ? shuffled.slice(0, limit) : shuffled
    // Remove duplicates based on id
    return result.filter((item, index, self) => self.findIndex(p => p.id === item.id) === index)
  })

  useEffect(() => {
    let pool = products
    if (product && product.title) {
      const t = product.title.toLowerCase()
      if (t.includes('trucker')) pool = products.filter(p => p.title.toLowerCase().includes('trucker'))
      else if (t.includes('beanie')) pool = products.filter(p => p.title.toLowerCase().includes('beanie'))
    }
    if (product && product.id) pool = pool.filter(p => p.id !== product.id)

    const shuffled = pool.slice()
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    const result = typeof limit === 'number' ? shuffled.slice(0, limit) : shuffled
    // Remove duplicates based on id
    setItems(result.filter((item, index, self) => self.findIndex(p => p.id === item.id) === index))
  }, [limit, product])

  return (
    <MountReveal className={`max-w-7xl mx-auto px-3 py-10 ${className}`}>
      {!hideTitle && <h3 className="text-xs tracking-widest uppercase text-gray-600 mb-6">New Arrivals</h3>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((p) => (
          <div key={p.id} className="product-card rounded-lg overflow-hidden" style={{
        backgroundColor: 'white',
      }}>
            <div className="h-50 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <Link to={`/product/${p.id}`} className="w-full h-full block">
                  <img src={p.image} alt={p.title} data-product-image="true" className="w-full h-full object-cover" />
                </Link>
                {p.soldOut && <img src={soldBadge} alt="Sold out" className="absolute top-2 right-2 w-12 h-12 pointer-events-none" />}
              </div>

            <div className="p-4 text-center">
              <div className="text-[8px] tracking-widest uppercase text-gray-700 font-semibold -mt-1">{p.title}</div>
              <div className="mt-2 font-semibold text-xs">{`₦ ${Number(p.price).toLocaleString()}`}</div>

              <div className="-mt-2 text-yellow-400">
                {Array.from({ length: Math.floor(p.rating) }).map((_, i) => (
                  <span key={i} className="text-[10px] leading-none mr-0.5">★</span>
                ))}
                <span className="text-[10px] text-gray-500 ml-2 leading-none">{p.rating}</span>
              </div>

              {(() => {
                const isAdded = addedIds.has(p.id)
                return (
                  <button
                    onClick={!p.soldOut && !isAdded ? (e) => handleAdd(e, p) : undefined}
                    disabled={p.soldOut || isAdded}
                    className={`${p.soldOut ? 'mt-1 w-full bg-gray-300 text-gray-600 py-2 rounded-md text-sm cursor-not-allowed' : isAdded ? 'mt-1 w-full bg-green-500 text-white py-2 rounded-md text-sm flex items-center justify-center gap-2' : 'mt-1 w-full bg-white text-black border border-gray-300 py-2 rounded-lg text-sm hover:opacity-95 hover:cursor-pointer hover:text-green-700'}`}>
                    {p.soldOut ? 'SOLD OUT' : (isAdded ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span>Added</span>
                      </>
                    ) : 'Add to cart')}
                  </button>
                )
              })()}
            </div>
          </div>
        ))}
      </div>
    </MountReveal>
  )
} 

export default NewArrival