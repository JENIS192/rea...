import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { money } from '../utils.js'

export default function Orders() {
  const { orders } = useStore()
  if (orders.length === 0) {
    return (
      <div className="wrap empty">
        <h1>No orders yet</h1>
        <p className="muted">Orders you place will be listed here.</p>
        <Link className="btn" to="/shop">Start shopping</Link>
      </div>
    )
  }
  return (
    <div className="wrap narrow">
      <h1>Your orders</h1>
      {orders.map((o) => (
        <article key={o.id} className="order">
          <header>
            <div><strong>{o.id}</strong><span className="muted small"> placed on {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
            <strong>{money(o.totals.total)}</strong>
          </header>
          <ul className="lines compact">
            {o.items.map((i) => (
              <li key={i.id}><Link to={`/product/${i.id}`}>{i.emoji} {i.name} × {i.qty}</Link><span>{money(i.price * i.qty)}</span></li>
            ))}
          </ul>
          <p className="muted small">Delivering to {o.customer.address}, {o.customer.city} {o.customer.pincode}</p>
        </article>
      ))}
    </div>
  )
}
