// =========================================
// Navbar scroll + menú móvil
// =========================================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Progress bar
  const progress = document.getElementById('scrollProgress');
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrolled / height) * 100 + '%';
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// =========================================
// Typing effect
// =========================================
const typingEl = document.getElementById('typing');
const phrases = [
  'Developer Junior',
  'Dynamics 365 Business Central',
  'AL Language Developer',
  'Estudiante de Software'
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];
  typingEl.textContent = current.substring(0, isDeleting ? charIdx-- : charIdx++);

  let delay = isDeleting ? 35 : 70;

  if (!isDeleting && charIdx === current.length + 1) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

// =========================================
// Cursor personalizado (solo desktop/hover)
// =========================================
(function customCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    document.body.classList.add('cursor-ready');
  });

  function animateRing() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-ready');
  });

  const interactive = 'a, button, input, textarea, .chip, .focus-card, .skill-block, .t-body, .contact-row';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

// =========================================
// Reveal + barras
// =========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        bar.style.width = w + '%';
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =========================================
// Volver arriba
// =========================================
const backBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 500);
});

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// Formulario
// =========================================
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const body = `Hola Gabriela,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ASaludos,%0D%0A${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  window.location.href = `mailto:gabrielavarrgas2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  const btn = form.querySelector('button');
  const original = btn.innerHTML;
  btn.innerHTML = '<span>Mensaje preparado</span> <i class="fas fa-check"></i>';
  setTimeout(() => { btn.innerHTML = original; form.reset(); }, 2800);
});

// =========================================
// Consola
// =========================================
console.log(
  '%c Gabriela Vargas · Developer Junior ',
  'font-family: serif; font-style: italic; font-size: 18px; background: #1e1217; color: #efd0dc; padding: 14px 24px; border-radius: 6px;'
);
console.log('%cPortafolio profesional · Microsoft Dynamics 365 Business Central', 'font-size: 12px; color: #864768; letter-spacing: 0.05em;');
