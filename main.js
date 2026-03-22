// ── DELIKUSH · script.js ──────────────────────────────────────────

const WHATSAPP_TEL = "541156584277";

// ── Catálogo de productos ──────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "BOXY FIT TEE",
    category: "Remeras",
    desc: "Algodón 100% Premium. Off-White. Cuello ancho oversize.",
    price: 22500,
    emoji: "👕",
    featured: false
  },
  {
    id: 2,
    name: "HEAVY HOODIE",
    category: "Abrigos",
    desc: "420 GSM. Frisa invisible. Capucha reforzada. Negro.",
    price: 45000,
    emoji: "🧥",
    featured: false
  },
  {
    id: 3,
    name: "BAGGY CARGO",
    category: "Pantalones",
    desc: "Corte ultra relajado. 6 bolsillos funcionales. Canvas.",
    price: 38900,
    emoji: "👖",
    featured: false
  },
  {
    id: 4,
    name: "OVERSHORT",
    category: "Shorts",
    desc: "Frisa liviana. Ideal daily wear. Elástico interior.",
    price: 18500,
    emoji: "🩳",
    featured: false
  },
  {
    id: 5,
    name: "TRUCKER CAP",
    category: "Accesorios",
    desc: "Parche DK bordado. Visera curva. Malla trasera.",
    price: 12000,
    emoji: "🧢",
    featured: false
  },
  {
    id: 6,
    name: "COMBO DK",
    category: "Combos",
    desc: "Hoodie + Baggy Cargo a elección. Ahorrás $8.900 vs precio unitario.",
    price: 75000,
    emoji: "🎁",
    featured: true
  }
];

// ── Estado del carrito ─────────────────────────────────────────────
let cart = [];

// ── Helpers de formato ─────────────────────────────────────────────
function formatPrice(n) {
  return "$" + n.toLocaleString("es-AR");
}

// ── Render del catálogo ────────────────────────────────────────────
function renderCatalog() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card" + (p.featured ? " featured" : "");
    card.id = `card-${p.id}`;

    card.innerHTML = `
      <div class="card-emoji">${p.emoji}</div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <div>
            <span class="card-price-label">Precio</span>
            <span class="card-price">${formatPrice(p.price)}</span>
          </div>
          <button class="add-btn" id="add-${p.id}" onclick="addToCart(${p.id})" title="Agregar al carrito">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Agregar al carrito ─────────────────────────────────────────────
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  // Feedback visual en el botón
  const btn = document.getElementById(`add-${productId}`);
  if (btn) {
    btn.textContent = "✓";
    btn.classList.add("added");
    setTimeout(() => {
      btn.textContent = "+";
      btn.classList.remove("added");
    }, 1200);
  }

  updateCartUI();
  renderCartItems();
}

// ── Cambiar cantidad ───────────────────────────────────────────────
function changeQty(productId, delta) {
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return;

  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }

  updateCartUI();
  renderCartItems();
}

// ── Actualizar badge y total ───────────────────────────────────────
function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const count = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  count.textContent = total;
  if (total > 0) {
    count.classList.add("visible");
  } else {
    count.classList.remove("visible");
  }

  const money = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (totalEl) totalEl.textContent = formatPrice(money);
  if (checkoutBtn) checkoutBtn.disabled = total === 0;
}

// ── Render de items en el drawer ───────────────────────────────────
function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">🛒</div>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="item-emoji">${item.emoji}</span>
      <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-price">${formatPrice(item.price)} c/u</p>
      </div>
      <div class="item-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
      </div>
    </div>
  `).join("");
}

// ── Abrir / cerrar drawer ──────────────────────────────────────────
function openCart() {
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
  renderCartItems();
}

function closeCart() {
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

// ── Checkout vía WhatsApp ──────────────────────────────────────────
function checkout() {
  if (cart.length === 0) return;

  const lines = cart.map(i =>
    `• ${i.qty}x ${i.name} — ${formatPrice(i.price * i.qty)}`
  );
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const msg =
    `¡Hola DELIKUSH! Quiero realizar el siguiente pedido:\n\n` +
    lines.join("\n") +
    `\n\n*TOTAL: ${formatPrice(total)}*\n\n¿Podemos coordinar el pago y envío?`;

  window.open(`https://wa.me/${WHATSAPP_TEL}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ── WhatsApp directo (sin carrito) ────────────────────────────────
function openWhatsApp() {
  window.open(`https://wa.me/${WHATSAPP_TEL}`, "_blank");
}

// ── Init ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  updateCartUI();

  // Cerrar con overlay
  document.getElementById("cart-overlay")
    .addEventListener("click", closeCart);
});
