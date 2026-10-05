import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'
import { config, firstCoupon } from '../config.js'
import { money } from '../utils.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="logo">{config.storeName}{config.storeNameLocal && <span lang="ta">{config.storeNameLocal}</span>}</p>
          <p className="muted">{config.tagline} Free delivery on orders above {money(config.freeShippingAbove)}.</p>
        </div>
        <div>
          <h4>Shop by category</h4>
          {categories.map((c) => <Link key={c} to={`/shop?cat=${encodeURIComponent(c)}`}>{c}</Link>)}
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/orders">Track your orders</Link>
          {firstCoupon && <Link to="/cart">Use code {firstCoupon}</Link>}
          <span className="muted">7-day easy returns</span>
          {config.supportEmail && <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>}
        </div>
      </div>
      <div className="wrap muted small">© {new Date().getFullYear()} {config.storeName}. Demo store: no real payments are taken.</div>
    </footer>
  )
}
