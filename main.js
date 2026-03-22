// 1. Efecto de aparición al hacer Scroll (AOS manual)
const revealElements = () => {
  const cards = document.querySelectorAll('.product-card');
  const windowHeight = window.innerHeight;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
    }
  });
};

// Configuración inicial de las tarjetas
document.querySelectorAll('.product-card').forEach(card => {
  card.style.transition = "all 0.8s ease-out";
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
});

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// 2. Función de pedido detallada
function pedir(prenda, precio) {
  const whatsappNumber = "541156584277";
  const mensaje = `Hola DELIKUSH! 🔥\nMe interesa comprar:\n👉 *${prenda}*\n💰 Precio: *${precio}*\n¿Sigue disponible?`;
  
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
