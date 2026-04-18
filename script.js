// =============================
// Navbar — scroll + menú móvil
// =============================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
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

// =============================
// Máquina de escribir
// =============================
const typingEl = document.getElementById('typing');
const phrases = [
  'Developer Junior',
  'Microsoft Dynamics 365 Business Central',
  'AL Language Developer',
  'Estudiante de Ingeniería en Software'
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIdx--);
  } else {
    typingEl.textContent = current.substring(0, charIdx++);
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

// =============================
// Revelado al hacer scroll
// =============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // barras de habilidades
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      });

      // contadores
      entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';
        const target = parseInt(el.getAttribute('data-target'), 10);
        let count = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = count;
          }
        }, 30);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =============================
// Botón volver arriba
// =============================
const backBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
});

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================
// Formulario de contacto
// =============================
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const body = `Hola Gabriela,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ASaludos,%0D%0A${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
  window.location.href = `mailto:gabrielprinzlandeo@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  const btn = form.querySelector('button');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje listo!';
  setTimeout(() => { btn.innerHTML = original; form.reset(); }, 2500);
});

// =============================
// Saludo en consola
// =============================
console.log(
  '%cGabriela Vargas — Developer Junior',
  'font-size: 16px; font-weight: 600; background: #1e1a1d; color: #eec3d1; padding: 10px 18px; border-radius: 6px;'
);
console.log('%cPortafolio profesional · Microsoft Dynamics 365 Business Central', 'font-size: 12px; color: #8c4f68;');
