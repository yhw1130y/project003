document.querySelectorAll('.detail_nav_item').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.detail_nav_item').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // 여기서 탭별로 콘텐츠 전환 추가 가능!
  });
});




//탭 컨텐츠 영역 (서브페이지 하단)
// (접고 펼치기)
document.addEventListener('DOMContentLoaded', function() {
  function setupToggle(boxId, btnId) {
    const box = document.getElementById(boxId);
    const btn = document.getElementById(btnId);
    btn.addEventListener('click', function() {
      const isFold = box.classList.contains('fold');
      if (isFold) {
        box.classList.remove('fold');
        box.classList.add('open');
        btn.textContent = '접어보기 ▲';
      } else {
        box.classList.remove('open');
        box.classList.add('fold');
        btn.textContent = '펼쳐보기 ▼';
      }
    });
  }
  setupToggle('descBox', 'descToggleBtn');      // 책소개
  setupToggle('indexBox', 'indexToggleBtn');    // 목차
  setupToggle('reviewBox', 'reviewToggleBtn');  // ★ 출판사 서평 추가!
});

document.addEventListener('DOMContentLoaded', function () {
  const stickyBox = document.querySelector('.purchase-sticky-box');
  const aside = stickyBox.parentElement;
  const container = document.querySelector('.product-main-wrap');

  function updateSticky() {
    const containerRect = container.getBoundingClientRect();
    const boxHeight = stickyBox.offsetHeight;
    const winTop = window.scrollY || window.pageYOffset;
    const offsetTop = container.offsetTop;
    const stickyTop = 32;

    // 컨테이너의 상단보다 위에 있을 때: static
    if (winTop + stickyTop < offsetTop) {
      stickyBox.style.position = 'static';
      stickyBox.style.top = '';
      stickyBox.style.bottom = '';
      stickyBox.style.left = '';
      stickyBox.style.right = '';
    }
    // 컨테이너 안, 아래 닿기 전: fixed
    else if (winTop + stickyTop + boxHeight < offsetTop + container.offsetHeight) {
      stickyBox.style.position = 'fixed';
      stickyBox.style.top = stickyTop + 'px';
      stickyBox.style.bottom = '';
      stickyBox.style.right = '';
      // 💡 "left"를 1060px 컨텐츠 우측에 맞추기!
      // 1. 컨테이너의 left 좌표 + 720px(컨텐츠) + 60px(마진)
      const left = containerRect.left + 720 + 60;
      stickyBox.style.left = left + 'px';
      stickyBox.style.right = 'auto';
    }
    // 컨테이너 하단 부딪히면: absolute
    else {
      stickyBox.style.position = 'absolute';
      stickyBox.style.top = 'auto';
      stickyBox.style.bottom = '0';
      stickyBox.style.left = '';
      stickyBox.style.right = '';
    }
  }

  window.addEventListener('scroll', updateSticky);
  window.addEventListener('resize', updateSticky);
  updateSticky();
});


// 하단 카테고리
document.querySelectorAll('.detail_nav_item').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = btn.dataset.target;
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const navHeight = document.querySelector('.detail_nav_wrap').offsetHeight;
      // 스티키 네비 높이만큼 보정 (탑바가 섹션 가리지 않게!)
      const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    // 탭 active 스타일 처리
    document.querySelectorAll('.detail_nav_item').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
  });
});