// Movimiento 3D (Tilt) suave en las cajas
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left; // posición x dentro del elemento
        const y = e.clientY - rect.top;  // posición y dentro del elemento
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculamos la rotación (ajusta el número 15 para más o menos inclinación)
        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Volver a la posición normal cuando el mouse sale
    item.addEventListener('mouseleave', () => {
        item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// Función de pedido detallada
function pedir(producto, precio) {
    const tel = "541156584277";
    const mensaje = encodeURIComponent(`¡Hola DELIKUSH! 👋 Me interesa comprar: *${producto}* (${precio}). ¿Me confirman disponibilidad? 🔥`);
    window.open(`https://wa.me/${tel}?text=${mensaje}`, '_blank');
}
