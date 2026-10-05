import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="wrap empty">
      <h1>We could not find that page</h1>
      <p className="muted">The link may be old, or the product may no longer be sold.</p>
      <Link className="btn" to="/shop">Go to the shop</Link>
    </div>
  )
}
