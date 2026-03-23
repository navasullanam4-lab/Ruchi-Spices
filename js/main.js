/* ============================================================
   main.js — Ruchi Spices
   ============================================================ */

/* ── NAV SCROLL EFFECT ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(240,204,122,0.15)';
  } else {
    navbar.style.borderBottomColor = 'rgba(240,204,122,0.1)';
  }
});

/* ── HAMBURGER TOGGLE ───────────────────────────────────── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
if (ham && mob) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  // Close on link click
  mob.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
    });
  });
}

/* ── ACTIVE NAV LINK ────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── CONTACT FORM ───────────────────────────────────────── */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = 'rgba(226,75,74,0.7)';
        valid = false;
      }
    });
    if (!valid) return;

    // Simulate submission (replace with real backend / EmailJS / Formspree)
    const btn = form.querySelector('.cf-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    }, 1200);
  });
}

/* ── WHATSAPP FLOAT BUTTON ──────────────────────────────── */
// Reads phone number from data-phone on body, creates floating WA button
const bodyPhone = document.body.getAttribute('data-phone');
if (bodyPhone) {
  const wa = document.createElement('a');
  wa.href = `https://wa.me/${bodyPhone.replace(/[^0-9]/g, '')}`;
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = `
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <path fill="#fff" d="M16 3C9 3 3 9 3 16c0 2.3.6 4.5 1.8 6.4L3 29l6.8-1.8A13 13 0 0 0 16 29c7 0 13-6 13-13S23 3 16 3zm0 23.8a10.7 10.7 0 0 1-5.6-1.6l-.4-.2-4 1 1-3.9-.3-.4A10.8 10.8 0 1 1 16 26.8zm5.9-8c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6 0a8.5 8.5 0 0 1-2.5-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c.8.3 1.4.5 1.8.7a4.4 4.4 0 0 0 2 .1 3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.1-.4-.3-.7-.4z"/>
    </svg>`;
  Object.assign(wa.style, {
    position:'fixed', bottom:'24px', right:'24px', zIndex:'999',
    background:'#25D366', width:'52px', height:'52px', borderRadius:'50%',
    display:'flex', alignItems:'center', justifyContent:'center',
    boxShadow:'0 4px 16px rgba(0,0,0,0.35)', transition:'transform .2s'
  });
  wa.addEventListener('mouseenter', () => wa.style.transform='scale(1.1)');
  wa.addEventListener('mouseleave', () => wa.style.transform='scale(1)');
  document.body.appendChild(wa);
}
