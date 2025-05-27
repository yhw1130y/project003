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
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

swiperEl.addEventListener("autoplaytimeleft", (e) => {
  const [swiper, time, progress] = e.detail;
  progressCircle.style.setProperty("--progress", 1 - progress);
  progressContent.textContent = `${Math.ceil(time / 1000)}s`;

  Object.assign(swiperEl, {
  navigation: {
    nextEl: '.custom-button-next',
    prevEl: '.custom-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  loop: true
});

swiperEl.initialize();

});

// 공지사항
const notices = [
  '[공지] 개인정보 처리방침 개정 안내 (2024.06.01)',
  '[이벤트] 2024 상반기 사은품 지급 기준 변경',
  '[안내] 모바일 앱 업데이트 안내'
];
let idx = 0;

setInterval(() => {
  idx = (idx + 1) % notices.length;
  $('#noticeRolling').fadeOut(200, function() {
    $(this).text(notices[idx]).fadeIn(200);
  });
}, 2500);