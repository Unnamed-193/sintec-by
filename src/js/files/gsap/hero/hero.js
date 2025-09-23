import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ delay: 0.2, defaults: { duration: 0.5, ease: "power1.in" } });
  const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
  
  // 1. Анимация заголовка и текста
  tl.from('.hero__title', { 
    y: 30, 
    autoAlpha: 0, 
    ease: "none"
  }, 'text')
    tl.from('.hero__title-second', { 
      delay: 0.09,
      y: 30, 
      autoAlpha: 0, 
      ease: "sine.in"
    }, 'text');
    tl.from('.hero__bottles', { 
      x: 60, 
      autoAlpha: 0, 
      ease: "sine.in"
    }, 'text');
    

  // 3. Анимация кнопки (после slogan-box)
  tl.from('.hero__button', { 
    y: 30, 
    autoAlpha: 0, 
  }, "red"); // Задержка после slogan-box
  tl.from('.hero__slogan', { 
    y: 30, 
    autoAlpha: 0, 
  }, "red"); // Задержка после slogan-box

  // 4. Анимация фар (после всех элементов)
  tl.fromTo('.headlights', 
    { autoAlpha: 0 }, 
    { 
      delay: 0.3,
      autoAlpha: 1, 
      yoyo: true, 
      repeat: 1 
    }
  );
});