import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ delay: 0.7, defaults: { duration: 0.3, ease: "power1.in" } });
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  if (isMobile) {
    tl.from('.hero__title', {
      y: 30,
      autoAlpha: 0,
      ease: "none"
    },)
    tl.from('.hero__icon', {
      delay: 0.09,
      y: 30,
      autoAlpha: 0,
      ease: "sine.in"
    }, 'img');
    tl.from('.hero__bottles', {
      delay: 0.09,
      y: 30,
      autoAlpha: 0,
      ease: "sine.in"
    }, 'img');

    tl.from('.hero__button', {
      y: 30,
      autoAlpha: 0,
    }, '-=0.2'); // Задержка после slogan-box
    tl.from('.hero__slogan', {
      y: 30,
      autoAlpha: 0,
      ease: "sine.in"
    }, "-=0.2");
  } else {
    // 1. Анимация заголовка и текста
    tl.from('.hero__bottles', {
      x: -30,
      autoAlpha: 0,
      ease: "sine.in"
    }, 'bottle')

    .from('.hero__button', {
      x: 30,
      autoAlpha: 0,
      ease: "sine.in"
    }, "bottle"); 


    tl.from('.hero__title', {
      y: 30,
      autoAlpha: 0,
      ease: "none"
    }, '-=0.1').from('.hero__icon', {
      y: 30,
      autoAlpha: 0,
      ease: "sine.in"
    }, '-=0.2').from('.hero__slogan', {
      y: 30,
      autoAlpha: 0,
      ease: "sine.in"
    }, '-=0.2');


   
  }



});