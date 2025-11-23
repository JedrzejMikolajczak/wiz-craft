document.getElementById('year').textContent = new Date().getFullYear();
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 120; 

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Nowa logika animacji wczytywania
const revealElementsOnScroll = () => {
  const revealElements = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150; // Punkt w viewport (150px od dołu), w którym element ma się pojawić

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      // Opcjonalnie: usunięcie klasy, jeśli element wyjedzie poza ekran (dla wielokrotnego uruchamiania)
      // el.classList.remove('active');
    }
  });
};

// Dodanie słuchaczy zdarzeń
window.addEventListener('scroll', revealElementsOnScroll);
window.addEventListener('load', revealElementsOnScroll); // Uruchomienie przy starcie, aby elementy na górze strony od razu się pojawiły
// ... (Twój kod animateParticles()...)
// ... (Twój kod revealElementsOnScroll()...)

// NOWA LOGIKA DLA SLIDERA PORTFOLIO
const slides = document.querySelectorAll('.design-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function updateSwitcher() {
    // 1. Usuń klasę 'active' ze wszystkich slajdów
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[currentIndex].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    // Oblicz nowy index (zawijanie do końca)
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSwitcher();
});

nextBtn.addEventListener('click', () => {
    // Oblicz nowy index (zawijanie do początku)
    currentIndex = (currentIndex + 1) % slides.length;
    updateSwitcher();
});

// Inicjalizacja przy ładowaniu strony
updateSwitcher();