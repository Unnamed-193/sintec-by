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

  initOwAnimation();
  initLineAnimation();
  initTechAnimation();
}

// Функция для анимации секции Components
function initOwAnimation() {
  const owSection = document.querySelector('.ow');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const bottlesContainer = document.querySelector('.ow__bottles');
  const bottles = gsap.utils.toArray('.ow__bottles img');


  if (isMobile) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: owSection,
        start: "top 40%", // Начинаем анимацию, когда верх секции достигнет низа viewport
        end: "bottom top",   // Заканчиваем анимацию, когда низ секции достигнет верха viewport
        scrub: true,  
        markers: false, // можно включить для отладки
      }
    });

    tl.to(bottlesContainer, {
      willChange: 'transform',
      force3D: true,
      x: -180,
      duration: 1.8,
    });

  } else {

    const getResponsiveY = () => {
      const screenWidth = window.innerWidth;
      // Интерполяция между 1920px (35.5rem) и 992px (30.4rem)
      const minWidth = 767.98;
      const maxWidth = 1920;
      const minY = 28.731; // rem
      const maxY = 35.5; // rem
    
      if (screenWidth >= maxWidth) return `${maxY}rem`;
      if (screenWidth <= minWidth) return `${minY}rem`;
    
      // Линейная интерполяция
      const ratio = (screenWidth - minWidth) / (maxWidth - minWidth);
      const currentY = minY + (maxY - minY) * ratio;
      return `${currentY}rem`;
    };
    
    const getResponsiveScale = () => {
      const screenWidth = window.innerWidth;
      
      // Границы изменения ширины экрана
      const minWidth = 991.98;  // Минимальная ширина (scale = 1)
      const maxWidth = 1920; // Максимальная ширина (scale = 1.38)
      
      // Если экран больше 1920px — оставляем 1.38
      if (screenWidth >= maxWidth) return 1.38;
      
      // Если экран меньше 992px — оставляем 1
      if (screenWidth <= minWidth) return 1;
      
      // Линейная интерполяция между 1.38 и 1
      const scaleRange = 1.38 - 1; // Разница между max и min scale
      const widthRange = maxWidth - minWidth; // Разница между max и min шириной
      
      // Вычисляем текущий scale
      const progress = (screenWidth - minWidth) / widthRange; // 0...1
      const currentScale = 1 + scaleRange * progress;
      
      return currentScale;
    };

    gsap.set(bottles, {
      willChange: 'transform',
      x: (i) => {
        switch (i) {
          case 0: return '335%';
          case 1: return '216%';
          case 2: return '112%';
          case 4: return '-102%';
          case 5: return '-214%';
          case 6: return '-333%';
          default: return 0;
        }
      },
      y: (i) => [0, 1, 2, 6].includes(i) ? '2%' : 0,
      opacity: (i) => i === 3 ? 1 : 0,
      zIndex: (i) => {
        if (i === 3) return 4;
        if ([0, 6].includes(i)) return 1;
        if ([1, 5].includes(i)) return 2;
        return 3;
      }
    });
    // Удаляем старые таймлайны и создаем новый с scrub
const scrollTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: owSection,
    start: "top 70%", // Начинаем анимацию, когда верх секции достигнет низа viewport
    end: "bottom top",   // Заканчиваем анимацию, когда низ секции достигнет верха viewport
    scrub: true,         // Плавное привязывание анимации к скроллу
    markers: false    // Можно включить для отладки
  }
});

// Добавляем анимации в timeline
scrollTimeline
  .fromTo(bottlesContainer, 
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 0.5 }
  )
  .to(bottles, {
    x: (i) => {
      switch (i) {
        case 0: return '169%';
        case 1: return '112%';
        case 2: return '61%';
        case 4: return '-49%';
        case 5: return '-102%';
        case 6: return '-172%';
        default: return 0;
      }
    },
    stagger: {
      each: 0.1,         // Задержка между группами
      from: "center",     // Начинаем анимацию с центра (индекс 3)
      grid: [1, 7],       // Указываем что у нас 1 строка и 7 элементов
      axis: "x",          // Ось для stagger (горизонтальная)
      // Кастомная группировка (0 и 6, 1 и 5, 2 и 4)
      custom: [
        [0, 6],          // Первая группа (крайние бутылки)
        [1, 5],          // Вторая группа
        [2, 4],          // Третья группа
        [3]              // Центральная (без задержки)
      ]
    },
    y: (i) => [0, 1, 2, 6].includes(i) ? '2%' : 0,
    opacity: 1,
    duration: 0.7,
    ease: 'power2.inOut'
  }, '<0.2')
  .to(bottles, {
    x: (i) => {
      switch (i) {
        case 0: return '335%';
        case 1: return '216%';
        case 2: return '112%';
        case 4: return '-102%';
        case 5: return '-214%';
        case 6: return '-333%';
        default: return 0;
      }
    },
    stagger: {
      each: 0.1,         // Задержка между группами
      from: "edges",      // Начинаем анимацию с краев
      grid: [1, 7],       // 1 строка и 7 элементов
      axis: "x",          // Горизонтальная ось
      // Обратная кастомная группировка (сначала крайние, потом ближе к центру)
      custom: [
        [0, 6],          // Первая группа (крайние бутылки)
        [1, 5],          // Вторая группа
        [2, 4],          // Третья группа
        [3]              // Центральная (без задержки)
      ]
    },
    opacity: (i) => i === 3 ? 1 : 0,
    duration: 0.5,
    ease: 'power2.inOut'
  })
  .to(bottles[3], {
    scale: getResponsiveScale(),
    y: getResponsiveY(),
    x: '-0.9375rem',
    zIndex: 100,
    duration: 1.5
  }, '<0.8');
  }

  
}

// Функция для анимации секции Line
function initLineAnimation() {
  const lineSection = document.querySelector('.line');
  const lineSVG = document.querySelector('.line__ellipse');
  const lineIMG = document.querySelector('.line__center img');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const isTablet = window.matchMedia('(max-width: 991.98px)').matches;
  const lineTl = gsap.timeline({
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 13%',
      toggleActions: 'play none none none',
      once: true,
      markers: false
    }
  });

  if (isMobile) {
    const lineTl = gsap.timeline({
      scrollTrigger: {
        trigger: lineSection,
        start: 'top 60%',
        toggleActions: 'play none none none',
        once: true,
        markers: false
      }
    });
    lineTl
    .from(lineSVG, {
      willChange: 'transform', // Добавьте это
      scale: 0.7,
      duration: 1.8,
      force3D: true  
    }, 'img')

    lineTl
    .from(lineIMG, {
      scale: 0.7,
      y: 70,
      duration: 1.8
    }, 'img')

    lineTl
    .from('.line__list-item', {
      delay: 0.3,
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    })

  } else if(isTablet) {
    lineTl
    .from('.line__list-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    })
  } else {

    lineTl
      .from('.line__left .line__list-item', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3
      }, 'line')
      .from('.line__right .line__list-item', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3
      }, 'line');
  }

}

// Функция для анимации секции Evidence
function initTechAnimation() {
  const techSection = document.querySelector('.tech');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const techTl = gsap.timeline({
    scrollTrigger: {
      trigger: techSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  if (isMobile) {
    techTl
      .from('.tech__suptitle', { y: 30, opacity: 0, duration: 0.8 })
      .from('.tech__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" }, '-=0.3');

    // Анимация первого элемента списка
    techTl
      .from('.tech__list-item:first-child .tech__count', { y: 20, opacity: 0, duration: 0.4 })
      .from('.tech__list-item:first-child .tech__text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.tech__list-item:first-child .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');

    // Анимация второго элемента списка
    techTl
      .from('.tech__list-item:nth-child(2) .tech__count', { y: 20, opacity: 0, duration: 0.4 })
      .from('.tech__list-item:nth-child(2) .tech__text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.tech__list-item:nth-child(2) .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
      .from('.tech__list-item:nth-child(2) .tech__text:last-child', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.tech__conclusion', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');

  } else {
    techTl
      .from('.tech__suptitle', { y: 30, opacity: 0, duration: 0.8 })
      .from('.tech__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" }, '-=0.3');

    // Анимация первого элемента списка
    techTl
      .from('.tech__list-item:first-child .tech__count', { y: 20, opacity: 0, duration: 0.4 })
      .from('.tech__list-item:first-child .tech__text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.tech__list-item:first-child .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');

    // Анимация второго элемента списка
    techTl
      .from('.tech__list-item:nth-child(2) .tech__count', { y: 20, opacity: 0, duration: 0.4 })
      .from('.tech__list-item:nth-child(2) .tech__text', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
      .from('.tech__list-item:nth-child(2) .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
      .from('.tech__conclusion', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');

  }


}

// Обработчик ресайза с дебаунсом
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация с небольшой задержкой для стабильности
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