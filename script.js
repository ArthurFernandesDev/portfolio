/* =====================================================
   ARTHUR FERNANDES — PORTFOLIO
   script.js
   ===================================================== */

/* ===================== CURSOR PERSONALIZADO ===================== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Follower com lag suave
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover em links e botões
  const hoverTargets = document.querySelectorAll('a, button, .projeto-card, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
  });
})();

/* ===================== NAVBAR: scroll + mobile ===================== */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const links     = navLinks.querySelectorAll('.nav-link');

  // Efeito ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle mobile
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Fechar ao clicar num link (mobile)
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ===================== SCROLL SUAVE ===================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ===================== INTERSECTION OBSERVER: REVEAL ===================== */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ===================== TYPEWRITER ===================== */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Desenvolvedor em Formação',
    'Entusiasta de Java & Spring',
    'Aprendendo todos os dias',
    'Back-end Developer',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === current.length) {
      // Chegou ao final: pausa antes de apagar
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400; // pausa antes de começar nova frase
    }

    if (!isPaused) setTimeout(type, speed);
  }

  // Atraso inicial para carregar após animação do hero
  setTimeout(type, 1200);
})();

/* ===================== CONTADOR DE STATS ===================== */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const step   = 16;
      const increment = target / (duration / step);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();

/* ===================== SKILL BARS ===================== */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill  = entry.target;
      const width = fill.dataset.width || 0;
      // Pequeno atraso para o efeito ser visível
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      observer.unobserve(fill);
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();

/* ===================== BOTÃO VOLTAR AO TOPO ===================== */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===================== FORMULÁRIO DE CONTATO ===================== */
(function initContactForm() {
  const sendBtn = document.getElementById('send-btn');
  const success = document.getElementById('form-success');
  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {
    const nome     = document.getElementById('nome')?.value.trim();
    const email    = document.getElementById('email')?.value.trim();
    const mensagem = document.getElementById('mensagem')?.value.trim();

    // Validação simples
    if (!nome || !email || !mensagem) {
      // Shake nos campos vazios
      [{ id: 'nome', val: nome }, { id: 'email', val: email }, { id: 'mensagem', val: mensagem }]
        .forEach(({ id, val }) => {
          if (!val) {
            const el = document.getElementById(id);
            el.style.borderColor = '#ff5f57';
            el.style.animation = 'shake 0.4s';
            setTimeout(() => {
              el.style.borderColor = '';
              el.style.animation = '';
            }, 800);
          }
        });
      return;
    }

    // Simular envio
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';
    sendBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-opacity="0.3"/>
        <path d="M12 3a9 9 0 019 9" />
      </svg>
      Enviando...
    `;

    setTimeout(() => {
      sendBtn.style.display = 'none';
      success.classList.add('show');

      // Limpar campos
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('mensagem').value = '';
    }, 1800);
  });

  // Limpar erro ao digitar
  ['nome', 'email', 'mensagem'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', (e) => {
      e.target.style.borderColor = '';
    });
  });
})();

/* ===================== EFEITO PARALLAX NOS ORBS ===================== */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
})();

/* ===================== ANIMAÇÃO SHAKE (CSS via JS) ===================== */
(function injectShakeAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();

/* ===================== HIGHLIGHT LINK ATIVO NO SCROLL ===================== */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
      }
    });
  }, { passive: true });
})();

/* ===================== EFEITO GLOW NO HOVER DO CARD ===================== */
(function initCardGlow() {
  const cards = document.querySelectorAll('.projeto-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
})();

/* ===================== MODAL DE VÍDEO — EPI SYSTEM ===================== */
(function initVideoModal() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });
})();

function openVideoModal() {
  const overlay = document.getElementById('video-modal-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const overlay = document.getElementById('video-modal-overlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function watchOnYouTube() {
  window.open('https://www.youtube.com/watch?v=geOoP1lVYII', '_blank');
}
