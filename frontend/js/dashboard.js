fetch('../html/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
        initNavbar();
    });

const slides = document.querySelectorAll('.item');
const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progress-bar');
const totalSlides = slides.length;
const dashOffset = 94;
const intervalDuration = 5000;

let atual = 0;
let rodando = true;
let intervalo = null;
let progresso = 0;
let progressoIntervalo = null;

function irParaSlide(proximo) {
    slides[atual].classList.remove('active');
    slides[atual].classList.add('out-left');
    steps[atual].classList.remove('active');

    setTimeout(() => {
        slides[atual].classList.remove('out-left');
        atual = proximo;
        slides[atual].classList.add('active');
        steps[atual].classList.add('active');
    }, 50);

    resetarProgresso();
}

function proximo() {
    irParaSlide((atual + 1) % totalSlides);
}

function resetarProgresso() {
    progresso = 0;
    progressBar.style.strokeDashoffset = dashOffset;
}

function iniciarProgresso() {
    clearInterval(progressoIntervalo);
    progresso = 0;
    const passo = dashOffset / (intervalDuration / 100);

    progressoIntervalo = setInterval(() => {
        if (!rodando) return;
        progresso += passo;
        const offset = Math.max(0, dashOffset - progresso);
        progressBar.style.strokeDashoffset = offset;
    }, 100);
}

function iniciarAutoplay() {
    clearInterval(intervalo);
    iniciarProgresso();
    intervalo = setInterval(() => {
        if (rodando) proximo();
        iniciarProgresso();
    }, intervalDuration);
}

document.getElementById('play-btn').addEventListener('click', () => {
    rodando = !rodando;
    document.getElementById('play-btn').classList.toggle('stopped', !rodando);
});

steps.forEach((step, i) => {
    step.addEventListener('click', () => {
        clearInterval(intervalo);
        irParaSlide(i);
        iniciarAutoplay();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    iniciarAutoplay();

    document.getElementById('btn-lembretes')?.addEventListener('click', () => {
        window.location.href = 'lembretes.html';
    });

    document.getElementById('btn-agendar')?.addEventListener('click', () => {
        window.location.href = 'agendamento.html';
    });

    document.getElementById('btn-recompensas-card')?.addEventListener('click', () => {
        window.location.href = 'recompensas.html';
    });

    document.getElementById('btn-coins-cta')?.addEventListener('click', () => {
        window.location.href = 'recompensas.html';
    });
});

iniciarAutoplay();