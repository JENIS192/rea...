import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, FREE_SHIPPING_ABOVE } from '../context/StoreContext.jsx'
import { Tile } from '../components/ProductCard.jsx'
import { money } from '../utils.js'
import { firstCoupon } from '../config.js'

export function Summary({ showCoupon = true }) {
  const { totals, coupon, applyCoupon, removeCoupon } = useStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const remaining = FREE_SHIPPING_ABOVE - (totals.subtotal - totals.couponOff)

  const submit = (e) => {
    e.preventDefault()
    setError(applyCoupon(code) ? '' : `That code is not valid.${firstCoupon ? ` Try ${firstCoupon}.` : ''}`)
    setCode('')
  }

  return (
    <aside className="summary" aria-label="Order summary">
      <h2>Order summary</h2>
      {showCoupon && (coupon ? (
        <p className="coupon-on">Code {coupon} applied <button className="link" onClick={removeCoupon}>Remove</button></p>
      ) : (
        <form className="coupon" onSubmit={submit}>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" />
          <button className="btn btn-ghost" type="submit" disabled={!code.trim()}>Apply</button>
        </form>
      ))}
      {error && <p className="error" role="alert">{error}</p>}
      <dl>
        <div><dt>Subtotal ({totals.count} items)</dt><dd>{money(totals.subtotal)}</dd></div>
        {totals.couponOff > 0 && <div className="good"><dt>Coupon discount</dt><dd>−{money(totals.couponOff)}</dd></div>}
        <div><dt>Delivery</dt><dd>{totals.shipping === 0 ? 'Free' : money(totals.shipping)}</dd></div>
        <div className="total"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
      </dl>
      {totals.savings > 0 && <p className="good small">You save {money(totals.savings + totals.couponOff)} on this order.</p>}
      {totals.count > 0 && remaining > 0 && <p className="muted small">Add {money(remaining)} more for free delivery.</p>}
    </aside>
  )
}

export default function Cart() {
  const { lines, setQty, removeFromCart } = useStore()

  if (lines.length === 0) {
    return (
      <div className="wrap empty">
        <h1>Your cart is empty</h1>
        <p className="muted">Add something you like and it will show up here.</p>
        <Link className="btn" to="/shop">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="wrap two-col">
      <section>
        <h1>Your cart</h1>
        <ul className="lines">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="line">
              <Tile product={p} size="sm" />
              <div className="line-info">
                <Link to={`/product/${p.id}`}>{p.name}</Link>
                <span className="muted small">{money(p.price)} each</span>
                <button className="link" onClick={() => removeFromCart(p.id)}>Remove</button>
              </div>
              <div className="qty" role="group" aria-label={`Quantity of ${p.name}`}>
                <button onClick={() => (qty === 1 ? removeFromCart(p.id) : setQty(p.id, qty - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(p.id, qty + 1)} disabled={qty >= p.stock} aria-label="Increase quantity">+</button>
              </div>
              <strong className="line-total">{money(p.price * qty)}</strong>
            </li>
          ))}
        </ul>
      </section>
      <div>
        <Summary />
        <Link className="btn btn-block btn-dark" to="/checkout">Go to checkout</Link>
      </div>
    </div>
  )
}
