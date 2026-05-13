function initNavbar() {
  const btnIncrease = document.getElementById('font-increase');
  const btnDecrease = document.getElementById('font-decrease');
  const btnCancelar = document.getElementById('btn-cancelar');
  const btnHome = document.getElementById('btn-home');
  const btnRecompensas = document.getElementById('btn-recompensas');
  const btnLembretes = document.getElementById('btn-lembretes');

  let zoomLevel = 1;

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      zoomLevel = Math.min(zoomLevel + 0.1, 1.5);
      document.body.style.zoom = zoomLevel;
    });
  }

  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      zoomLevel = Math.max(zoomLevel - 0.1, 0.8);
      document.body.style.zoom = zoomLevel;
    });
  }

  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      window.location.href = 'cancelamento.html';
    });
  }

  if (btnHome) {
    btnHome.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  }

  if (btnRecompensas) {
    btnRecompensas.addEventListener('click', () => {
      window.location.href = 'recompensas.html';
    });
  }

  if (btnLembretes) {
    btnLembretes.addEventListener('click', () => {
      window.location.href = 'lembretes.html';
    });
  }

  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'cancelamento.html' && btnCancelar) {
    btnCancelar.classList.add('navbar-action-bold');
  } else if (currentPage === 'recompensas.html' && btnRecompensas) {
    btnRecompensas.classList.add('navbar-action-bold');
  } else if (currentPage === 'lembretes.html' && btnLembretes) {
    btnLembretes.classList.add('navbar-action-bold');
  }
}
