/* ============================================
   ON WHITE CLINIC — Electric Cinema JS
   ============================================ */
(function () {
  'use strict';

  /* ---------- Scroll Reveal (staggered) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('vis'); revObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach((el) => revObs.observe(el));

  /* ---------- Header scroll ---------- */
  const header = document.getElementById('header');
  const stickyBar = document.getElementById('stickyBar');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (stickyBar) stickyBar.classList.toggle('visible', y > 500);
  }, { passive: true });

  /* ---------- Mobile Menu ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      })
    );
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-item__q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('active');
        const b = i.querySelector('.faq-item__q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- Smooth Scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const off = (header ? header.offsetHeight : 0) + 16;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 3D Card Tilt ---------- */
  const tiltCards = document.querySelectorAll('.t-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });

  /* ---------- Parallax on Hero Image ---------- */
  const heroImg = document.querySelector('.hero__img-wrap');
  if (heroImg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.transform = `translateY(${y * 0.08}px)`;
      }
    }, { passive: true });
  }

  /* ---------- Float cards parallax ---------- */
  const floatRating = document.querySelector('.hero__float--rating');
  const floatCases = document.querySelector('.hero__float--cases');
  if (floatRating && floatCases && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        floatRating.style.transform = `translateY(${y * -0.12}px)`;
        floatCases.style.transform = `translateY(${y * -0.06}px)`;
      }
    }, { passive: true });
  }

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = el.getAttribute('data-count');
        const isNum = !isNaN(target);
        if (!isNum) return;
        const end = parseInt(target, 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.round(eased * end);
          el.textContent = prefix + current.toLocaleString('es-ES') + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterObs.observe(c));

})();
