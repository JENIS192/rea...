export const categories = ['Home', 'Kitchen', 'Tech', 'Fitness', 'Stationery', 'Personal care']

export const products = [
  { id: 1, name: 'Stoneware Mug Set (4)', category: 'Kitchen', price: 899, mrp: 1299, rating: 4.6, reviews: 412, emoji: '☕', color: '#F6D8B8', stock: 24, desc: 'Four hand-glazed 300 ml mugs. Microwave and dishwasher safe, with a comfortable wide handle.' },
  { id: 2, name: 'Cast Iron Skillet 10"', category: 'Kitchen', price: 1799, mrp: 2499, rating: 4.8, reviews: 1033, emoji: '🍳', color: '#CFD6DE', stock: 12, desc: 'Pre-seasoned skillet that works on gas, induction and oven. Gets better with every meal.' },
  { id: 3, name: 'Bamboo Desk Organiser', category: 'Stationery', price: 649, mrp: 899, rating: 4.4, reviews: 198, emoji: '🗂️', color: '#D9E8C4', stock: 40, desc: 'Five compartments for pens, phone, notes and cables. Natural bamboo with a smooth finish.' },
  { id: 4, name: 'Wireless Earbuds Air', category: 'Tech', price: 2499, mrp: 3999, rating: 4.3, reviews: 2210, emoji: '🎧', color: '#C9D8F5', stock: 30, desc: 'Bluetooth 5.3, 28 hours of battery with the case, and touch controls. IPX4 splash resistant.' },
  { id: 5, name: 'Mechanical Keyboard 75%', category: 'Tech', price: 4299, mrp: 5499, rating: 4.7, reviews: 640, emoji: '⌨️', color: '#E2D4F2', stock: 9, desc: 'Hot-swappable switches, PBT keycaps and a compact layout that keeps your mouse close.' },
  { id: 6, name: 'Yoga Mat 6 mm', category: 'Fitness', price: 799, mrp: 1199, rating: 4.5, reviews: 876, emoji: '🧘', color: '#F5C9D0', stock: 50, desc: 'Non-slip, closed-cell surface with an alignment line. Comes with a carry strap.' },
  { id: 7, name: 'Steel Water Bottle 1 L', category: 'Fitness', price: 549, mrp: 799, rating: 4.6, reviews: 1522, emoji: '🧴', color: '#C6EBE6', stock: 80, desc: 'Double-wall insulated. Keeps drinks cold for 24 hours and hot for 12.' },
  { id: 8, name: 'Adjustable Dumbbells 20 kg', category: 'Fitness', price: 3999, mrp: 5299, rating: 4.4, reviews: 301, emoji: '🏋️', color: '#D5D9DD', stock: 7, desc: 'Two handles and eight plates in a pair. Locks with a quick-turn collar.' },
  { id: 9, name: 'Linen Throw Blanket', category: 'Home', price: 1499, mrp: 1999, rating: 4.5, reviews: 255, emoji: '🛋️', color: '#F2E3C6', stock: 18, desc: 'Washed linen-cotton blend, 130 x 180 cm. Light enough for summer evenings.' },
  { id: 10, name: 'Scented Soy Candle', category: 'Home', price: 499, mrp: 699, rating: 4.7, reviews: 944, emoji: '🕯️', color: '#F8DCC8', stock: 60, desc: 'Sandalwood and cardamom. 45 hour burn time in a reusable glass jar.' },
  { id: 11, name: 'Ceramic Plant Pot Trio', category: 'Home', price: 749, mrp: 999, rating: 4.3, reviews: 167, emoji: '🪴', color: '#CDE7CF', stock: 33, desc: 'Three sizes with drainage holes and bamboo saucers. Plants not included.' },
  { id: 12, name: 'Dotted Notebook A5', category: 'Stationery', price: 299, mrp: 399, rating: 4.8, reviews: 2051, emoji: '📓', color: '#C8D3F0', stock: 120, desc: '160 pages of 100 gsm paper that handles fountain pens. Lays flat when open.' },
  { id: 13, name: 'Gel Pen Pack (10)', category: 'Stationery', price: 199, mrp: 249, rating: 4.5, reviews: 780, emoji: '🖊️', color: '#F3D1E4', stock: 200, desc: 'Ten 0.5 mm gel pens in assorted colours with quick-dry ink.' },
  { id: 14, name: 'Beard & Hair Trimmer', category: 'Personal care', price: 1299, mrp: 1899, rating: 4.2, reviews: 1309, emoji: '💈', color: '#D3DDE6', stock: 26, desc: 'Cordless with 40 length settings, washable head and a 90 minute run time.' },
  { id: 15, name: 'Herbal Face Wash 150 ml', category: 'Personal care', price: 249, mrp: 320, rating: 4.1, reviews: 4120, emoji: '🧼', color: '#D7EEC9', stock: 150, desc: 'Neem and tulsi gel wash. Soap-free and gentle enough for daily use.' },
  { id: 16, name: 'USB-C Fast Charger 65 W', category: 'Tech', price: 1199, mrp: 1799, rating: 4.6, reviews: 1655, emoji: '🔌', color: '#FBE3A8', stock: 45, desc: 'GaN charger with two USB-C ports and one USB-A. Charges a laptop and phone together.' }
]

export const getProduct = (id) => products.find((p) => p.id === Number(id))
export const discount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100)
