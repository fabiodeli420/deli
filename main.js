function pedir(n, p) {
    window.open(`https://wa.me/541156584277?text=Hola! Quiero el ${n} (${p})`, '_blank');
}

document.addEventListener('mousemove', (e) => {
    const s1 = document.querySelector('.shape1');
    const s2 = document.querySelector('.shape2');
    if(s1 && s2) {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        s1.style.transform = `translate(${x}px, ${y}px)`;
        s2.style.transform = `translate(${-x}px, ${-y}px)`;
    }
});

let clicks = 0;
document.getElementById('logo').onclick = () => {
    clicks++;
    if(clicks === 5) {
        document.body.style.filter = 'hue-rotate(150deg) contrast(1.2)';
        setTimeout(() => { document.body.style.filter = 'none'; clicks = 0; }, 4000);
    }
};
