// =========================================
//   LIMA LIMÓN – main.js
// =========================================

const WA = '541156584277';

const PRODUCTOS = [
  { id:1, nombre:'Remera Oversize',  emoji:'👕', desc:'Fit amplio, tela premium, varios colores. El básico que no puede faltar.', precio:22500, badge:'BESTSELLER', gradiente:'linear-gradient(135deg,#a8e63d,#f5e642)', stock:3 },
  { id:2, nombre:'Buzo Hoodie',      emoji:'🧥', desc:'Capucha, bolsillo canguro, 420GSM. Super cómodo para el día a día.',      precio:45000, badge:'NUEVO',     gradiente:'linear-gradient(135deg,#2d9e4a,#a8e63d)', badgeNew:true, stock:5 },
  { id:3, nombre:'Pantalón Baggy',   emoji:'👖', desc:'Corte relajado, tela liviana y resistente. El combo perfecto.',            precio:38900, badge:'',          gradiente:'linear-gradient(135deg,#1a6b2e,#2d9e4a)', stock:8 },
  { id:4, nombre:'Jogger Oversize',  emoji:'🩳', desc:'Elástico en puños y cintura. Ideal para un look streetwear completo.',     precio:28000, badge:'FIRE',      gradiente:'linear-gradient(135deg,#f5e642,#c8f060)', stock:4 },
  { id:5, nombre:'Set Completo',     emoji:'🎁', desc:'Buzo + Pantalón a juego. El outfit completo que todos quieren.',           precio:75000, badge:'OFERTA',    gradiente:'linear-gradient(135deg,#a8e63d,#2d9e4a)', stock:2 },
  { id:6, nombre:'Trucker Cap LL',   emoji:'🧢', desc:'Parche LL bordado. Visera curva. El accesorio que corona todo look.',      precio:12000, badge:'NUEVO',     gradiente:'linear-gradient(135deg,#f5e642,#a8e63d)', badgeNew:true, stock:10 },
];

const TESTIMONIOS = [
  { nombre:'Matías G.',  ciudad:'Buenos Aires', texto:'La remera oversize es una locura, calidad increíble. Ya pedí la segunda.', stars:5, emoji:'👕' },
  { nombre:'Vale R.',    ciudad:'Rosario',      texto:'El buzo hoodie es lo más cómodo que tuve. El envío llegó rápidísimo 🍋',    stars:5, emoji:'🧥' },
  { nombre:'Fede T.',    ciudad:'Córdoba',      texto:'El combo completo una ganga. Los dos quedan perfectos juntos, muy buena tela.', stars:5, emoji:'🎁' },
  { nombre:'Caro M.',    ciudad:'Mendoza',      texto:'Atención por WhatsApp re rápida, me asesoraron con el talle. Top 💚',       stars:5, emoji:'⭐' },
  { nombre:'Nico S.',    ciudad:'La Plata',     texto:'El pantalón baggy tiene el corte exacto que buscaba. Volvería a comprar.',  stars:5, emoji:'👖' },
];

let carrito = [];

function formatPrecio(n) { return '$' + n.toLocaleString('es-AR'); }

function renderProductos() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTOS.map((p, i) => {
    const bajo = p.stock && p.stock <= 3;
    const stockBar = p.stock ? `
      <div class="stock-wrap">
        <div class="stock-bar"><div class="stock-fill" style="width:${Math.min(p.stock*10,100)}%;background:${bajo?'#f5e642':'#a8e63d'}"></div></div>
        <span class="stock-label ${bajo?'stock-low':''}">${bajo ? `⚡ Solo ${p.stock} restantes` : `✓ Stock disponible`}</span>
      </div>` : '';
    return `
    <div class="product-card reveal" style="transition-delay:${i*0.1}s">
      <div class="product-img" style="background:${p.gradiente}">
        <span class="product-icon">${p.emoji}</span>
        ${p.badge ? `<div class="product-badge${p.badgeNew?' badge-new':''}">${p.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <h3>${p.nombre}</h3>
        <p>${p.desc}</p>
        <span class="product-price">${formatPrecio(p.precio)}</span>
        <div class="product-sizes"><span>S</span><span>M</span><span>L</span><span>XL</span><span>XXL</span></div>
        ${stockBar}
        <button class="btn-card" onclick="agregarAlCarrito(${p.id})">
          <i class="fas fa-shopping-bag"></i> Agregar al carrito
        </button>
      </div>
    </div>`;
  }).join('');
  observeReveal();
}

function renderTestimonios() {
  const grid = document.getElementById('testimoniosGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIOS.map((t, i) => `
    <div class="testi-card reveal" style="transition-delay:${i*0.12}s">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <p class="testi-texto">"${t.texto}"</p>
      <div class="testi-autor">
        <span class="testi-emoji">${t.emoji}</span>
        <div><strong>${t.nombre}</strong><span>${t.ciudad}</span></div>
      </div>
    </div>`).join('');
  observeReveal();
}

function agregarAlCarrito(id) {
  const prod = PRODUCTOS.find(p => p.id === id);
  if (!prod) return;
  const ex = carrito.find(i => i.id === id);
  if (ex) { ex.qty++; } else { carrito.push({...prod, qty:1}); }
  actualizarCartUI();
  renderCartItems();
  showToast(`✅ ${prod.emoji} ${prod.nombre} agregado`);
  lanzarConfetti();
}

function cambiarQty(id, delta) {
  const idx = carrito.findIndex(i => i.id === id);
  if (idx === -1) return;
  carrito[idx].qty += delta;
  if (carrito[idx].qty <= 0) carrito.splice(idx, 1);
  actualizarCartUI();
  renderCartItems();
}

function actualizarCartUI() {
  const total = carrito.reduce((s,i) => s+i.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) { countEl.textContent = total; total > 0 ? countEl.classList.add('show') : countEl.classList.remove('show'); }
  const totalEl = document.getElementById('drawerTotal');
  if (totalEl) totalEl.textContent = formatPrecio(carrito.reduce((s,i) => s+i.precio*i.qty, 0));
  const btn = document.getElementById('checkoutBtn');
  if (btn) btn.disabled = total === 0;
}

function renderCartItems() {
  const cont = document.getElementById('drawerItems');
  if (!cont) return;
  if (carrito.length === 0) {
    cont.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛍️</div><p>Tu carrito está vacío</p></div>`;
    return;
  }
  cont.innerHTML = carrito.map(item => `
    <div class="cart-item">
      <span class="ci-emoji">${item.emoji}</span>
      <div class="ci-info"><p class="ci-name">${item.nombre}</p><p class="ci-price">${formatPrecio(item.precio)} c/u</p></div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="cambiarQty(${item.id},-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="cambiarQty(${item.id},+1)">+</button>
      </div>
    </div>`).join('');
}

function openCart()  { document.getElementById('cartOverlay').classList.add('open'); document.getElementById('cartDrawer').classList.add('open'); document.body.style.overflow='hidden'; renderCartItems(); }
function closeCart() { document.getElementById('cartOverlay').classList.remove('open'); document.getElementById('cartDrawer').classList.remove('open'); document.body.style.overflow=''; }

function checkout() {
  if (!carrito.length) return;
  const lineas = carrito.map(i => `• ${i.qty}x ${i.nombre} — ${formatPrecio(i.precio*i.qty)}`);
  const total  = carrito.reduce((s,i) => s+i.precio*i.qty, 0);
  const msg = `¡Hola LIMA LIMÓN! 🍋 Quiero hacer el siguiente pedido:\n\n${lineas.join('\n')}\n\n*TOTAL: ${formatPrecio(total)}*\n\n¿Me podés confirmar disponibilidad y coordinar el envío?`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function enviarPedido(e) {
  e.preventDefault();
  const nombre  = document.getElementById('nombre').value.trim();
  const prenda  = document.getElementById('prenda').value;
  const talleEl = document.querySelector('input[name="talle"]:checked');
  const color   = document.getElementById('color').value.trim();
  const nota    = document.getElementById('nota').value.trim();
  if (!talleEl) { showToast('⚠️ Elegí un talle'); return; }
  let msg = `Hola! 👋 Soy *${nombre}* y quiero hacer un pedido en *LIMA LIMÓN* 🍋\n\n`;
  msg += `🛍️ *Prenda:* ${prenda}\n📐 *Talle:* ${talleEl.value}\n`;
  if (color) msg += `🎨 *Color:* ${color}\n`;
  if (nota)  msg += `💬 *Nota:* ${nota}\n`;
  msg += `\n¡Gracias!`;
  showToast('✅ Redirigiendo a WhatsApp...');
  setTimeout(() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank'), 600);
  setTimeout(() => document.getElementById('pedidoForm').reset(), 1000);
}

function showToast(texto) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${texto}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function lanzarConfetti() {
  const COLORS = ['#a8e63d','#f5e642','#c8f060','#2d9e4a','#ffffff','#1a6b2e'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const size = Math.random()*8+4, color = COLORS[Math.floor(Math.random()*COLORS.length)];
    const left = Math.random()*100, delay = Math.random()*0.5, dur = Math.random()*1.5+1;
    el.style.cssText = `position:fixed;left:${left}%;top:-10px;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random()>.5?'50%':'2px'};z-index:9999;pointer-events:none;animation:confettiFall ${dur}s ease-in ${delay}s forwards;`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur+delay+0.1)*1000);
  }
  if (!document.getElementById('confetti-style')) {
    const s = document.createElement('style');
    s.id = 'confetti-style';
    s.textContent = `@keyframes confettiFall { 0% { transform:translateY(0) rotate(0deg) scale(1);opacity:1; } 80% { opacity:1; } 100% { transform:translateY(100vh) rotate(360deg) scale(0.5);opacity:0; } }`;
    document.head.appendChild(s);
  }
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const scrollY = window.scrollY + 90;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle) return;
  toggle.addEventListener('click', () => { toggle.classList.toggle('active'); navLinks.classList.toggle('open'); });
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => { toggle.classList.remove('active'); navLinks.classList.remove('open'); }));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    });
  });
}

function initCursor() {
  const cur = document.getElementById('cursor');
  const fol = document.getElementById('cursorFollower');
  if (!cur || !fol) return;
  let mx=0, my=0, fx=0, fy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  function anim() {
    cur.style.left=mx+'px'; cur.style.top=my+'px';
    fx+=(mx-fx)*0.14; fy+=(my-fy)*0.14;
    fol.style.left=fx+'px'; fol.style.top=fy+'px';
    requestAnimationFrame(anim);
  }
  anim();
  document.querySelectorAll('a,button,.product-card,.contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.transform='translate(-50%,-50%) scale(2)'; fol.style.transform='translate(-50%,-50%) scale(1.5)'; });
    el.addEventListener('mouseleave', () => { cur.style.transform='translate(-50%,-50%) scale(1)'; fol.style.transform='translate(-50%,-50%) scale(1)'; });
  });
}

function initParallax() {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const blobs = document.querySelectorAll('.blob');
    if (blobs[0]) blobs[0].style.transform=`translate(${sy*.02}px,${-sy*.04}px)`;
    if (blobs[1]) blobs[1].style.transform=`translate(${-sy*.02}px,${sy*.03}px)`;
  });
}

function initTicker() {
  const track = document.querySelector('.strip-track');
  if (!track) return;
  track.parentElement.appendChild(track.cloneNode(true));
}

function initEasterEgg() {
  const logo = document.getElementById('logoEgg');
  if (!logo) return;
  let clicks = 0;
  logo.addEventListener('click', () => {
    clicks++;
    if (clicks === 5) {
      clicks = 0;
      showToast('🍋 FRESH MODE ACTIVATED!');
      document.body.style.transition='filter 0.5s';
      document.body.style.filter='hue-rotate(60deg)';
      setTimeout(() => { document.body.style.filter='hue-rotate(0deg)'; }, 1500);
      setTimeout(() => { document.body.style.filter=''; }, 2100);
    }
  });
}

function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductos();
  renderTestimonios();
  actualizarCartUI();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initCursor();
  initParallax();
  initTicker();
  initEasterEgg();
  observeReveal();
});  showToast(`✅ ${prod.emoji} ${prod.nombre} agregado`, 'success');
  lanzarConfetti();
}

function cambiarQty(id, delta) {
  const idx = carrito.findIndex(i => i.id === id);
  if (idx === -1) return;
  carrito[idx].qty += delta;
  if (carrito[idx].qty <= 0) carrito.splice(idx, 1);
  actualizarCartUI();
  renderCartItems();
}

function actualizarCartUI() {
  const total = carrito.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = total;
    total > 0 ? countEl.classList.add('show') : countEl.classList.remove('show');
  }
  const totalEl = document.getElementById('drawerTotal');
  if (totalEl) {
    const money = carrito.reduce((s, i) => s + i.precio * i.qty, 0);
    totalEl.textContent = formatPrecio(money);
  }
  const btn = document.getElementById('checkoutBtn');
  if (btn) btn.disabled = total === 0;
}

function renderCartItems() {
  const cont = document.getElementById('drawerItems');
  if (!cont) return;
  if (carrito.length === 0) {
    cont.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛍️</div><p>Tu carrito está vacío</p></div>`;
    return;
  }
  cont.innerHTML = carrito.map(item => `
    <div class="cart-item">
      <span class="ci-emoji">${item.emoji}</span>
      <div class="ci-info">
        <p class="ci-name">${item.nombre}</p>
        <p class="ci-price">${formatPrecio(item.precio)} c/u</p>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="cambiarQty(${item.id},-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="cambiarQty(${item.id},+1)">+</button>
      </div>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function checkout() {
  if (carrito.length === 0) return;
  const lineas = carrito.map(i => `• ${i.qty}x ${i.nombre} — ${formatPrecio(i.precio * i.qty)}`);
  const total  = carrito.reduce((s,i) => s + i.precio * i.qty, 0);
  const msg = `¡Hola DELIKUSH! 🔥 Quiero hacer el siguiente pedido:\n\n${lineas.join('\n')}\n\n*TOTAL: ${formatPrecio(total)}*\n\n¿Me podés confirmar disponibilidad y coordinar el envío?`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── FORMULARIO ────────────────────────────────────────────────────
function enviarPedido(e) {
  e.preventDefault();
  const nombre  = document.getElementById('nombre').value.trim();
  const prenda  = document.getElementById('prenda').value;
  const talleEl = document.querySelector('input[name="talle"]:checked');
  const color   = document.getElementById('color').value.trim();
  const nota    = document.getElementById('nota').value.trim();

  if (!talleEl) { showToast('⚠️ Elegí un talle', 'warning'); return; }

  let msg = `Hola! 👋 Soy *${nombre}* y quiero hacer un pedido en *DELIKUSH* 🔥\n\n`;
  msg += `🛍️ *Prenda:* ${prenda}\n`;
  msg += `📐 *Talle:* ${talleEl.value}\n`;
  if (color) msg += `🎨 *Color:* ${color}\n`;
  if (nota)  msg += `💬 *Nota:* ${nota}\n`;
  msg += `\n¡Gracias!`;

  showToast('✅ Redirigiendo a WhatsApp...', 'success');
  setTimeout(() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank'), 600);
  setTimeout(() => document.getElementById('pedidoForm').reset(), 1000);
}

// ── PEDIR PRODUCTO DIRECTO ────────────────────────────────────────
function pedirProducto(nombre) {
  const msg = `Hola! Quiero info sobre: *${nombre}* 🔥`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── TOAST ─────────────────────────────────────────────────────────
function showToast(texto, tipo = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const icon = tipo === 'success' ? 'fa-check-circle' : tipo === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${texto}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── NAVBAR SCROLL ─────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const scrollY  = window.scrollY + 90;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

// ── MOBILE MENU ───────────────────────────────────────────────────
function initMobileMenu() {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    });
  });
}

// ── CURSOR CUSTOM ─────────────────────────────────────────────────
function initCursor() {
  const cur = document.getElementById('cursor');
  const fol = document.getElementById('cursorFollower');
  if (!cur || !fol) return;
  let mx=0, my=0, fx=0, fy=0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cur.style.left  = mx + 'px';
    cur.style.top   = my + 'px';
    fx += (mx - fx) * 0.14;
    fy += (my - fy) * 0.14;
    fol.style.left = fx + 'px';
    fol.style.top  = fy + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .product-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(2)';
      fol.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      fol.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ── REVEAL ON SCROLL ──────────────────────────────────────────────
function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

// ── PARALLAX BLOBS HERO ───────────────────────────────────────────
function initParallax() {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const blobs = document.querySelectorAll('.blob');
    if (blobs[0]) blobs[0].style.transform = `translate(${sy*0.02}px,${-sy*0.04}px)`;
    if (blobs[1]) blobs[1].style.transform = `translate(${-sy*0.02}px,${sy*0.03}px)`;
  });
}

// ── TICKER DUPLICADO ──────────────────────────────────────────────
function initTicker() {
  const track = document.querySelector('.strip-track');
  if (!track) return;
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}

// ── EASTER EGG (5 clicks en el logo) ────────────────────────────
function initEasterEgg() {
  const logo = document.getElementById('logoEgg');
  if (!logo) return;
  let clicks = 0;
  logo.addEventListener('click', () => {
    clicks++;
    if (clicks === 5) {
      clicks = 0;
      showToast('🌿 KUSH MODE ACTIVATED 🔥', 'success');
      document.body.style.transition = 'filter 0.5s';
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => { document.body.style.filter = 'hue-rotate(0deg)'; }, 1500);
      setTimeout(() => { document.body.style.filter = ''; }, 2100);
    }
  });
}

// ── ANIMACIÓN DE NÚMEROS (counter) ───────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.stat-n[data-target]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.target);
    let cur = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + (el.dataset.suffix || '');
    }, 30);
  });
}

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProductos();
  renderTestimonios();
  actualizarCartUI();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initCursor();
  initParallax();
  initTicker();
  initEasterEgg();
  initParticles();
  initDkBackground();
  observeReveal();

  // Entradas hero con delay
  const heroContent = document.querySelector('.hero-content');
  const heroVisual  = document.querySelector('.hero-visual');
  if (heroContent) heroContent.style.animationDelay = '0s';
  if (heroVisual)  heroVisual.style.animationDelay  = '0.25s';

  // Keyframes dinámicos extra
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInLeft {
      from { opacity:0; transform:translateX(-32px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity:0; transform:translateX(32px); }
      to   { opacity:1; transform:translateX(0); }
    }
  `;
  document.head.appendChild(style);
});

// ── PARTÍCULAS ────────────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['#ff6b35', '#a855f7', '#f7c948', '#6366f1', '#ff9d6f', '#c084fc'];
  const COUNT  = 55;
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x    = Math.random() * W;
      this.y    = initial ? Math.random() * H : H + 10;
      this.r    = Math.random() * 2.2 + 0.6;
      this.vx   = (Math.random() - 0.5) * 0.4;
      this.vy   = -(Math.random() * 0.5 + 0.2);
      this.alpha= Math.random() * 0.6 + 0.15;
      this.color= COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse= Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;
      this.alpha = 0.15 + Math.abs(Math.sin(this.pulse)) * 0.5;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      ctx.shadowBlur  = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.08;
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
}

// ── FONDO ANIMADO DK ─────────────────────────────────────────────
function initDkBackground() {
  const container = document.getElementById('dkBg');
  if (!container) return;

  const WORDS  = ['DK', 'DELI', 'KUSH', 'DK', 'OVERSIZE', 'DK', 'STREETWEAR', 'DK', 'VISTE GRANDE', 'DK'];
  const COLORS = ['#ff6b35', '#a855f7', '#f7c948', '#6366f1', '#ff9d6f', '#c084fc', '#ff6b35'];
  const COUNT  = 28;

  for (let i = 0; i < COUNT; i++) {
    const el   = document.createElement('div');
    el.className = 'dk-letter';
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const col  = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = Math.random() * 80 + 24;
    const op   = (Math.random() * 0.07 + 0.03).toFixed(3);
    const x    = Math.random() * 95;
    const y    = Math.random() * 95;
    const rot  = (Math.random() * 40 - 20).toFixed(1);
    const dur  = (Math.random() * 8 + 6).toFixed(1);
    const delay= (Math.random() * -10).toFixed(1);

    el.textContent = word;
    el.style.cssText = `
      --col: ${col};
      --size: ${size}px;
      --op: ${op};
      --x: ${x}%;
      --y: ${y}%;
      --rot: ${rot}deg;
      --dur: ${dur}s;
      --delay: ${delay}s;
    `;
    container.appendChild(el);
  }
}

// ── CONFETTI ─────────────────────────────────────────────────────
function lanzarConfetti() {
  const COLORS = ['#ff6b35','#a855f7','#f7c948','#6366f1','#ffffff','#ff9d6f'];
  const COUNT  = 60;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size  = Math.random() * 8 + 4;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const left  = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const dur   = Math.random() * 1.5 + 1;
    const rot   = Math.random() * 720 - 360;
    const shape = Math.random() > 0.5 ? '50%' : '2px';

    el.style.cssText = `
      position:fixed;
      left:${left}%;
      top:-10px;
      width:${size}px;
      height:${size}px;
      background:${color};
      border-radius:${shape};
      z-index:9999;
      pointer-events:none;
      animation: confettiFall ${dur}s ease-in ${delay}s forwards;
      transform: rotate(0deg);
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay + 0.1) * 1000);
  }

  // Agregar keyframe si no existe
  if (!document.getElementById('confetti-style')) {
    const s = document.createElement('style');
    s.id = 'confetti-style';
    s.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translateY(100vh) rotate(var(--r, 360deg)) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
}

// ── TESTIMONIOS ──────────────────────────────────────────────────
const TESTIMONIOS = [
  { nombre:'Matías G.',    ciudad:'Buenos Aires', texto:'La remera oversize es una locura, calidad increíble. Ya pedí la segunda.', stars:5, emoji:'👕' },
  { nombre:'Vale R.',      ciudad:'Rosario',      texto:'El buzo hoodie es lo más cómodo que tuve. El envío llegó rápidísimo 🔥',    stars:5, emoji:'🧥' },
  { nombre:'Fede T.',      ciudad:'Córdoba',      texto:'El combo DK una ganga. Los dos quedan perfectos juntos, muy buena tela.',   stars:5, emoji:'🎁' },
  { nombre:'Caro M.',      ciudad:'Mendoza',      texto:'Atención por WhatsApp re rápida, me asesoraron con el talle. Top 💜',       stars:5, emoji:'⭐' },
  { nombre:'Nico S.',      ciudad:'La Plata',     texto:'El pantalón baggy tiene el corte exacto que buscaba. Volvería a comprar.',  stars:5, emoji:'👖' },
];

function renderTestimonios() {
  const sec = document.getElementById('testimonios-grid');
  if (!sec) return;
  sec.innerHTML = TESTIMONIOS.map((t, i) => `
    <div class="testi-card reveal" style="animation-delay:${i*0.12}s">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <p class="testi-texto">"${t.texto}"</p>
      <div class="testi-autor">
        <span class="testi-emoji">${t.emoji}</span>
        <div>
          <strong>${t.nombre}</strong>
          <span>${t.ciudad}</span>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}
