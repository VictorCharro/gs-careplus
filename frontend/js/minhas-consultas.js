fetch('../html/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-container').innerHTML = html;
      initNavbar();
    });

const consultas = {
  proximas: [
    {
      id: 1,
      titulo: 'Clínica Geral — Dr. Ricardo Alves',
      local: 'Hospital Care Plus — Av. Paulista, 1000 — São Paulo',
      data: 'Segunda-feira, 12 de maio de 2025',
      hora: '14h30',
      prazo: 'Em 3 dias',
      prazoTipo: 'badge-blue',
      icone: '🩺',
      iconeTipo: 'icone-gray',
    },
    {
      id: 2,
      titulo: 'Cardiologia — Dra. Ana Souza',
      local: 'Clínica Care Plus — Rua Vergueiro, 500 — São Paulo',
      data: 'Quinta-feira, 15 de maio de 2025',
      hora: '09h00',
      prazo: 'Em 6 dias',
      prazoTipo: 'badge-orange',
      icone: '❤️',
      iconeTipo: 'icone-gray',
    },
    {
      id: 3,
      titulo: 'Odontologia — Dr. Paulo Melo',
      local: 'Clínica Care Plus — Rua Augusta, 200 — São Paulo',
      data: 'Terça-feira, 20 de maio de 2025',
      hora: '16h00',
      prazo: 'Em 11 dias',
      prazoTipo: 'badge-green',
      icone: '🦷',
      iconeTipo: 'icone-gray',
    },
  ],
  historico: [
    {
      id: 4,
      titulo: 'Clínica Geral — Dr. Ricardo Alves',
      local: 'Hospital Care Plus — Av. Paulista, 1000 — São Paulo',
      data: 'Segunda-feira, 07 de abril de 2025',
      hora: '10h00',
      prazo: 'Realizada',
      prazoTipo: 'badge-gray',
      icone: '🩺',
      iconeTipo: 'icone-gray',
    },
    {
      id: 5,
      titulo: 'Dermatologia — Dra. Camila Torres',
      local: 'Clínica Care Plus — Rua Haddock Lobo, 300 — São Paulo',
      data: 'Quinta-feira, 20 de março de 2025',
      hora: '14h00',
      prazo: 'Realizada',
      prazoTipo: 'badge-gray',
      icone: '💊',
      iconeTipo: 'icone-gray',
    },
  ],
};

let tabAtiva = 'proximas';

function renderLista(tab) {
  const lista = document.getElementById('lista-lembretes');
  const label = document.getElementById('section-label');
  const dados = consultas[tab];

  label.textContent = tab === 'proximas' ? 'Consultas agendadas' : 'Consultas realizadas';

  if (!dados || dados.length === 0) {
    lista.innerHTML = `
      <div class="lista-vazia">
        <span class="vazia-icone">📭</span>
        Nenhuma consulta encontrada nesta seção.
      </div>`;
    return;
  }

  lista.innerHTML = dados.map(c => montaCard(c, tab)).join('');

  dados.forEach(c => {
    document.querySelector(`#card-${c.id} .btn-confirmar`)
        ?.addEventListener('click', (e) => confirmarPresenca(c, e.target));
    document.querySelector(`#card-${c.id} .btn-reagendar`)
        ?.addEventListener('click', () => reagendarConsulta(c));
    document.querySelector(`#card-${c.id} .btn-cancelar`)
        ?.addEventListener('click', () => cancelarConsulta(c));
  });
}

function montaCard(c, tab) {
  const botoesProximas = `
    <button class="btn-confirmar">Confirmar presença</button>
    <button class="btn-reagendar">Reagendar</button>
    <button class="btn-cancelar">Cancelar</button>
  `;
  const botoesHistorico = `
    <button class="btn-reagendar">Reagendar</button>
  `;

  return `
    <div class="consulta-card" id="card-${c.id}">
      <div class="card-icone ${c.iconeTipo}">${c.icone}</div>
      <div class="card-body">
        <div class="card-titulo">${c.titulo}</div>
        <div class="card-local">${c.local}</div>
        <div class="card-data">
          <img src="../imagens/icone-calendario.png" alt="Data" style="width:16px;height:16px;vertical-align:middle;"> ${c.data}
          <span class="separador">|</span>
          <img src="../imagens/relogio.png" alt="Hora" style="width:16px;height:16px;vertical-align:middle;"> ${c.hora}
          <span class="badge ${c.prazoTipo}">${c.prazo}</span>
        </div>
        <div class="card-acoes">
          ${tab === 'proximas' ? botoesProximas : botoesHistorico}
        </div>
      </div>
    </div>
  `;
}

function confirmarPresenca(c, button) {
  button.textContent = "Presença confirmada";
  button.style.backgroundColor = "#28a745";
  button.style.color = "white";
  button.style.border = "none";
  button.disabled = true;
}

function reagendarConsulta(c) {
  window.location.href = `reagendamento.html?id=${c.id}`;
}

function cancelarConsulta(c) {
  const ok = confirm(`Cancelar consulta?\n${c.titulo} — ${c.data}`);
  if (!ok) return;
  consultas.proximas = consultas.proximas.filter(x => x.id !== c.id);
  window.location.href = 'cancelamento-sucesso.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabAtiva = btn.dataset.tab;
      tabs.forEach(b => b.classList.replace('tab-active', 'tab-inactive'));
      btn.classList.replace('tab-inactive', 'tab-active');
      renderLista(tabAtiva);
    });
  });

  renderLista(tabAtiva);
});