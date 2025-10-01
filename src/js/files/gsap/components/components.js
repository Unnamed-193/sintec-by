import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрация плагина
gsap.registerPlugin(ScrollTrigger);


// Основная функция инициализации анимаций
function initAnimations() {
  // Настройки по умолчанию для ScrollTrigger
  ScrollTrigger.defaults({
    markers: false,
    scroller: window,
    anticipatePin: 1
  });

  initLineAnimation();
  initTechAnimation();
}

// Функция для анимации секции Components
function initOwAnimation() {
  const owSection = document.querySelector('.ow');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const tl = gsap.timeline({ delay: 0.2, defaults: { duration: 0.5, ease: "power1.in" } });

  
  if (isMobile) {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: owSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
        markers: false
      }
    });
    tl1.from('.ow__title', { y: 30, autoAlpha: 0, ease: "power1.out" });
    tl1.from('.ow__text', { y: 30, autoAlpha: 0, ease: "power1.out" }, '0.2');
    tl1.from('.ow__list .ow__list-item', { y: 30, autoAlpha: 0, stagger: 0.3, ease: "power1.out" });
    
    
  } else {
    tl.from('.ow__title', { y: 30, autoAlpha: 0, ease: "power1.out" });
    tl.from('.ow__text', { y: 30, autoAlpha: 0, ease: "power1.out" }, '0.2');
    tl.from('.ow__list .ow__list-item', { y: 30, autoAlpha: 0, stagger: 0.3, ease: "power1.out" });

  }
  
}

// Функция для анимации секции Line
function initLineAnimation() {
  const lineSection = document.querySelector('.sale');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const lineTl = gsap.timeline({
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true,
      markers: true
    }
  });

  if (isMobile) {
    const lineTl1 = gsap.timeline({
      scrollTrigger: {
        trigger: lineSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
        markers: false
      }
    });

      lineTl1.from('.sale__title', { y: 30, autoAlpha: 0, ease: "power1.out" });
    lineTl1.from('.sale__steps .step', { y: 30, autoAlpha: 0, stagger: 0.2, ease: "power1.out" });
    lineTl1.from('.sale__form', { y: 30, autoAlpha: 0, ease: "power1.out" });

  } else {
    lineTl.from('.sale__title', { y: 30, autoAlpha: 0, ease: "power1.out" });
    lineTl.from('.sale__steps .step', { y: 30, autoAlpha: 0, stagger: 0.2, ease: "power1.out" });
    lineTl.from('.sale__form', { y: 30, autoAlpha: 0, ease: "power1.out" });
  }

}

// Функция для анимации секции Evidence
function initTechAnimation() {
  const techSection = document.querySelector('.questions');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: techSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });



      tl.from('.questions__title', { y: 30, autoAlpha: 0, ease: "power1.out" });
    tl.from('.accordion .accordion__item', { y: 30, autoAlpha: 0, stagger: 0.3, ease: "power1.out" });



}

// Обработчик ресайза с дебаунсом
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация с небольшой задержкой для стабильности
  initOwAnimation();
  setTimeout(() => {
    
    initAnimations();
    ScrollTrigger.refresh();
  }, 500);
});

// Убираем обработчики при unmount (если используется в SPA)
window.addEventListener('beforeunload', () => {
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});