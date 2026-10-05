import { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from 'react'
import { getProduct } from '../data/products.js'
import { config } from '../config.js'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

export const COUPONS = config.coupons
export const FREE_SHIPPING_ABOVE = config.freeShippingAbove
export const SHIPPING_FEE = config.shippingFee

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.id === action.id)
      const max = getProduct(action.id)?.stock ?? 99
      if (found) return state.map((i) => (i.id === action.id ? { ...i, qty: Math.min(i.qty + action.qty, max) } : i))
      return [...state, { id: action.id, qty: Math.min(action.qty, max) }]
    }
    case 'set': {
      const max = getProduct(action.id)?.stock ?? 99
      const qty = Math.max(1, Math.min(action.qty, max))
      return state.map((i) => (i.id === action.id ? { ...i, qty } : i))
    }
    case 'remove': return state.filter((i) => i.id !== action.id)
    case 'clear': return []
    default: return state
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, () => load('kadai.cart', []))
  const [wishlist, setWishlist] = useState(() => load('kadai.wishlist', []))
  const [orders, setOrders] = useState(() => load('kadai.orders', []))
  const [coupon, setCoupon] = useState(() => load('kadai.coupon', null))
  const [toast, setToast] = useState(null)

  useEffect(() => save('kadai.cart', cart), [cart])
  useEffect(() => save('kadai.wishlist', wishlist), [wishlist])
  useEffect(() => save('kadai.orders', orders), [orders])
  useEffect(() => save('kadai.coupon', coupon), [coupon])

  const notify = useCallback((message) => setToast({ message, key: Date.now() }), [])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const lines = useMemo(
    () => cart.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product),
    [cart]
  )

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
    const savings = lines.reduce((s, l) => s + (l.product.mrp - l.product.price) * l.qty, 0)
    const couponOff = coupon ? Math.round((subtotal * COUPONS[coupon]) / 100) : 0
    const afterCoupon = subtotal - couponOff
    const shipping = lines.length === 0 || afterCoupon >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE
    return { subtotal, savings, couponOff, shipping, total: afterCoupon + shipping, count: lines.reduce((s, l) => s + l.qty, 0) }
  }, [lines, coupon])

  const value = {
    cart, lines, totals, coupon, orders, wishlist, toast, notify,
    addToCart: (id, qty = 1) => { dispatch({ type: 'add', id, qty }); notify(`Added to cart: ${getProduct(id).name}`) },
    setQty: (id, qty) => dispatch({ type: 'set', id, qty }),
    removeFromCart: (id) => { dispatch({ type: 'remove', id }); notify('Removed from cart') },
    toggleWish: (id) => {
      const had = wishlist.includes(id)
      setWishlist((w) => (had ? w.filter((x) => x !== id) : [...w, id]))
      notify(had ? 'Removed from wishlist' : 'Saved to wishlist')
    },
    applyCoupon: (code) => {
      const c = code.trim().toUpperCase()
      if (COUPONS[c]) { setCoupon(c); notify(`Coupon ${c} applied`); return true }
      return false
    },
    removeCoupon: () => setCoupon(null),
    placeOrder: (details) => {
      const order = {
        id: 'KD' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: lines.map((l) => ({ id: l.id, name: l.product.name, emoji: l.product.emoji, price: l.product.price, qty: l.qty })),
        totals, coupon, ...details
      }
      setOrders((o) => [order, ...o])
      dispatch({ type: 'clear' })
      setCoupon(null)
      return order
    }
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
