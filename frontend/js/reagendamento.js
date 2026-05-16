fetch('../html/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
        initNavbar();
    });

const params = new URLSearchParams(window.location.search);
const consultaId = params.get('id');

const consultas = {
    1: { titulo: 'Clínica Geral — Dr. Ricardo Alves', local: 'Hospital Care Plus', endereco: 'Av. Paulista, 1000 — São Paulo', data: 'Segunda-feira, 12 de maio de 2025', hora: '14h30', icone: '🩺' },
    2: { titulo: 'Cardiologia — Dra. Ana Souza', local: 'Clínica Care Plus', endereco: 'Rua Vergueiro, 500 — São Paulo', data: 'Quinta-feira, 15 de maio de 2025', hora: '09h00', icone: '❤️' },
    3: { titulo: 'Odontologia — Dr. Paulo Melo', local: 'Clínica Care Plus', endereco: 'Rua Augusta, 200 — São Paulo', data: 'Terça-feira, 20 de maio de 2025', hora: '16h00', icone: '🦷' },
};

const consulta = consultas[consultaId] || consultas[2];

const horariosDisponiveis = ['08h00', '09h00', '10h30', '11h00', '13h30', '14h30', '15h00', '16h00'];
const horariosIndisponiveis = ['08h00', '15h00'];

let dataSelecionada = null;
let horaSelecionada = null;
let mesAtual = new Date(2025, 4);

const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const diasSemana = ['D','S','T','Q','Q','S','S'];

function renderConsultaAtual() {
    document.getElementById('consulta-atual').innerHTML = `
    <div class="consulta-atual">
      <div class="card-icone">${consulta.icone}</div>
      <div>
        <div class="card-titulo">${consulta.titulo}</div>
        <div class="card-local">${consulta.local} — ${consulta.endereco}</div>
        <div class="card-data">
          <img src="../imagens/icone-calendario.png" alt="Data" style="width:14px;height:14px;vertical-align:middle;">
          ${consulta.data} &nbsp;|&nbsp;
          <img src="../imagens/relogio.png" alt="Hora" style="width:14px;height:14px;vertical-align:middle;">
          ${consulta.hora}
          <span class="badge-atual">Agendada</span>
        </div>
      </div>
    </div>
  `;
}

function renderCalendario() {
    const grid = document.getElementById('cal-grid');
    const monthLabel = document.getElementById('cal-month');
    monthLabel.textContent = `${meses[mesAtual.getMonth()]} ${mesAtual.getFullYear()}`;

    const hoje = new Date(2025, 4, 10);
    const primeiroDia = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), 1).getDay();
    const totalDias = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0).getDate();

    let html = diasSemana.map(d => `<div class="cal-label">${d}</div>`).join('');

    for (let i = 0; i < primeiroDia; i++) html += `<div class="cal-day unavailable"></div>`;

    for (let d = 1; d <= totalDias; d++) {
        const data = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), d);
        const isHoje = data.toDateString() === hoje.toDateString();
        const isPast = data <= hoje;
        const isSelecionado = dataSelecionada && data.toDateString() === dataSelecionada.toDateString();
        const isDomingo = data.getDay() === 0;

        let cls = 'cal-day';
        if (isPast || isDomingo) cls += ' unavailable';
        else if (isSelecionado) cls += ' selected';
        else if (isHoje) cls += ' hoje';

        html += `<div class="${cls}" data-dia="${d}">${d}</div>`;
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.cal-day:not(.unavailable)').forEach(el => {
        el.addEventListener('click', () => {
            dataSelecionada = new Date(mesAtual.getFullYear(), mesAtual.getMonth(), parseInt(el.dataset.dia));
            horaSelecionada = null;
            renderCalendario();
            renderHorarios();
            atualizarResumo();
        });
    });
}

function renderHorarios() {
    const grid = document.getElementById('hora-grid');
    grid.innerHTML = horariosDisponiveis.map(h => {
        const indisponivel = horariosIndisponiveis.includes(h);
        const selecionado = h === horaSelecionada;
        let cls = 'hora-slot';
        if (indisponivel) cls += ' unavailable';
        else if (selecionado) cls += ' selected';
        return `<div class="${cls}" data-hora="${h}">${h}</div>`;
    }).join('');

    grid.querySelectorAll('.hora-slot:not(.unavailable)').forEach(el => {
        el.addEventListener('click', () => {
            horaSelecionada = el.dataset.hora;
            renderHorarios();
            atualizarResumo();
        });
    });
}

function atualizarResumo() {
    const novaData = dataSelecionada
        ? dataSelecionada.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : 'Nenhuma data selecionada';

    document.getElementById('resumo-nova-data').textContent = novaData.charAt(0).toUpperCase() + novaData.slice(1);
    document.getElementById('resumo-nova-hora').textContent = horaSelecionada ? `${horaSelecionada} — ${consulta.titulo.split('—')[1]?.trim() || ''}` : '';
    document.getElementById('barra-data').textContent = dataSelecionada && horaSelecionada
        ? `${novaData.charAt(0).toUpperCase() + novaData.slice(1)} — ${horaSelecionada}`
        : 'Selecione data e horário';

    document.getElementById('btn-confirmar').disabled = !(dataSelecionada && horaSelecionada);
}

function inicializar() {
    renderConsultaAtual();

    document.getElementById('resumo-atual-data').textContent = consulta.data;
    document.getElementById('resumo-atual-hora').textContent = `${consulta.hora} — ${consulta.titulo.split('—')[1]?.trim() || ''}`;
    document.getElementById('resumo-local').textContent = consulta.local;
    document.getElementById('resumo-endereco').textContent = consulta.endereco;
    document.getElementById('barra-consulta').textContent = consulta.titulo;
    document.getElementById('btn-confirmar').disabled = true;

    renderCalendario();
    renderHorarios();

    document.getElementById('cal-prev').addEventListener('click', () => {
        mesAtual = new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1);
        renderCalendario();
    });

    document.getElementById('cal-next').addEventListener('click', () => {
        mesAtual = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1);
        renderCalendario();
    });

    document.getElementById('btn-voltar').addEventListener('click', () => {
        window.history.back();
    });

    document.getElementById('btn-confirmar').addEventListener('click', () => {
        window.location.href = `minhas-consultas.html`;
    });
}

document.addEventListener('DOMContentLoaded', inicializar);