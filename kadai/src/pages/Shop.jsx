import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products, categories, discount } from '../data/products.js'

const sorters = {
  featured: () => 0,
  popular: (a, b) => b.reviews - a.reviews,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  discount: (a, b) => discount(b) - discount(a)
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || ''
  const sort = params.get('sort') || 'featured'
  const max = Number(params.get('max')) || 5000

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value); else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const term = q.toLowerCase()
    return products
      .filter((p) => (!cat || p.category === cat) && p.price <= max && (!term || `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(term)))
      .sort(sorters[sort] || sorters.featured)
  }, [q, cat, sort, max])

  return (
    <div className="wrap shop">
      <aside className="filters" aria-label="Filters">
        <h2>Filters</h2>
        <label className="field">Category
          <select value={cat} onChange={(e) => update('cat', e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="field">Price up to ₹{max.toLocaleString('en-IN')}
          <input type="range" min="200" max="5000" step="100" value={max} onChange={(e) => update('max', e.target.value === '5000' ? '' : e.target.value)} />
        </label>
        <button className="btn btn-ghost" onClick={() => setParams({})}>Clear filters</button>
      </aside>

      <section>
        <div className="section-head">
          <h1 className="h2">{cat || 'All products'}{q && <> matching “{q}”</>} <span className="muted small">{list.length} items</span></h1>
          <label className="field inline">Sort by
            <select value={sort} onChange={(e) => update('sort', e.target.value === 'featured' ? '' : e.target.value)}>
              <option value="featured">Featured</option>
              <option value="popular">Most reviewed</option>
              <option value="rating">Top rated</option>
              <option value="discount">Biggest discount</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
        {list.length === 0 ? (
          <div className="empty">
            <h2>No products match</h2>
            <p className="muted">Try a shorter search or raise the price limit.</p>
            <Link className="btn" to="/shop">Show all products</Link>
          </div>
        ) : (
          <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>
    </div>
  )
}
