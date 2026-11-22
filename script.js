document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particles-container');
  const welcomeScreen = document.getElementById('welcome-screen');
  const scrollScreen = document.getElementById('scroll-screen');
  const unlockBtn = document.getElementById('unlock-btn');
  const waxSeal = document.getElementById('wax-seal');
  const parchmentWrapper = document.getElementById('parchment-wrapper');
  const instructionHint = document.getElementById('instruction-hint');
  const instaFloatingBtn = document.getElementById('insta-floating-btn');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('close-lightbox');

  const symbols = ['❤️', '✨', '💖', '🌸'];

  function createParticle() {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.fontSize = Math.random() * 14 + 12 + 'px';
    const duration = Math.random() * 6 + 6;
    particle.style.animationDuration = duration + 's';
    particlesContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  setInterval(createParticle, 550);

  unlockBtn.addEventListener('click', () => {
    for (let i = 0; i < 18; i++) {
      setTimeout(createParticle, i * 60);
    }

    welcomeScreen.classList.add('fade-out');

    setTimeout(() => {
      welcomeScreen.classList.add('hidden');
      scrollScreen.classList.remove('hidden');
    }, 850);
  });

  function openParchment() {
    if (parchmentWrapper.classList.contains('open')) return;

    waxSeal.classList.add('broken');
    instructionHint.classList.add('hide');

    setTimeout(() => {
      parchmentWrapper.classList.remove('closed');
      parchmentWrapper.classList.add('open');

      // Mostrar el botón flotante poco después de que empiece a abrirse el pergamino
      instaFloatingBtn.classList.remove('hidden');
      setTimeout(() => {
        instaFloatingBtn.classList.add('visible');
      }, 900);
    }, 250);
  }

  waxSeal.addEventListener('click', openParchment);

  parchmentWrapper.addEventListener('click', () => {
    if (parchmentWrapper.classList.contains('closed')) {
      openParchment();
    }
  });

  const letterFrame = document.querySelector('.letter-frame');
  if (letterFrame) {
    letterFrame.addEventListener('click', () => {
      if (!parchmentWrapper.classList.contains('open')) return;
      const img = letterFrame.querySelector('img');
      lightboxImg.src = img.src;
      lightboxCaption.textContent = letterFrame.getAttribute('data-caption') || '';
      lightbox.classList.remove('hidden');
    });
  }

  closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
    }
  });
});
