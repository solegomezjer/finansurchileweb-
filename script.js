document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(item => observer.observe(item));

const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  note.textContent = 'Enviando...';
  note.className = 'form-note';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      note.textContent = 'Gracias, te contactaremos a la brevedad.';
      note.className = 'form-note success';
      form.reset();
    } else {
      throw new Error('submit failed');
    }
  } catch (err) {
    note.textContent = 'No pudimos enviar el mensaje. Escríbenos por WhatsApp o al correo.';
    note.className = 'form-note error';
  }
});
