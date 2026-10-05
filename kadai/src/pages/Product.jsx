import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProduct, products, discount } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import ProductCard, { Tile, Stars } from '../components/ProductCard.jsx'
import { money } from '../utils.js'
import { config } from '../config.js'
import NotFound from './NotFound.jsx'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addToCart, toggleWish, wishlist } = useStore()
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  if (!product) return <NotFound />

  const wished = wishlist.includes(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const low = product.stock <= 10

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link> / <Link to={`/shop?cat=${encodeURIComponent(product.category)}`}>{product.category}</Link> / <span>{product.name}</span>
      </nav>
      <div className="detail">
        <Tile product={product} size="xl" />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <Stars rating={product.rating} reviews={product.reviews} />
          <p className="price-row big">
            <strong>{money(product.price)}</strong>
            <s>{money(product.mrp)}</s>
            <span className="off">{discount(product)}% off</span>
          </p>
          <p>{product.desc}</p>
          <p className={low ? 'warn' : 'muted'}>{low ? `Only ${product.stock} left in stock` : 'In stock. Delivers in 2 to 4 days.'}</p>
          <div className="buy-row">
            <div className="qty" role="group" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn" onClick={() => addToCart(product.id, qty)}>Add to cart</button>
            <button className="btn btn-dark" onClick={() => { addToCart(product.id, qty); navigate('/checkout') }}>Buy now</button>
            <button className="btn btn-ghost" onClick={() => toggleWish(product.id)} aria-pressed={wished}>{wished ? 'Saved ♥' : 'Save ♡'}</button>
          </div>
          <ul className="assure">
            <li>Free delivery above {money(config.freeShippingAbove)}</li>
            <li>7-day easy returns</li>
            <li>Cash on delivery available</li>
          </ul>
        </div>
      </div>
      {related.length > 0 && (
        <section>
          <h2>More in {product.category}</h2>
          <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  )
}
