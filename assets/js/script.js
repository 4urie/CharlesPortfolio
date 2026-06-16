'use strict';

const addEventOnElements = (elements, eventType, callback) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const preloader = document.querySelector('[data-preloader]');
const header = document.querySelector('[data-header]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navLinks = document.querySelectorAll('.navbar-link');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('DOMContentLoaded', () => {
  preloader?.classList.add('loaded');
  document.body.classList.add('loaded');
});

const toggleNavbar = () => {
  navbar.classList.toggle('active');
  navToggleBtn.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');

  const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
  navToggleBtn.setAttribute('aria-expanded', String(!expanded));
};

addEventOnElements(navTogglers, 'click', toggleNavbar);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('active')) toggleNavbar();
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('active', window.scrollY >= 80);
});

const setActiveLink = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.navbar-link[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((navLink) => navLink.classList.remove('active'));
      link?.classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('resize', setActiveLink);
window.addEventListener('load', setActiveLink);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18
  });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
