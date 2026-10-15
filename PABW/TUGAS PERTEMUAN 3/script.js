const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Buka menu' : 'Tutup menu');
  mainMenu.classList.toggle('open', !isOpen);
});

mainMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu');
    mainMenu.classList.remove('open');
  });
});

const navLinks = [...document.querySelectorAll('.nav-link')];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

observedSections.forEach((section) => sectionObserver.observe(section));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

document.querySelectorAll('.gallery-card').forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    lightboxImage.src = card.dataset.full || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = card.dataset.caption || image.alt;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();
