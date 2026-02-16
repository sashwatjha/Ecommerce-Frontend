import { useEffect, useState, useRef } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const FIVE_HOURS = 5 * 60 * 60 // seconds

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  flash?: boolean
}

const products: Product[] = [
  // Electronics
  { id: 1, name: 'Wireless Headphones', price: 2999, originalPrice: 5999, image: 'https://picsum.photos/id/367/400/400', category: 'Electronics', rating: 4.5, flash: true },
  { id: 3, name: 'Smart Watch', price: 7999, image: 'https://picsum.photos/id/175/400/400', category: 'Electronics', rating: 4.3 },
  { id: 6, name: 'Bluetooth Speaker', price: 3499, image: 'https://picsum.photos/id/60/400/400', category: 'Electronics', rating: 4.4 },
  { id: 9, name: 'Laptop Stand', price: 1299, image: 'https://picsum.photos/id/180/400/400', category: 'Electronics', rating: 4.4 },
  // Fashion
  { id: 2, name: 'Running Shoes', price: 4999, originalPrice: 8999, image: 'https://picsum.photos/id/21/400/400', category: 'Fashion', rating: 4.7, flash: true },
  { id: 5, name: 'Sunglasses', price: 2499, originalPrice: 4999, image: 'https://picsum.photos/id/490/400/400', category: 'Fashion', rating: 4.1, flash: true },
  { id: 8, name: 'Denim Jacket', price: 3999, image: 'https://picsum.photos/id/325/400/400', category: 'Fashion', rating: 4.8 },
  // Accessories
  { id: 4, name: 'Backpack', price: 1999, image: 'https://picsum.photos/id/111/400/400', category: 'Accessories', rating: 4.6 },
  { id: 7, name: 'Leather Wallet', price: 1499, image: 'https://picsum.photos/id/160/400/400', category: 'Accessories', rating: 4.2 },
  // Fitness
  { id: 10, name: 'Yoga Mat', price: 899, originalPrice: 1799, image: 'https://picsum.photos/id/119/400/400', category: 'Fitness', rating: 4.6, flash: true },
  { id: 12, name: 'Resistance Bands', price: 599, image: 'https://picsum.photos/id/116/400/400', category: 'Fitness', rating: 4.5 },
  // Home
  { id: 11, name: 'Ceramic Mug Set', price: 699, image: 'https://picsum.photos/id/225/400/400', category: 'Home', rating: 4.3 },
  { id: 13, name: 'Table Lamp', price: 1899, originalPrice: 2999, image: 'https://picsum.photos/id/36/400/400', category: 'Home', rating: 4.7, flash: true },

  // ── 10 New Categories, 4 products each ──

  // Books
  { id: 14, name: 'Mystery Novel', price: 399, image: 'https://picsum.photos/id/24/400/400', category: 'Books', rating: 4.5 },
  { id: 15, name: 'Cookbook Collection', price: 599, image: 'https://picsum.photos/id/42/400/400', category: 'Books', rating: 4.3 },
  { id: 16, name: 'Science Fiction Set', price: 899, originalPrice: 1499, image: 'https://picsum.photos/id/46/400/400', category: 'Books', rating: 4.7, flash: true },
  { id: 17, name: 'Self-Help Guide', price: 349, image: 'https://picsum.photos/id/48/400/400', category: 'Books', rating: 4.2 },

  // Beauty
  { id: 18, name: 'Face Moisturizer', price: 799, image: 'https://picsum.photos/id/96/400/400', category: 'Beauty', rating: 4.4 },
  { id: 19, name: 'Lipstick Set', price: 1299, originalPrice: 1999, image: 'https://picsum.photos/id/97/400/400', category: 'Beauty', rating: 4.6, flash: true },
  { id: 20, name: 'Perfume Spray', price: 2499, image: 'https://picsum.photos/id/99/400/400', category: 'Beauty', rating: 4.5 },
  { id: 21, name: 'Hair Serum', price: 649, image: 'https://picsum.photos/id/100/400/400', category: 'Beauty', rating: 4.1 },

  // Sports
  { id: 22, name: 'Cricket Bat', price: 3499, image: 'https://picsum.photos/id/103/400/400', category: 'Sports', rating: 4.6 },
  { id: 23, name: 'Football', price: 1299, image: 'https://picsum.photos/id/104/400/400', category: 'Sports', rating: 4.4 },
  { id: 24, name: 'Badminton Racket', price: 1899, originalPrice: 2999, image: 'https://picsum.photos/id/106/400/400', category: 'Sports', rating: 4.3, flash: true },
  { id: 25, name: 'Sports Water Bottle', price: 499, image: 'https://picsum.photos/id/107/400/400', category: 'Sports', rating: 4.5 },

  // Toys
  { id: 26, name: 'Building Blocks Set', price: 1499, image: 'https://picsum.photos/id/132/400/400', category: 'Toys', rating: 4.7 },
  { id: 27, name: 'RC Car', price: 2499, originalPrice: 3999, image: 'https://picsum.photos/id/133/400/400', category: 'Toys', rating: 4.5, flash: true },
  { id: 28, name: 'Board Game', price: 899, image: 'https://picsum.photos/id/134/400/400', category: 'Toys', rating: 4.3 },
  { id: 29, name: 'Stuffed Teddy Bear', price: 699, image: 'https://picsum.photos/id/135/400/400', category: 'Toys', rating: 4.6 },

  // Kitchen
  { id: 30, name: 'Non-Stick Pan', price: 1299, image: 'https://picsum.photos/id/139/400/400', category: 'Kitchen', rating: 4.4 },
  { id: 31, name: 'Blender', price: 2999, originalPrice: 4499, image: 'https://picsum.photos/id/142/400/400', category: 'Kitchen', rating: 4.6, flash: true },
  { id: 32, name: 'Knife Set', price: 1799, image: 'https://picsum.photos/id/143/400/400', category: 'Kitchen', rating: 4.5 },
  { id: 33, name: 'Spice Rack', price: 999, image: 'https://picsum.photos/id/145/400/400', category: 'Kitchen', rating: 4.2 },

  // Stationery
  { id: 34, name: 'Notebook Set', price: 299, image: 'https://picsum.photos/id/153/400/400', category: 'Stationery', rating: 4.3 },
  { id: 35, name: 'Pen Collection', price: 599, image: 'https://picsum.photos/id/155/400/400', category: 'Stationery', rating: 4.4 },
  { id: 36, name: 'Desk Organizer', price: 899, originalPrice: 1399, image: 'https://picsum.photos/id/156/400/400', category: 'Stationery', rating: 4.5, flash: true },
  { id: 37, name: 'Highlighter Pack', price: 199, image: 'https://picsum.photos/id/157/400/400', category: 'Stationery', rating: 4.1 },

  // Travel
  { id: 38, name: 'Travel Pillow', price: 599, image: 'https://picsum.photos/id/164/400/400', category: 'Travel', rating: 4.3 },
  { id: 39, name: 'Luggage Bag', price: 4999, originalPrice: 7999, image: 'https://picsum.photos/id/165/400/400', category: 'Travel', rating: 4.7, flash: true },
  { id: 40, name: 'Passport Holder', price: 499, image: 'https://picsum.photos/id/167/400/400', category: 'Travel', rating: 4.2 },
  { id: 41, name: 'Packing Cubes Set', price: 799, image: 'https://picsum.photos/id/168/400/400', category: 'Travel', rating: 4.4 },

  // Gardening
  { id: 42, name: 'Plant Pot Set', price: 899, image: 'https://picsum.photos/id/200/400/400', category: 'Gardening', rating: 4.5 },
  { id: 43, name: 'Garden Tool Kit', price: 1499, image: 'https://picsum.photos/id/201/400/400', category: 'Gardening', rating: 4.6 },
  { id: 44, name: 'Watering Can', price: 399, image: 'https://picsum.photos/id/204/400/400', category: 'Gardening', rating: 4.2 },
  { id: 45, name: 'Indoor Herb Kit', price: 1199, originalPrice: 1799, image: 'https://picsum.photos/id/206/400/400', category: 'Gardening', rating: 4.4, flash: true },

  // Automotive
  { id: 46, name: 'Car Phone Mount', price: 699, image: 'https://picsum.photos/id/210/400/400', category: 'Automotive', rating: 4.3 },
  { id: 47, name: 'Dash Cam', price: 3999, originalPrice: 5999, image: 'https://picsum.photos/id/211/400/400', category: 'Automotive', rating: 4.7, flash: true },
  { id: 48, name: 'Car Vacuum Cleaner', price: 2499, image: 'https://picsum.photos/id/212/400/400', category: 'Automotive', rating: 4.4 },
  { id: 49, name: 'Seat Cushion', price: 999, image: 'https://picsum.photos/id/213/400/400', category: 'Automotive', rating: 4.2 },

  // Pet Supplies
  { id: 50, name: 'Dog Leash', price: 499, image: 'https://picsum.photos/id/237/400/400', category: 'Pet Supplies', rating: 4.5 },
  { id: 51, name: 'Cat Toy Set', price: 399, image: 'https://picsum.photos/id/219/400/400', category: 'Pet Supplies', rating: 4.3 },
  { id: 52, name: 'Pet Bed', price: 1999, originalPrice: 2999, image: 'https://picsum.photos/id/244/400/400', category: 'Pet Supplies', rating: 4.6, flash: true },
  { id: 53, name: 'Dog Food Bowl', price: 349, image: 'https://picsum.photos/id/247/400/400', category: 'Pet Supplies', rating: 4.4 },
]

const categories = ['All', ...new Set(products.map((p) => p.category))]

function App() {
  const [siteName, setSiteName] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [timeLeft, setTimeLeft] = useState(FIVE_HOURS)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${API_URL}/backend`)
      .then((res) => res.text())
      .then((text) => setSiteName(text))
      .catch((err) => console.error('Failed to fetch:', err))
  }, [])

  // 5-hour countdown timer — restarts when it hits 0
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? FIVE_HOURS : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = 260
    carouselRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const flashProducts = products.filter((p) => p.flash)

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="app">
      {/* Flash Sale Banner */}
      <div className="flash-banner">
        <span className="flash-icon">⚡</span>
        FLASH SALE — Up to 50% OFF on selected items! Limited time only
        <span className="flash-icon">⚡</span>
      </div>

      {/* Search Below Flash Sale */}
      <div className="top-search">
        <input
          type="text"
          placeholder="Search for products, brands and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="top-search-input"
        />
        <button className="top-search-btn">🔍</button>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="brand">{siteName || 'Loading...'}</h1>

          <div className="nav-links">
            <span className="nav-link">Home</span>
            <span className="nav-link">Products</span>
            <span className="nav-link" onClick={() => setShowLogin(true)}>Login</span>
            <span className="nav-link signup-link" onClick={() => setShowSignup(true)}>Create Account</span>
            <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn modal-close" onClick={() => setShowLogin(false)}>✕</button>
            <h2 className="modal-title">Login</h2>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setShowLogin(false) }}>
              <input type="email" placeholder="Email address" className="modal-input" required />
              <input type="password" placeholder="Password" className="modal-input" required />
              <button type="submit" className="modal-submit">Login</button>
            </form>
            <p className="modal-switch">
              Don't have an account?{' '}
              <span onClick={() => { setShowLogin(false); setShowSignup(true) }}>Create one</span>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn modal-close" onClick={() => setShowSignup(false)}>✕</button>
            <h2 className="modal-title">Create Account</h2>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setShowSignup(false) }}>
              <input type="text" placeholder="Full name" className="modal-input" required />
              <input type="email" placeholder="Email address" className="modal-input" required />
              <input type="password" placeholder="Password" className="modal-input" required />
              <input type="password" placeholder="Confirm password" className="modal-input" required />
              <button type="submit" className="modal-submit">Create Account</button>
            </form>
            <p className="modal-switch">
              Already have an account?{' '}
              <span onClick={() => { setShowSignup(false); setShowLogin(true) }}>Login</span>
            </p>
          </div>
        </div>
      )}

      {/* Timer Sale Hero + Carousel */}
      {!searchQuery && (
      <section className="timer-hero">
        <div className="timer-content">
          <h2 className="timer-title">🔥 Mega Sale is LIVE!</h2>
          <p className="timer-sub">Grab deals before time runs out</p>
          <div className="timer-boxes">
            <div className="timer-box">
              <span className="timer-num">{String(hours).padStart(2, '0')}</span>
              <span className="timer-label">Hours</span>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-box">
              <span className="timer-num">{String(minutes).padStart(2, '0')}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-box">
              <span className="timer-num">{String(seconds).padStart(2, '0')}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
        </div>

        {/* Sale Carousel */}
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={() => scrollCarousel('left')}>&#10094;</button>
          <div className="carousel-track" ref={carouselRef}>
            {flashProducts.map((product) => (
              <div key={product.id} className="carousel-card">
                <div className="flash-badge">SALE</div>
                <img src={product.image} alt={product.name} className="carousel-img" />
                <div className="carousel-info">
                  <h3>{product.name}</h3>
                  <div className="price-group">
                    <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={() => scrollCarousel('right')}>&#10095;</button>
        </div>
      </section>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Your Cart</h3>
              <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="cart-empty">Your cart is empty</p>
            ) : (
              <>
                <ul className="cart-items">
                  {cart.map((item, idx) => (
                    <li key={idx} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <span>{item.name}</span>
                        <span className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(idx)}>✕</button>
                    </li>
                  ))}
                </ul>
                <div className="cart-footer">
                  <span className="cart-total">Total: ₹{totalPrice.toLocaleString('en-IN')}</span>
                  <button className="checkout-btn">Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <section className="categories" id="products">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Product Grid */}
      <section className="product-grid">
        {filtered.length === 0 ? (
          <p className="no-results">No products found for "{searchQuery}"</p>
        ) : (
          filtered.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} <span>{product.rating}</span></div>
                <div className="product-bottom">
                  <div className="price-group">
                    <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{siteName || 'Store'}</h4>
            <p>Your one-stop shop for everything you need.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Products</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>support@{(siteName || 'store').toLowerCase()}.com</li>
              <li>+91 00000000</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 {siteName || 'Store'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
