import { Link } from 'react-router-dom'
import ProductCard, { Tile } from '../components/ProductCard.jsx'
import { products, categories } from '../data/products.js'
import { config, firstCoupon } from '../config.js'
import { money } from '../utils.js'

const collage = [5, 1, 10, 4, 12, 7]

export default function Home() {
  const top = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)
  const deals = [...products].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp).slice(0, 4)
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{config.tagline}</h1>
          <p>{products.length} products we would keep on our own desks and shelves. Free delivery above {money(config.freeShippingAbove)} and seven-day returns.</p>
          <div className="hero-actions">
            <Link className="btn" to="/shop">Shop all products</Link>
            {firstCoupon && <Link className="btn btn-ghost" to="/cart">Use code {firstCoupon} at checkout</Link>}
          </div>
        </div>
        <div className="collage" aria-hidden="true">
          {collage.map((id) => <Tile key={id} product={products.find((p) => p.id === id)} size="lg" />)}
        </div>
      </section>

      <section className="wrap">
        <h2>Shop by category</h2>
        <div className="cat-row">
          {categories.map((c) => (
            <Link key={c} className="chip" to={`/shop?cat=${encodeURIComponent(c)}`}>{c}</Link>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="section-head"><h2>Most reviewed</h2><Link to="/shop?sort=popular">See all</Link></div>
        <div className="grid">{top.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="wrap">
        <div className="section-head"><h2>Biggest discounts</h2><Link to="/shop?sort=discount">See all</Link></div>
        <div className="grid">{deals.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="wrap perks">
        <div><h3>Free delivery</h3><p className="muted">On every order above {money(config.freeShippingAbove)}.</p></div>
        <div><h3>7-day returns</h3><p className="muted">Changed your mind? Send it back.</p></div>
        <div><h3>Pay your way</h3><p className="muted">UPI, card or cash on delivery.</p></div>
      </section>
    </>
  )
}
