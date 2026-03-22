document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto de aparición al hacer Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Seleccionamos todas las tarjetas de productos para animarlas
    const products = document.querySelectorAll('.product-card');
    products.forEach(el => observer.observe(el));

    // 2. Movimiento suave para los enlaces del Menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
