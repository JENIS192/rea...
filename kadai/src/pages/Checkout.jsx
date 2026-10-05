import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { Summary } from './Cart.jsx'
import { money } from '../utils.js'

const validators = {
  name: (v) => (v.trim().length >= 3 ? '' : 'Enter your full name.'),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address.'),
  phone: (v) => (/^[6-9]\d{9}$/.test(v) ? '' : 'Enter a 10-digit mobile number.'),
  address: (v) => (v.trim().length >= 10 ? '' : 'Enter your full street address.'),
  city: (v) => (v.trim() ? '' : 'Enter your city.'),
  pincode: (v) => (/^\d{6}$/.test(v) ? '' : 'Enter a 6-digit pincode.')
}

export default function Checkout() {
  const { lines, totals, placeOrder } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '', payment: 'upi', upi: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  if (lines.length === 0) {
    return (
      <div className="wrap empty">
        <h1>Nothing to check out</h1>
        <p className="muted">Your cart is empty.</p>
        <Link className="btn" to="/shop">Browse products</Link>
      </div>
    )
  }

  const set = (k) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [k]: value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: validators[k]?.(value) || '' }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = {}
    Object.keys(validators).forEach((k) => { const m = validators[k](form[k]); if (m) found[k] = m })
    if (form.payment === 'upi' && !/^[\w.-]+@[\w]+$/.test(form.upi)) found.upi = 'Enter a valid UPI ID, like name@bank.'
    setErrors(found)
    if (Object.keys(found).length) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setBusy(true)
    setTimeout(() => {
      const { upi, ...rest } = form
      const order = placeOrder({ customer: rest })
      navigate(`/success/${order.id}`)
    }, 900)
  }

  const field = ({ id, label, type = 'text', ...rest }) => (
    <label className="field" key={id}>{label}
      <input id={id} type={type} value={form[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} {...rest} />
      {errors[id] && <span className="error" id={`${id}-err`}>{errors[id]}</span>}
    </label>
  )

  return (
    <div className="wrap two-col">
      <form onSubmit={submit} noValidate>
        <h1>Checkout</h1>
        <fieldset>
          <legend>Delivery address</legend>
          {field({ id: 'name', label: 'Full name', autoComplete: 'name' })}
          <div className="row2">
            {field({ id: 'email', label: 'Email', type: 'email', autoComplete: 'email' })}
            {field({ id: 'phone', label: 'Mobile number', type: 'tel', inputMode: 'numeric', maxLength: 10, autoComplete: 'tel' })}
          </div>
          {field({ id: 'address', label: 'Street address', autoComplete: 'street-address' })}
          <div className="row2">
            {field({ id: 'city', label: 'City', autoComplete: 'address-level2' })}
            {field({ id: 'pincode', label: 'Pincode', inputMode: 'numeric', maxLength: 6, autoComplete: 'postal-code' })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment</legend>
          {[['upi', 'UPI'], ['cod', 'Cash on delivery'], ['card', 'Credit or debit card']].map(([v, l]) => (
            <label key={v} className="radio"><input type="radio" name="payment" value={v} checked={form.payment === v} onChange={set('payment')} /> {l}</label>
          ))}
          {form.payment === 'upi' && field({ id: 'upi', label: 'UPI ID', placeholder: 'name@bank' })}
          {form.payment === 'card' && <p className="muted small">This is a demo store. Card details are not collected; your order is placed as pay-on-delivery.</p>}
        </fieldset>

        <button className="btn btn-dark btn-block" type="submit" disabled={busy}>
          {busy ? 'Placing your order…' : `Place order · ${money(totals.total)}`}
        </button>
      </form>
      <Summary showCoupon={false} />
    </div>
  )
}
