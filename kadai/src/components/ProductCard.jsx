import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { discount } from '../data/products.js'
import { money } from '../utils.js'

export function Tile({ product, size = 'md' }) {
  return (
    <div className={`tile tile-${size}`} style={{ background: product.color }} aria-hidden="true">
      <span>{product.emoji}</span>
    </div>
  )
}

export function Stars({ rating, reviews }) {
  return <span className="stars" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>★ {rating} <i>({reviews.toLocaleString('en-IN')})</i></span>
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWish, wishlist } = useStore()
  const wished = wishlist.includes(product.id)
  return (
    <article className="card">
      <button className={`heart ${wished ? 'on' : ''}`} onClick={() => toggleWish(product.id)} aria-pressed={wished} aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}>
        {wished ? '♥' : '♡'}
      </button>
      <Link to={`/product/${product.id}`} className="card-link">
        <Tile product={product} />
        <h3>{product.name}</h3>
      </Link>
      <Stars rating={product.rating} reviews={product.reviews} />
      <p className="price-row">
        <strong>{money(product.price)}</strong>
        <s>{money(product.mrp)}</s>
        <span className="off">{discount(product)}% off</span>
      </p>
      <button className="btn btn-block" onClick={() => addToCart(product.id)} disabled={product.stock === 0}>
        {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
      </button>
    </article>
  )
}
