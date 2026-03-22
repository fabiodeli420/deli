// Función para enviar pedido a WhatsApp
function enviarPedido(producto, precio) {
    const telefono = "541156584277";
    const mensaje = encodeURIComponent(`¡Hola DELIKUSH! 🔥 Me interesa este artículo: ${producto} (${precio})`);
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}

// Efecto Tilt 3D sutil
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});
