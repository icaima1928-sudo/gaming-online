// ── PRODUCT DATA ──
const PRODUCTS = [
  {
    id: 1,
    handle: "cyber-quest-2099",
    title: "Cyber Quest 2099",
    type: "PC Games",
    price: 29.99,
    comparePrice: null,
    image: "https://cdn.shopify.com/s/files/1/1004/9441/0018/files/sfokYufQpIxEdpFv.png?v=1781326654",
    tags: ["action","adventure","cyberpunk","digital","pc"],
    description: "Dive into a neon-soaked cyberpunk future in Cyber Quest 2099. Battle rogue AIs, hack megacorp servers, and uncover the truth behind the digital uprising. Features stunning pixel art environments, 30+ hours of gameplay, and an epic electronic soundtrack.",
    badge: "NEW",
    features: ["30+ Hours of Gameplay","4K Pixel Art Graphics","Epic Soundtrack","Online Co-op Mode","Steam Achievements"]
  },
  {
    id: 2,
    handle: "dragon-realm-chronicles",
    title: "Dragon Realm Chronicles",
    type: "Console Games",
    price: 39.99,
    comparePrice: null,
    image: "https://cdn.shopify.com/s/files/1/1004/9441/0018/files/jldepWpjwATDUUHx.png?v=1781326729",
    tags: ["rpg","fantasy","console","adventure","dragons"],
    description: "Embark on an epic fantasy adventure in Dragon Realm Chronicles. Tame legendary dragons, build your kingdom, and battle ancient evils threatening the realm. A massive open-world RPG with over 100 hours of content.",
    badge: null,
    features: ["100+ Hours of Content","Open World Exploration","Dragon Taming System","Multiplayer Raids","4K HDR Support"]
  },
  {
    id: 3,
    handle: "gaming-gift-card-50",
    title: "Gaming Gift Card $50",
    type: "Gift Cards",
    price: 50.00,
    comparePrice: null,
    image: "https://cdn.shopify.com/s/files/1/1004/9441/0018/files/XITgFyXNeVjQnFDz.png?v=1781326770",
    tags: ["gift","card","digital","voucher"],
    description: "Give the gift of gaming! This $50 digital gift card can be used to purchase any game, accessory, or item in our store. Delivered instantly via email. Perfect for birthdays, holidays, or any occasion.",
    badge: null,
    features: ["Instant Digital Delivery","No Expiry Date","Use on Any Product","Redeemable Online","Gift Wrapping Available"]
  },
  {
    id: 4,
    handle: "pixel-pro-gaming-controller",
    title: "Pixel Pro Gaming Controller",
    type: "Accessories",
    price: 59.99,
    comparePrice: null,
    image: "https://cdn.shopify.com/s/files/1/1004/9441/0018/files/mLfgOOWyIIljSYfI.png?v=1781326761",
    tags: ["controller","accessory","hardware","gaming","pro"],
    description: "Dominate every game with the Pixel Pro Gaming Controller. Featuring ultra-responsive buttons, customizable RGB lighting, and ergonomic design for marathon gaming sessions. Compatible with PC, PS4, PS5, and Xbox.",
    badge: null,
    features: ["RGB Customizable Lighting","Ultra-Low Latency","40-Hour Battery Life","Multi-Platform Compatible","Programmable Buttons"]
  },
  {
    id: 5,
    handle: "space-raiders-deluxe",
    title: "Space Raiders Deluxe",
    type: "PC Games",
    price: 19.99,
    comparePrice: 29.99,
    image: "https://cdn.shopify.com/s/files/1/1004/9441/0018/files/QoTdOTIpvdmjtPdu.png?v=1781326753",
    tags: ["shooter","space","retro","arcade","pc"],
    description: "The classic arcade shooter reimagined! Space Raiders Deluxe brings back the golden age of arcade gaming with modern visuals and gameplay. Defend Earth from waves of alien invaders across 50 action-packed levels.",
    badge: "SALE",
    features: ["50 Unique Levels","Classic Arcade Mode","Online Leaderboards","Retro Soundtrack","Co-op Multiplayer"]
  }
];

const CATEGORIES = [
  { name: "PC Games", icon: "🖥️", desc: "Digital & physical PC titles" },
  { name: "Console Games", icon: "🎮", desc: "PS5, Xbox, Nintendo & more" },
  { name: "Accessories", icon: "🕹️", desc: "Controllers, headsets & gear" },
  { name: "Gift Cards", icon: "🎁", desc: "Digital gift vouchers" }
];

// ── CART STATE ──
let cart = JSON.parse(localStorage.getItem('gaming-cart') || '[]');

function saveCart() {
  localStorage.setItem('gaming-cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  openCart();
  showToast(`✓ ${product.title} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.classList.toggle('show', count > 0);
  });
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items-list');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    if (footerEl) footerEl.classList.add('hidden');
    return;
  }

  if (emptyEl) emptyEl.classList.add('hidden');
  if (footerEl) footerEl.classList.remove('hidden');

  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${p.image}" alt="${p.title}" onerror="this.src='images/placeholder.png'">
        <div class="cart-item-info">
          <div class="cart-item-title">${p.title}</div>
          <div class="cart-item-price">$${(p.price * item.qty).toFixed(2)}</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="cart-item-qty">
              <button class="cart-qty-btn" onclick="updateQty(${p.id}, -1)">−</button>
              <div class="cart-qty-val">${item.qty}</div>
              <button class="cart-qty-btn" onclick="updateQty(${p.id}, 1)">+</button>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${p.id})" title="Remove">🗑</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = '$' + getCartTotal().toFixed(2);
}

// ── CART DRAWER ──
function openCart() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  renderCartItems();
}

function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
}

// ── SEARCH ──
function openSearch() {
  document.getElementById('search-overlay')?.classList.add('open');
  document.getElementById('search-input-main')?.focus();
}

function closeSearch() {
  document.getElementById('search-overlay')?.classList.remove('open');
}

function doSearch(query) {
  const q = query.toLowerCase().trim();
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;
  if (!q) { resultsEl.innerHTML = ''; return; }
  const matches = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.type.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
  if (matches.length === 0) {
    resultsEl.innerHTML = '<div style="padding:16px;font-family:\'Press Start 2P\',monospace;font-size:9px;color:#4a6080;">NO RESULTS FOUND</div>';
    return;
  }
  resultsEl.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="goToProduct('${p.handle}')">
      <img src="${p.image}" alt="${p.title}" width="40" height="40" style="object-fit:cover;">
      <div>
        <div class="sri-title">${p.title}</div>
        <div class="sri-price">$${p.price.toFixed(2)} · ${p.type}</div>
      </div>
    </div>
  `).join('');
}

function goToProduct(handle) {
  window.location.href = `product.html?id=${handle}`;
}

// ── TOAST ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  // Cart open/close
  document.querySelectorAll('.btn-cart').forEach(btn => btn.addEventListener('click', openCart));
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('btn-close-cart')?.addEventListener('click', closeCart);

  // Search open/close
  document.querySelectorAll('.btn-search').forEach(btn => btn.addEventListener('click', openSearch));
  document.getElementById('search-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSearch();
  });
  const searchInput = document.getElementById('search-input-main');
  if (searchInput) {
    searchInput.addEventListener('input', e => doSearch(e.target.value));
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
    });
  }
});
