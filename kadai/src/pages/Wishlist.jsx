import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { getProduct } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map(getProduct).filter(Boolean)
  if (items.length === 0) {
    return (
      <div className="wrap empty">
        <h1>Your wishlist is empty</h1>
        <p className="muted">Tap the heart on any product to save it for later.</p>
        <Link className="btn" to="/shop">Browse products</Link>
      </div>
    )
  }
  return (
    <div className="wrap">
      <h1>Wishlist</h1>
      <div className="grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  )
}
