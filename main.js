const WA_NUMBER = "541156584277";

// Enviar pedido por WhatsApp
function enviarPedido(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const prenda = document.getElementById("prenda").value;
  const talleEl = document.querySelector('input[name="talle"]:checked');
  const talle = talleEl ? talleEl.value : "No especificado";

  if (!nombre || !prenda) {
    showToast("⚠️ Completá todos los campos", "warning");
    return;
  }

  let waText = `Hola! 👋 Soy *${nombre}* y quiero hacer un pedido en *DELIKUSH* 🔥\n\n`;
  waText += `🛍️ *Prenda:* ${prenda}\n`;
  waText += `📐 *Talle:* ${talle}\n`;
  waText += `\n¡Gracias!`;

  const encoded = encodeURIComponent(waText);
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

  showToast("✅ Redirigiendo a WhatsApp...", "success");

  setTimeout(() => {
    window.open(url, "_blank");
  }, 600);
}

// Botón pedir directo desde card
function pedirProducto(prenda) {
  const mensaje = encodeURIComponent(`Hola! Quiero pedir la prenda: ${prenda} 🔥`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${mensaje}`, "_blank");
}

// Notificaciones Toast
function showToast(text) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>${text}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Menu Mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}
