function initNavbar() {
  const btnIncrease = document.getElementById('font-increase');
  const btnDecrease = document.getElementById('font-decrease');

  let currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      currentSize = Math.min(currentSize + 2, 24);
      document.documentElement.style.fontSize = currentSize + 'px';
    });
  }

  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      currentSize = Math.max(currentSize - 2, 12);
      document.documentElement.style.fontSize = currentSize + 'px';
    });
  }
}
