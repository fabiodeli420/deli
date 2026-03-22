const WA_NUMBER = "541156584277";

// 1. Efecto de Scroll en Navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(8, 8, 11, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.92)";
    navbar.style.boxShadow = "none";
  }
});

// 2. Enviar Pedido detallado desde el Formulario
function enviarPedido(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const prenda = document.getElementById("prenda").value;
  const talleEl = document.querySelector('input[name="talle"]:checked');
  const talle = talleEl ? talleEl.value : "No especificado";

  if (!nombre || !prenda) {
    alert("⚠️ Por favor, completá tu nombre y elegí una prenda.");
    return;
  }

  let waText = `Hola! 👋 Soy *${nombre}* y quiero hacer un pedido en *DELIKUSH* 🔥\n\n`;
  waText += `🛍️ *Prenda:* ${prenda}\n`;
  waText += `📐 *Talle:* ${talle}\n`;
  waText += `\n¡Gracias!`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;
  window.open(url, "_blank");
}

// 3. Botón de pedido rápido en las Cards
function pedirProducto(prenda) {
  const mensaje = `Hola! Quiero pedir la prenda: ${prenda} 🔥`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// 4. Animación de entrada (Intersection Observer)
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .hero-content");
  cards.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
});

// 5. Easter Egg: Kush Mode
let clicks = 0;
document.querySelector(".logo").addEventListener("click", () => {
  clicks++;
  if (clicks === 5) {
    document.body.style.filter = "hue-rotate(90deg)";
    alert("🌿 KUSH MODE ACTIVATED 🔥");
    setTimeout(() => document.body.style.filter = "none", 3000);
    clicks = 0;
  }
});
