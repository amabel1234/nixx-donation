/* ===========================
   LOADER
=========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) { loader.classList.add('hidden'); }
  }, 1800);
});

/* ===========================
   CURSOR GLOW
=========================== */
const cursorGlow = document.getElementById('cursor-glow');
if (window.innerWidth > 768 && cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

/* ===========================
   NAVBAR SCROLL
=========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===========================
   PARTICLE CANVAS
=========================== */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COLORS = ['rgba(168,85,247,', 'rgba(34,211,238,', 'rgba(244,114,182,'];
  const COUNT = window.innerWidth < 600 ? 35 : 70;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.1,
    };
  }

  function initP() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  initP();
  draw();
  window.addEventListener('resize', () => { resize(); initP(); });
})();

/* ===========================
   SCROLL REVEAL
=========================== */
(function initReveal() {
  const els = document.querySelectorAll(
    '.stat-card, .qris-card, .section-header, .saweria-wrap, .progress-section, .footer-brand, .footer-links-col'
  );
  els.forEach(el => el.classList.add('reveal'));

  const cards = document.querySelectorAll('.stat-card');
  cards.forEach((el, i) => el.classList.add('reveal-delay-' + (i % 3 + 1)));

  const qrisCards = document.querySelectorAll('.qris-card');
  qrisCards.forEach((el, i) => el.classList.add('reveal-delay-' + (i % 3 + 1)));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ===========================
   COUNTER ANIMATION
=========================== */
function animateCounter(el, target, prefix, suffix, duration) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    el.textContent = prefix + current.toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function animateRupiah(el, target, duration) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    el.textContent = 'Rp ' + current.toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function animatePercent(el, target, duration) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    el.textContent = current + '%';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ===========================
   STAT BARS + COUNTERS
=========================== */
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;

  // Animate rupiah
  const totalDon = document.getElementById('total-donations');
  if (totalDon) animateRupiah(totalDon, 2450000, 2200);

  // Animate supporters
  const totalSup = document.getElementById('total-supporters');
  if (totalSup) animateCounter(totalSup, 134, '', '', 2000);

  // Animate percent
  const pct = document.getElementById('progress-pct');
  if (pct) animatePercent(pct, 89, 2000);

  // Animate projects
  const proj = document.getElementById('total-projects');
  if (proj) animateCounter(proj, 12, '', '', 1800);

  // Hero total
  const heroTotal = document.getElementById('hero-total');
  if (heroTotal) animateRupiah(heroTotal, 2450000, 2500);

  // Stat bars
  document.querySelectorAll('.stat-fill').forEach(bar => {
    const w = bar.getAttribute('data-width');
    if (w) {
      setTimeout(() => { bar.style.width = w + '%'; }, 300);
    }
  });

  // Progress bar
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const w = bar.getAttribute('data-width');
    if (w) {
      setTimeout(() => { bar.style.width = w + '%'; }, 500);
    }
  });
}

// Trigger stats when section is visible
const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
      statsObs.disconnect();
    }
  }, { threshold: 0.2 });
  statsObs.observe(statsSection);
}

// Trigger hero counter on load
setTimeout(() => {
  const heroTotal = document.getElementById('hero-total');
  if (heroTotal) animateRupiah(heroTotal, 2450000, 2500);
}, 2000);

/* ===========================
   SMOOTH SCROLL (fallback)
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===========================
   QRIS CARD HOVER TILT
=========================== */
document.querySelectorAll('.qris-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 8;
    const rotY = (x / rect.width) * 8;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

/* ===========================
   SAWERIA BUTTON CLICK FX
=========================== */
const sawBtn = document.querySelector('.btn-saweria');
if (sawBtn) {
  sawBtn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = sawBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.3);
      transform:scale(0); animation:ripple-fx 0.6s linear;
      pointer-events:none;
    `;
    sawBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// Ripple keyframe
const style = document.createElement('style');
style.textContent = '@keyframes ripple-fx { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(style);
