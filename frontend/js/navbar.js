const fontIncreaseBtn = document.getElementById('font-increase');
const fontDecreaseBtn = document.getElementById('font-decrease');
const profileBtn = document.querySelector('.profile-btn');

let currentFontSize = parseFloat(localStorage.getItem('fontSize')) || 16;

document.documentElement.style.fontSize = currentFontSize + 'px';

fontIncreaseBtn.addEventListener('click', function() {
    if (currentFontSize < 24) {
        currentFontSize += 2;
        document.documentElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    }
});

fontDecreaseBtn.addEventListener('click', function() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    }
});

profileBtn.addEventListener('click', function() {
    console.log('Perfil botão clicado');
});
