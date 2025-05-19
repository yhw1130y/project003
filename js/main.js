document.addEventListener('DOMContentLoaded', () => {
  const dropdownTrigger = document.querySelector('.has-dropdown');
  const dropdownMenu = document.querySelector('.gnb_dropdown');

  if (!dropdownTrigger || !dropdownMenu) {
    console.warn("⚠️ 드롭다운 대상 요소가 없습니다.");
    return;
  }

  dropdownTrigger.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
  });

  dropdownTrigger.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!dropdownMenu.matches(':hover')) {
        dropdownMenu.style.display = 'none';
      }
    }, 100);
  });

  dropdownMenu.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
  });

  dropdownMenu.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
  });
});


// 슬라이드
 const swiperEl = document.querySelector('swiper-container');
    const swiper = swiperEl.swiper;

    var appendNumber = 4;
    var prependNumber = 1;
    document
      .querySelector(".prepend-2-slides")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.prependSlide([
          '<swiper-slide>Slide ' + --prependNumber + "</swiper-slide>",
          '<swiper-slide>Slide ' + --prependNumber + "</swiper-slide>",
        ]);
      });
    document
      .querySelector(".prepend-slide")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.prependSlide(
          '<swiper-slide>Slide ' + --prependNumber + "</swiper-slide>"
        );
      });
    document
      .querySelector(".append-slide")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.appendSlide(
          '<swiper-slide>Slide ' + ++appendNumber + "</swiper-slide>"
        );
      });
    document
      .querySelector(".append-2-slides")
      .addEventListener("click", function (e) {
        e.preventDefault();
        swiper.appendSlide([
          '<swiper-slide>Slide ' + ++appendNumber + "</swiper-slide>",
          '<swiper-slide>Slide ' + ++appendNumber + "</swiper-slide>",
        ]);
      });
      const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");

    swiperEl.addEventListener("autoplaytimeleft", (e) => {
      const [swiper, time, progress] = e.detail;
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    });

