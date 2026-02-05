import React, { useState, useMemo } from "react";
import Footer from "../pages/Footer";
import { useCart } from '../context/CartContext'

import { products } from '../data/products'
import soldBadge from '../assets/soldout.png'
import { Link } from 'react-router-dom'

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
  const handleAdd = (e, p) => {
    const card = e.currentTarget.closest('.rounded-lg') || e.currentTarget.parentElement
    const img = card.querySelector('img')
    const rect = img ? img.getBoundingClientRect() : null
    cart.addItem(p, { sourceEl: img, imgSrc: img?.src, imgRect: rect })
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
      <section className="min-h-screen bg-gray-50 py-12 md:pt-30" style={{
        backgroundColor: 'hsl(44, 26%, 96%)',
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

        

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {displayedProducts.map((p) => (
              <div key={p.id} className="rounded-lg border border-gray-100 shadow-sm overflow-hidden" style={{ backgroundColor: 'hsl(44, 26%, 94%)' }}>
                <div className="h-50 md:h-55 lg:h-55 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    <Link to={`/product/${p.id}`} className="w-full h-full block">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover " />
                    </Link>
                    {p.soldOut && (
                      <img src={soldBadge} alt="Sold out" className="absolute top-2 right-2 w-12 h-12 pointer-events-none" />
                    )}
                  </div>

                <div className="p-4 text-center -mt-1">
                  <div className="text-[10px] tracking-widest uppercase text-gray-600 -mt-1">{p.title}</div>
                  <div className="mt-2 font-semibold text-sm ">{`N${p.price.toLocaleString()}`}</div>

                  <div className="mt-1 text-yellow-400 text-sm">
                    {Array.from({ length: Math.floor(p.rating) }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">{p.rating}</span>
                  </div>

                  <button
                    onClick={!p.soldOut ? (e) => handleAdd(e, p) : undefined}
                    disabled={p.soldOut}
                    className={`${p.soldOut ? 'mt-2 w-full bg-gray-300 text-gray-600 py-2 rounded-md text-sm cursor-not-allowed' : 'mt-2 w-full bg-black text-white py-2 rounded-md text-sm hover:opacity-95'}`}>
                    {p.soldOut ? 'SOLD OUT' : 'Add to cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
