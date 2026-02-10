// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1000);
});

// Smooth Scroll and Menu Close
document.querySelectorAll('.navigation__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.burger-menu__checkbox').checked = false; // Close menu
  });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navigation__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Theme Toggle Persistence
const toggleCheckbox = document.getElementById('toggle');
const html = document.documentElement;

toggleCheckbox.addEventListener('change', () => {
  html.classList.toggle('light-theme');
  localStorage.setItem('theme', html.classList.contains('light-theme') ? 'light' : 'dark');
});

if (localStorage.getItem('theme') === 'light') {
  html.classList.add('light-theme');
  toggleCheckbox.checked = true;
}

// Typing Animation
const words = ['Software Engineer', 'Web Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector('.typing');

function type() {
  if (charIndex < words[wordIndex].length) {
    typingElement.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 200);
  }
}

type();

// Form Validation and Submission
const form = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  formMessage.textContent = 'Sending...';
  formMessage.classList.remove('error');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formMessage.textContent = 'Message sent successfully!';
      form.reset();
    } else {
      throw new Error('Failed to send message.');
    }
  } catch (error) {
    formMessage.textContent = 'Error sending message. Please try again.';
    formMessage.classList.add('error');
  }
});

// Lazy Loading Observer
const images = document.querySelectorAll('img[loading="lazy"]');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));

// Burger Menu Toggle Fallback
const burgerCheckbox = document.querySelector('.burger-menu__checkbox');
burgerCheckbox.addEventListener('change', () => {
  const navigation = document.querySelector('.navigation');
  navigation.style.visibility = burgerCheckbox.checked ? 'visible' : 'hidden';
  navigation.style.opacity = burgerCheckbox.checked ? '1' : '0';
  navigation.style.transform = burgerCheckbox.checked ? 'translateY(0)' : 'translateY(-100%)';
});

// Close Menu on Outside Click
document.addEventListener('click', e => {
  const menuCheckbox = document.querySelector('.burger-menu__checkbox');
  const navigation = document.querySelector('.navigation');
  const burgerMenu = document.querySelector('.burger-menu');
  if (!navigation.contains(e.target) && !burgerMenu.contains(e.target) && menuCheckbox.checked) {
    menuCheckbox.checked = false;
    navigation.style.visibility = 'hidden';
    navigation.style.opacity = '0';
    navigation.style.transform = 'translateY(-100%)';
  }
});