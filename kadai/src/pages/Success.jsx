import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { money } from '../utils.js'
import NotFound from './NotFound.jsx'

export default function Success() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((o) => o.id === id)
  if (!order) return <NotFound />
  const eta = new Date(new Date(order.date).getTime() + 4 * 864e5).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <div className="wrap narrow">
      <div className="success">
        <p className="tick" aria-hidden="true">✓</p>
        <h1>Order placed</h1>
        <p>Thank you, {order.customer.name.split(' ')[0]}. Your order <strong>{order.id}</strong> will arrive by {eta}.</p>
        <p className="muted">We will send updates to {order.customer.email}.</p>
        <ul className="lines compact">
          {order.items.map((i) => <li key={i.id}><span>{i.emoji} {i.name} × {i.qty}</span><span>{money(i.price * i.qty)}</span></li>)}
          <li className="total"><span>Total paid on {order.customer.payment === 'upi' ? 'UPI' : 'delivery'}</span><strong>{money(order.totals.total)}</strong></li>
        </ul>
        <div className="hero-actions">
          <Link className="btn" to="/orders">View my orders</Link>
          <Link className="btn btn-ghost" to="/shop">Keep shopping</Link>
        </div>
      </div>
    </div>
  )
}
