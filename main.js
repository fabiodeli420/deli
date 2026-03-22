// =========================================
//   DELIKUSH – JavaScript Principal
//   Interactividad, pedidos y WhatsApp
// =========================================

const WA_NUMBER = '541156584277';

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.92)';
    navbar.style.boxShadow = 'none';
  }
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Cerrar menu al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== SCROLL SUAVE CON OFFSET PARA NAVBAR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navHeight = 68;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== FUNCIÓN: PEDIR PRODUCTO DIRECTO =====
function pedirProducto(prenda) {
  const mensaje = encodeURIComponent(
    `Hola! Quiero hacer un pedido en DELIKUSH 🔥\n\nMe interesa: ${prenda}\n\n¿Podés contarme más?`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${mensaje}`, '_blank');
}

// ===== FORMULARIO DE PEDIDO =====
function enviarPedido(e) {
  e.preventDefault();

  const nombre   = document.getElementById('nombre').value.trim();
  const prenda   = document.getElementById('prenda').value;
  const talleEl  = document.querySelector('input[name="talle"]:checked');
  const color    = document.getElementById('color').value.trim();
  const mensaje  = document.getElementById('mensaje').value.trim();

  // Validar talle
  if (!talleEl) {
    showToast('⚠️ Por favor elegí un talle', 'warning');
    return;
  }

  const talle = talleEl.value;

  // Construir mensaje para WhatsApp
  let waText = `Hola! 👋 Soy *${nombre}* y quiero hacer un pedido en *DELIKUSH* 🔥\n\n`;
  waText += `🛍️ *Prenda:* ${prenda}\n`;
  waText += `📐 *Talle:* ${talle}\n`;
  if (color) waText += `🎨 *Color:* ${color}\n`;
  if (mensaje) waText += `💬 *Nota:* ${mensaje}\n`;
  waText += `\n¡Gracias!`;

  const encoded = encodeURIComponent(waText);
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

  // Mostrar feedback visual
  showToast('✅ Redirigiendo a WhatsApp...', 'success');

  // Abrir WhatsApp
  setTimeout(() => {
    window.open(url, '_blank');
  }, 600);

  // Reset form
  setTimeout(() => {
    document.getElementById('pedidoForm').reset();
  }, 1000);
}

// ===== TOAST NOTIFICATION =====
function showToast(text, type = 'success') {
  // Remover toast anterior si existe
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? 'fa-check-circle' :
               type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';

  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${text}</span>`;
  document.body.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  // Auto remover
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ===== ANIMACIONES DE ENTRADA AL SCROLL =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    '.product-card, .step, .contact-card, .vibe-big-card, .vibe-text, .pedidos-form-box'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// ===== ACTIVE NAV LINK EN SCROLL =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.style.color = '#ff6b35';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== EFECTO PARALLAX SUAVE EN HERO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shapes = document.querySelectorAll('.shape');
  if (shapes.length) {
    shapes[0].style.transform = `translate(${scrollY * 0.02}px, ${-scrollY * 0.04}px)`;
    shapes[1].style.transform = `translate(${-scrollY * 0.02}px, ${scrollY * 0.03}px)`;
  }
});

// ===== COUNTER ANIMATION (EASTER EGG) =====
let clickCount = 0;
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      showToast('🌿 KUSH MODE ACTIVATED 🔥', 'success');
      document.body.style.animation = 'rainbow 1s linear';
      clickCount = 0;
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  updateActiveNav();

  // Agregar estilos de transición al hero content
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroContent) {
    heroContent.style.animation = 'fadeInLeft 0.8s ease forwards';
  }
  if (heroVisual) {
    heroVisual.style.animation = 'fadeInRight 0.8s ease 0.3s forwards';
    heroVisual.style.opacity = '0';
  }

  // Agregar keyframes dinámicos
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes rainbow {
      0%   { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});
