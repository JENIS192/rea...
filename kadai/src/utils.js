import { config } from './config.js'

const inr = new Intl.NumberFormat(config.locale, { style: 'currency', currency: config.currency, maximumFractionDigits: 0 })
export const money = (n) => inr.format(n)
