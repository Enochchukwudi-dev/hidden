import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'

const CartContext = createContext()

const initialState = { items: [], count: 0, total: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload
      const existing = state.items.find(i => i.id === item.id)
      let items
      if (existing) {
        items = state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      } else {
        items = [...state.items, { ...item, qty: 1 }]
      }
      const count = items.reduce((s, it) => s + it.qty, 0)
      const total = items.reduce((s, it) => s + (Number(it.price) * it.qty), 0)
      return { items, count, total }
    }
    case 'CLEAR':
      return initialState
    case 'REMOVE': {
      const id = action.payload
      const items = state.items.filter(i => i.id !== id)
      const count = items.reduce((s, it) => s + it.qty, 0)
      const total = items.reduce((s, it) => s + (Number(it.price) * it.qty), 0)
      return { items, count, total }
    }
    case 'DECREMENT_ITEM': {
      const id = action.payload
      const items = state.items.map(i => {
        if (i.id !== id) return i
        // never drop below 1; just clamp at minimum 1
        const newQty = Math.max(1, i.qty - 1)
        return { ...i, qty: newQty }
      })
      const count = items.reduce((s, it) => s + it.qty, 0)
      const total = items.reduce((s, it) => s + (Number(it.price) * it.qty), 0)
      return { items, count, total }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : initialState
    } catch (err) {
      return initialState
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state))
    } catch (err) {
      // ignore write errors
    }
  }, [state])

  const addItem = useCallback((product, opts = {}) => {
    // support adding multiple quantity at once (opts.qty)
    const qty = Math.max(1, Number(opts.qty) || 1)
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product })
    }

    // animation: if caller provides a source element or image src, perform fly-to-cart (once)
    try {
      const sourceEl = opts.sourceEl
      const imgSrc = opts.imgSrc || (product.image || '')
      const cartEl = document.getElementById('cart-icon')
      if (!cartEl) return

      // determine source bounding rect
      let srcRect = null
      if (sourceEl && sourceEl.getBoundingClientRect) srcRect = sourceEl.getBoundingClientRect()
      else if (opts.imgRect) srcRect = opts.imgRect

      if (!srcRect) return

      const cartRect = cartEl.getBoundingClientRect()
      // prefer cloning the actual image node so the flyer looks identical
      let flyer
      if (sourceEl && sourceEl.tagName === 'IMG') {
        flyer = sourceEl.cloneNode(true)
        // remove any ids to avoid duplicates
        flyer.removeAttribute('id')
      } else {
        flyer = document.createElement('img')
        flyer.src = imgSrc
      }

      flyer.style.position = 'fixed'
      flyer.style.left = srcRect.left + 'px'
      flyer.style.top = srcRect.top + 'px'
      flyer.style.width = srcRect.width + 'px'
      flyer.style.height = srcRect.height + 'px'
      flyer.style.borderRadius = '8px'
      flyer.style.boxShadow = '0 10px 24px rgba(0,0,0,0.26)'
      flyer.style.pointerEvents = 'none'
      flyer.style.zIndex = 9999
      flyer.style.transformOrigin = 'center center'
      // make sizing consistent across clones/created images
      flyer.style.objectFit = 'cover'
      // start with no transition, set explicit initial transform/opacity, append, force reflow
      flyer.style.transition = 'none'
      flyer.style.transform = 'translate3d(0px, 0px, 0px) scale(1)'
      flyer.style.opacity = '1'
      flyer.style.willChange = 'transform, opacity'
      document.body.appendChild(flyer)
      // force layout so the browser records the starting state reliably
      // eslint-disable-next-line no-unused-expressions
      flyer.offsetWidth

      // then enable a single, consistent transition for the flight
      const DURATION = 700
      const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'
      flyer.style.transition = `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ease`

      // compute target center
      const targetX = cartRect.left + cartRect.width / 2
      const targetY = cartRect.top + cartRect.height / 2
      const sourceCenterX = srcRect.left + srcRect.width / 2
      const sourceCenterY = srcRect.top + srcRect.height / 2
      const translateX = targetX - sourceCenterX
      const translateY = targetY - sourceCenterY

      // single-step smooth flight to cart (use RAF to ensure transition starts)
      requestAnimationFrame(() => {
        flyer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(0.08)`
      })

      // cleanup fallback: in case transitionend doesn't fire, remove after duration + small buffer
      const cleanupTimer = setTimeout(() => {
        try { flyer.remove() } catch (e) {}
        cartEl.classList.add('cart-bump')
        setTimeout(() => cartEl.classList.remove('cart-bump'), 280)
      }, DURATION + 120)

      flyer.addEventListener('transitionend', () => {
        clearTimeout(cleanupTimer)
        try { flyer.remove() } catch (e) {}
        // bump counter animation
        cartEl.classList.add('cart-bump')
        setTimeout(() => cartEl.classList.remove('cart-bump'), 280)
      }, { once: true })

    } catch (err) {
      // ignore animation errors
      console.error(err)
    }
  }, [])

  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), [])
  const decrementItem = useCallback((id) => dispatch({ type: 'DECREMENT_ITEM', payload: id }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, decrementItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export default CartContext
