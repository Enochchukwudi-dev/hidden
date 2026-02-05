import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import NewArrival from '../pages/NewArrival'
import Footer from '../pages/Footer'
import leftIcon from '../assets/left.svg'
import rightIcon from '../assets/right.svg'
import soldBadge from '../assets/soldout.png'

// Product metadata (colors and descriptions)
const PRODUCT_META = {
  1: { colors: ['Camo Yellow', 'Black', 'Olive', 'Khaki'], description: 'Structured FG trucker cap with a breathable mesh back and a curved brim. Features an embroidered front patch and an adjustable snapback for a comfortable, one-size fit — durable and ready for daily wear.' },
  2: { colors: ['Black', 'Charcoal', 'White'], description: 'Classic FG black trucker with a reinforced front panel and lightweight mesh to keep you cool. Clean embroidered branding and an adjustable snap closure for secure fit.' },
  3: { colors: ['Sky Blue', 'White', 'Navy'], description: 'FG sky-blue trucker featuring a soft front panel and airy mesh back. Embroidered branding and adjustable snapback combine style and function for everyday wear.' },
  4: { colors: ['Silver Grey', 'Black', 'White'], description: 'Neutral silver-grey trucker with structured shape and breathable construction. Pairs effortlessly with layered streetwear looks.' },
  5: { colors: ['Burnt Orange', 'Beige'], description: 'Bold burnt-orange trucker with a durable front panel and classic mesh back. Built to hold its shape while providing all-day comfort.' },
  6: { colors: ['Deep Red', 'Black'], description: 'Deep-red FG trucker with premium embroidery and an adjustable snapback. Lightweight, breathable, and made to stand out.' },
  7: { colors: ['Burgundy Camo', 'Forest'], description: 'Burgundy camo trucker — statement styling with a reinforced front and ventilated mesh for comfortable wear.' },
  8: { colors: ['Forest Camo', 'Olive'], description: 'Forest camo FG trucker, designed for breathability and lasting shape. A versatile cap for casual and outdoor looks.' },
  9: { colors: ['Royal Purple', 'Black'], description: 'Vibrant royal-purple trucker with a structured silhouette, embroidered logo, and adjustable snap for a personalized fit.' },
  10: { colors: ['Bright Red', 'Black'], description: 'Bright-red FG trucker made for impact. Breathable mesh back and durable front deliver a standout everyday cap.' },
  11: { colors: ['Charcoal Grey', 'Black'], description: 'FG charcoal beanie knitted from a soft acrylic blend with a folded cuff and subtle embroidered logo. Provides comfortable warmth and a snug fit.' },
  12: { colors: ['Jet Black', 'Graphite'], description: 'Classic jet-black beanie with a ribbed knit and clean finish. Lightweight, insulating and easy to style.' },
  13: { colors: ['Earth Brown', 'Tan'], description: 'Earth-brown FG beanie offering soft warmth and a relaxed silhouette. The folded cuff adds structure while keeping ears cozy.' },
  14: { colors: ['Light Green', 'Mint'], description: 'Light-green beanie with a soft handfeel and a close, comfortable fit. Ideal for layering under hoods or wearing solo.' },
  15: { colors: ['Light Grey', 'Heather'], description: 'Light-grey beanie crafted for everyday warmth. The classic ribbed knit and moderate stretch ensure a secure, flattering fit.' },
  16: { colors: ['Navy Blue', 'Indigo'], description: 'Navy FG beanie combining a refined finish with insulating warmth. Subtle branding keeps the look clean and versatile.' },
  17: { colors: ['Deep Purple', 'Plum'], description: 'Deep-purple beanie with a rich knit texture and snug fit. Comfortable for daily wear and cooler evenings.' },
  18: { colors: ['Wine Red', 'Burgundy'], description: 'Wine-red FG beanie with a cozy ribbed knit and fold-over cuff. A stylish, warm accessory that complements fall and winter outfits.' },
  19: { colors: ['Black', 'White', 'Grey'], description: 'FG Fear of Average Tee — a bold statement piece celebrating individuality and breaking away from mediocrity. Premium cotton blend with screen-printed graphics for everyday wear.' },
  20: { colors: ['Black', 'Navy', 'Grey'], description: 'FG Too Fly to Pray Tee — a lifestyle tee that blends street culture with confidence. Crafted from soft, durable cotton with embroidered FG branding.' },
  21: { colors: ['Black', 'White', 'Navy'], description: 'FG 1% Better Tee — celebrating the grind and constant improvement. Premium quality t-shirt with bold graphic design and comfortable fit for all-day wear.' },
  22: { colors: ['Black', 'White', 'Grey'], description: 'FG Highway to Heaven Tee — a spiritual yet street-inspired design. Made from premium cotton, perfect for layering or wearing solo with premium finishing.' },
  23: { colors: ['Black', 'Navy', 'Charcoal'], description: 'FG Logo Tee — classic FG branding with premium finishing. Made from durable cotton with a comfortable fit for everyday wear.' },
  34: { colors: ['Black'], description: 'FG Too Fly to Pray Tee (Black) — a lifestyle tee that blends street culture with confidence. Crafted from soft, durable cotton with printed graphics for everyday wear.' },
  24: { colors: ['Camo', 'Olive'], description: 'FG Tactical Cap (Camo) — rugged and versatile with a tactical design. Features reinforced stitching and an adjustable strap for a secure fit in any condition.' },
  25: { colors: ['Grey', 'Charcoal'], description: 'FG Tactical Cap (Grey) — sleek and functional design perfect for tactical or casual styling. Built with durable materials and an adjustable closure.' },
  26: { colors: ['Navy Blue', 'Black'], description: 'FG Tactical Cap (Navy Blue) — professional and versatile tactical cap with a structured design. Features breathable construction and adjustable fit.' },
  27: { colors: ['Black', 'White'], description: 'FG Signature Cap (Black) — iconic FG signature design in classic black. Premium embroidery and quality construction for a distinctive look.' },
  28: { colors: ['Pink', 'White'], description: 'FG Signature Cap (Pink) — bold and vibrant FG signature style. Stand out with this premium quality cap in a striking pink color.' },
  29: { colors: ['Gray', 'White'], description: 'FG Signature Cap (Gray) — refined FG signature cap in neutral grey. Versatile and stylish for any outfit with premium finishing.' },
  30: { colors: ['Red', 'White'], description: 'FG Signature Beanie (Red) — vibrant red signature beanie with premium knit quality. Provides warmth and style with iconic FG branding.' },
  31: { colors: ['Black', 'White'], description: 'FG Signature Beanie (Black) — classic black signature beanie with soft, comfortable knit. Perfect for everyday wear with distinctive FG styling.' },
  32: { colors: ['Red', 'Burgundy'], description: 'FG Signature Cap (Red) — bold red signature cap with premium quality construction. Makes a statement with vibrant color and iconic FG design.' },
  33: { colors: ['Black', 'White'], description: 'FG 1% Better Tee Black — celebrating the grind and constant improvement in style. Premium quality t-shirt with bold graphic design and comfortable fit for all-day wear.' }
}



function Dynamic({ product: propProduct }) {
  const { id } = useParams() || {}
  const productId = propProduct?.id || (id ? parseInt(id, 10) : null)

  const product = useMemo(() => {
    if (propProduct) return propProduct
    if (productId) return products.find(p => p.id === productId) || products[1]
    return products[1]
  }, [propProduct, productId])

  // single main image only
  const [qty, setQty] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef(null)
  const mainImgRef = useRef(null)
  const [mainSrc, setMainSrc] = useState(product.image)
  const [flipMain, setFlipMain] = useState(false)
  const [selectedThumb, setSelectedThumb] = useState(0)
  // responsive thumbnail size
  const THUMB_CLASS = 'w-15 h-15 sm:w-14 sm:h-14 md:w-16 md:h-16'
  // prepare thumbnails dynamically based on available images
  const _baseImages = product.images || product.gallery || [product.image]
  const thumbImages = _baseImages.length > 0 ? _baseImages : [product.image]
  const cart = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [product])

  // keep mainSrc in sync when product changes
  useEffect(() => {
    setMainSrc(product.image)
    setFlipMain(false)
    setSelectedThumb(0)
  }, [product])

  const goToIndex = (idx) => {
    const i = (idx + thumbImages.length) % thumbImages.length
    const src = thumbImages[i]
    setMainSrc(src)
    setSelectedThumb(i)
    setFlipMain(false)
    if (mainImgRef.current) mainImgRef.current.src = src
  }

  const prevImage = () => {
    let cur = selectedThumb
    if (mainSrc !== thumbImages[selectedThumb]) {
      const found = thumbImages.findIndex(s => s === mainSrc)
      if (found !== -1) cur = found
    }
    goToIndex(cur - 1)
  }

  const nextImage = () => {
    let cur = selectedThumb
    if (mainSrc !== thumbImages[selectedThumb]) {
      const found = thumbImages.findIndex(s => s === mainSrc)
      if (found !== -1) cur = found
    }
    goToIndex(cur + 1)
  }

  const toggleFavorite = () => {
    setIsFavorite(prev => {
      const next = !prev
      if (next) {
        setToastMsg('Item added to favorites')
        setToastVisible(true)
        if (toastTimer.current) clearTimeout(toastTimer.current)
        toastTimer.current = setTimeout(() => setToastVisible(false), 2500)
      } else {
        setToastMsg('Item removed from favorites')
        setToastVisible(true)
        if (toastTimer.current) clearTimeout(toastTimer.current)
        toastTimer.current = setTimeout(() => setToastVisible(false), 1500)
      }
      return next
    })
  }

  const handleAddToCart = () => {
    if (cart && cart.addItem) {
      cart.addItem(product, { sourceEl: mainImgRef.current, imgSrc: product.image, qty })
    }
    setToastMsg('Added to cart')
    setToastVisible(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 1600)
  }

  const handleBuyNow = () => {
    if (cart && cart.addItem) {
      cart.addItem(product, { sourceEl: mainImgRef.current, imgSrc: product.image, qty })
    }
    // navigate to checkout after a small tick so state updates and animation can start
    setTimeout(() => navigate('/checkout'), 150)
  }

  if (!product) return <div className="p-6">Product not found</div>

  return (
    <>
    <div className="min-h-screen bg-white md:pt-25 font-inter text-[#111] px-3">
      {/* Toast */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${toastVisible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`} role="status" aria-live="polite">
        <div className="bg-black text-gray-400 px-7 py-2 text-sm rounded-md shadow">{toastMsg}</div>
      </div>
      <div className="lg:max-w-8xl mx-auto lg:px-28 py-10 px-0">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-3 px-4 py-2 rounded-md border border-gray-200 bg-white/20 text-sm font-semibold shadow-sm">← Back</Link>

        {/* Top area */}
        <div className="mt-7  lg:ml-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Image */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="relative bg-[hsl(44,45%,98%)] p-0 rounded-xl overflow-hidden">
              {/* previous/next controls */}
              <button onClick={prevImage} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-yellow-300/20 rounded-full border border-gray-300 shadow-sm hover:scale-105">
                <img src={leftIcon} alt="Previous" className="w-5 h-5" />
              </button>

              <button onClick={nextImage} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-yellow-300/20 rounded-full border  border-gray-300 shadow-sm hover:scale-105">
                <img src={rightIcon} alt="Next" className="w-5 h-5" />
              </button>

              <img
                ref={mainImgRef}
                src={mainSrc}
                alt={product.title}
                onError={(e) => {
                  try {
                    if (e.currentTarget.src !== product.image) {
                      e.currentTarget.src = product.image
                    } else {
                      e.currentTarget.style.display = 'none'
                    }
                  } catch (err) { void err }
                }}
                className={`w-full h-[420px] md:h-[600px]  lg:h-[800px]  object-cover  rounded-md ${flipMain ? 'transform -scale-x-100' : ''}`}
                style={undefined}
              />

              {product.soldOut && (
                <img src={soldBadge} alt="Sold out" className="absolute top-4 right-4 w-25 h-25 pointer-events-none z-30" />
              )}

              {/* Thumbnails: use product.images if present, otherwise show the main image */}
              <div className="p-3 flex items-center gap-3">
                {thumbImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMainSrc(src)
                      setFlipMain(false)
                      setSelectedThumb(idx)
                      if (mainImgRef.current) mainImgRef.current.src = src
                    }}
                    className={`${THUMB_CLASS} rounded-md overflow-hidden flex-shrink-0 border ${selectedThumb === idx ? 'ring-2 ring-amber-400 border-transparent' : 'border-gray-100'}`}
                    aria-label={`Show image ${idx + 1}`}>
                    <img src={src} alt={`${product.title} ${idx + 1}`} className={`w-full h-full object-cover`} />
                  </button>
                ))}
              </div>
         
            </div>
          </div>

          {/* Right: Details */}
          <div className="max-w-xl -mt-4 md:mt-3 ml-4 md:ml-0 md:col-span-1 lg:col-span-1">
            <h2 className="text-base  md:text-3xl font-bold tracking-widest uppercase">{product.title}</h2>

            <div className="flex items-center gap-3 mt-3 text-sm text-gray-400">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.75l-6 5.847 1.417 8.27L12 19.77l-7.417 4.097L6 15.597 0 9.75l8.332-1.732z"/></svg>
                ))}
              </div>
              <span className="text-gray-400">({product.rating} reviews)</span>
            </div>

            <div className="md:text-3xl text-xl font-[verdana] font-extrabold text-[#111] mt-6">N{product.price.toLocaleString()}</div>

            <p className="text-gray-500 text-sm leading-7 mt-3 md:mt-6 font-[verdana] md:text-base font-thin ">{PRODUCT_META[product.id]?.description || 'Structured FG product description not available.'}</p>

            <div className="mt-8">
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-2 uppercase">Quantity</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-md border border-gray-200 bg-white/20">−</button>
                  <div className="min-w-[48px] text-center border border-gray-100 rounded-md py-2">{qty}</div>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 rounded-md border border-gray-200 bg-white/20">+</button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={!product.soldOut ? handleAddToCart : undefined}
                disabled={product.soldOut}
                className={`${product.soldOut ? 'flex items-center gap-1 bg-gray-300 text-gray-600 px-4 py-3 rounded-md font-semibold shadow-sm cursor-not-allowed' : 'flex items-center gap-1 bg-black text-xs text-white px-4 py-3 rounded-md font-semibold shadow-sm cursor-pointer hover:opacity-95 hover:scale-[1.01] transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/></svg>
                {product.soldOut ? 'SOLD OUT' : 'ADD TO CART'}
              </button>

              {!product.soldOut && (
                <button onClick={handleBuyNow} className="px-4 py-3 rounded-md border border-black/20 text-xs font-semibold cursor-pointer hover:bg-black hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber-200">BUY NOW</button>
              )}

              <button
                onClick={toggleFavorite}
                aria-pressed={isFavorite}
                className={`w-11 h-11 rounded-md border flex items-center justify-center ${isFavorite ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-gray-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.24 4 9.91 4.81 11 6.09 12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        <h3 className="text-sm tracking-widest font-semibold">YOU MIGHT ALSO LIKE</h3>
        <NewArrival limit={4} className="mt-6" hideTitle product={product} />
    
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Dynamic
