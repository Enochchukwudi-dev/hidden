import React, { useState, useMemo, useRef, useEffect } from "react";
import Footer from "../pages/Footer";
import { useCart } from '../context/CartContext'

import { products } from '../data/products'
import soldBadge from '../assets/soldout.png'
import { Link } from 'react-router-dom'
import MountReveal from '../components/MountReveal'

// cache preloaded image urls so we don't create duplicate Image objects
const preloadedImages = new Set()

const StarRow = ({ rating = 5 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="text-yellow-400 text-sm mt-2 flex items-center justify-center">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {half && <span>☆</span>}
    </div>
  );
};

const Shop = () => {
  const cart = useCart()
  // temporary added state per product for visual feedback after clicking Add to cart
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

  // preload images for faster product page loads (on hover/focus/touch)
  const preloadImages = (p) => {
    if (!p) return
    const list = p.images && p.images.length ? p.images : [p.image]
    list.forEach(src => {
      if (!preloadedImages.has(src)) {
        const img = new Image()
        img.src = src
        preloadedImages.add(src)
      }
    })
  }

  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');

  const displayedProducts = useMemo(() => {
    let list = [...products];
    if (category && category !== 'all') {
      if (category === 'trucker') list = list.filter((p) => /trucker/i.test(p.title));
      if (category === 'beanie') list = list.filter((p) => /beanie/i.test(p.title));
      if (category === 'signature') list = list.filter((p) => /signature/i.test(p.title));
      if (category === 'tactical') list = list.filter((p) => /tactical/i.test(p.title));
      if (category === 'tee') list = list.filter((p) => /tee/i.test(p.title));
    }
    if (sort === 'low-high') return list.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') return list.sort((a, b) => b.price - a.price);
    // Shuffle products in default sort
    if (sort === 'default') {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [sort, category]);

  return (
    <>
      <MountReveal className="min-h-screen bg-gray-50 py-12 md:pt-30" style={{
        backgroundColor: 'white',
      }}>
        <div className="max-w-8xl mx-auto px-2 md:px-7">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
              <p className="text-black font-semibold uppercase">Shop</p>
            </div>

            <div className="w-full md:w-auto ">
              <div className="flex flex-col md:flex-row md:items-center gap-4 ">
                <div className="w-full md:w-auto ">
                  <div className="text-xs text-gray-600 mb-1 uppercase">Sort By</div>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-black/9">
                    <option value="default">Default</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <div className="text-xs text-gray-600 mb-1 uppercase">Categories</div>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-black/9">
                    <option value="all">All Categories</option>
                    <option value="trucker">Trucker Caps</option>
                    <option value="beanie">Beanies</option>
                    <option value="signature">Signature Cap</option>
                    <option value="tactical">Tactical Cap</option>
                    <option value="tee">Tee</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedProducts.map((p) => (
              <div key={p.id} className="product-card rounded-lg overflow-hidden" style={{
                backgroundColor: 'white',
              }}>
                <div className="h-50 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    <Link
                      to={`/product/${p.id}`}
                      className="w-full h-full block"
                      onMouseEnter={() => preloadImages(p)}
                      onFocus={() => preloadImages(p)}
                      onTouchStart={() => preloadImages(p)}
                      onPointerOver={() => preloadImages(p)}
                    >
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
        </div>
      </MountReveal>
      <Footer />
    </>
  );
};

export default Shop;
