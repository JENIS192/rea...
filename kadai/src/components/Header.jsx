import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { config } from '../config.js'

export default function Header() {
  const { totals, wishlist } = useStore()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : '/shop')
  }

  return (
    <header className="header">
      <div className="wrap header-row">
        <Link to="/" className="logo" aria-label={`${config.storeName} home`}>{config.storeName}{config.storeNameLocal && <span lang="ta">{config.storeNameLocal}</span>}</Link>
        <form className="search" onSubmit={onSearch} role="search">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mugs, keyboards, notebooks" aria-label="Search products" />
          <button type="submit">Search</button>
        </form>
        <nav className="nav" aria-label="Main">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/wishlist">Wishlist{wishlist.length > 0 && <b className="pill">{wishlist.length}</b>}</NavLink>
          <NavLink to="/cart">Cart{totals.count > 0 && <b className="pill pill-solid">{totals.count}</b>}</NavLink>
        </nav>
      </div>
    </header>
  )
}
