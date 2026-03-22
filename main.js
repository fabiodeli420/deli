console.log("DELIKUSH cargado correctamente");

function pedir(item) {
    const msj = encodeURIComponent("Hola DELIKUSH! 🔥 Quiero consultar por: " + item);
    window.open("https://wa.me/541156584277?text=" + msj, "_blank");
}

// Movimiento suave de las tarjetas
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', () => {
        console.log("Click en " + item.innerText);
    });
});
