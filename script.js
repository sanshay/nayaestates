const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelectorAll('.site-nav a');
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);
});

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

links.forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

const form = document.getElementById('inquiry-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Naya Estates Enquiry — ${data.get('type')}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany / Organization: ${data.get('company') || 'Not provided'}\nEnquiry Type: ${data.get('type')}\n\nOpportunity Overview:\n${data.get('message')}`
    );
    window.location.href = `mailto:info@nayaestates.com?subject=${subject}&body=${body}`;
  });
}
