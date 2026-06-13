// ── SHARED LAYOUT INJECTION ──
function injectLayout() {
  const marqueeItems = Array(8).fill(
    '<span>FREE SHIPPING ON ORDERS OVER $50</span><span class="dot">★</span><span>NEW ARRIVALS EVERY WEEK</span><span class="dot">★</span><span>RETRO GAMING STORE</span><span class="dot">★</span>'
  ).join('');

  const navbarHTML = `
    <div class="marquee-bar">
      <div class="marquee-track">${marqueeItems}</div>
    </div>
    <nav class="navbar">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="6" width="20" height="12" rx="2"/>
            <path d="M6 12h4M8 10v4M15 11h2M15 13h2"/>
          </svg>
          GAMING<br>ONLINE
        </a>
        <div class="nav-links">
          <a href="catalog.html?category=PC+Games">PC Games</a>
          <a href="catalog.html?category=Console+Games">Console Games</a>
          <a href="catalog.html?category=Accessories">Accessories</a>
          <a href="catalog.html?category=Gift+Cards">Gift Cards</a>
        </div>
        <div class="nav-actions">
          <button class="btn-search" title="Search">🔍</button>
          <button class="btn-cart" title="Open cart" style="position:relative;">
            🛒
            <span class="cart-badge" id="cart-badge-nav">0</span>
          </button>
        </div>
      </div>
    </nav>
  `;

  const searchOverlayHTML = `
    <div class="search-overlay" id="search-overlay">
      <div class="search-box">
        <input type="text" id="search-input-main" placeholder="SEARCH GAMES, ACCESSORIES..." autocomplete="off">
        <div class="search-results" id="search-results"></div>
      </div>
    </div>
  `;

  const cartDrawerHTML = `
    <div class="cart-overlay" id="cart-overlay"></div>
    <div class="cart-drawer" id="cart-drawer">
      <div class="cart-header">
        <div class="cart-header-title">🛒 CART (<span id="cart-count-drawer">0</span>)</div>
        <button class="btn-close-cart" id="btn-close-cart">✕</button>
      </div>
      <div class="cart-items" id="cart-items-list">
        <div class="cart-empty" id="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <div>YOUR CART IS EMPTY</div>
          <a href="catalog.html" style="color:var(--lime);font-size:8px;">BROWSE GAMES</a>
        </div>
      </div>
      <div class="cart-footer hidden" id="cart-footer">
        <div class="cart-subtotal">
          <span class="cart-subtotal-label">SUBTOTAL</span>
          <span class="cart-subtotal-val" id="cart-total">$0.00</span>
        </div>
        <button class="btn-checkout" onclick="handleCheckout()">⚡ CHECKOUT NOW</button>
        <div class="cart-secure">🔒 SECURE CHECKOUT</div>
      </div>
    </div>
  `;

  const footerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <div class="footer-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="6" width="20" height="12" rx="2"/>
              <path d="M6 12h4M8 10v4M15 11h2M15 13h2"/>
            </svg>
            GAMING ONLINE
          </div>
          <div class="footer-desc">Your retro arcade game store since 2024. The best selection of PC games, console titles, accessories, and gift cards.</div>
          <a href="https://gaming-online.shop" class="footer-domain">🌐 gaming-online.shop</a>
        </div>
        <div>
          <div class="footer-col-title">SHOP</div>
          <ul class="footer-links">
            <li><a href="catalog.html?category=PC+Games">PC Games</a></li>
            <li><a href="catalog.html?category=Console+Games">Console Games</a></li>
            <li><a href="catalog.html?category=Accessories">Accessories</a></li>
            <li><a href="catalog.html?category=Gift+Cards">Gift Cards</a></li>
            <li><a href="catalog.html">All Products</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">SUPPORT</div>
          <ul class="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">NEWSLETTER</div>
          <div style="font-size:12px;color:var(--gray);margin-bottom:12px;">Get exclusive deals & new releases</div>
          <div class="newsletter-form">
            <input type="email" class="newsletter-input" placeholder="YOUR@EMAIL.COM">
            <button class="btn-subscribe" onclick="showToast('✓ Subscribed! Check your email.')">⚡ SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© 2024 GAMING ONLINE. ALL RIGHTS RESERVED.</div>
        <div class="footer-powered">gaming-online.shop | POWERED BY SHOPIFY</div>
      </div>
    </footer>
    <div class="toast" id="toast"></div>
  `;

  // Inject into page
  const navTarget = document.getElementById('navbar-placeholder');
  if (navTarget) navTarget.innerHTML = navbarHTML + searchOverlayHTML + cartDrawerHTML;

  const footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.innerHTML = footerHTML;
}

function handleCheckout() {
  showToast('Redirecting to secure Shopify checkout...');
  setTimeout(() => {
    window.location.href = 'https://fk67rh-arrow-delta-delta.myshopify.com/cart';
  }, 1000);
}

// Run on load
document.addEventListener('DOMContentLoaded', injectLayout);
