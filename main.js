function pedir(producto, precio) {
    const tel = "541156584277";
    const mensaje = encodeURIComponent(`¡Hola DELIKUSH! 🔥 Me interesa el producto: ${producto} (${precio})`);
    window.open(`https://wa.me/${tel}?text=${mensaje}`, '_blank');
}
