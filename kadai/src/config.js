const env = import.meta.env
const num = (v, fallback) => (v !== undefined && v !== '' && Number.isFinite(Number(v)) ? Number(v) : fallback)

const parseCoupons = (raw = 'KADAI10:10') =>
  Object.fromEntries(
    raw.split(',')
      .map((pair) => pair.split(':').map((s) => s.trim()))
      .filter(([code, pct]) => code && Number.isFinite(Number(pct)))
      .map(([code, pct]) => [code.toUpperCase(), Number(pct)])
  )

export const config = {
  storeName: env.VITE_STORE_NAME || 'kadai',
  storeNameLocal: env.VITE_STORE_NAME_TA || '',
  tagline: env.VITE_TAGLINE || 'Everyday things, picked well.',
  supportEmail: env.VITE_SUPPORT_EMAIL || '',
  currency: env.VITE_CURRENCY || 'INR',
  locale: env.VITE_LOCALE || 'en-IN',
  freeShippingAbove: num(env.VITE_FREE_SHIPPING_ABOVE, 999),
  shippingFee: num(env.VITE_SHIPPING_FEE, 49),
  coupons: parseCoupons(env.VITE_COUPONS)
}
export const firstCoupon = Object.keys(config.coupons)[0]
