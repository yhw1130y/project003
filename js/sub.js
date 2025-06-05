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

const OFFSET = 7; // 보통 네비+조금 더 보정 (네비+10~30px 정도가 가장 자연스러움)
const sectionIds = [
  "section-info",
  "section-review",
  "section-recommend",
  "section-exchange"
];
const navItems = document.querySelectorAll('.detail_nav_item');

window.addEventListener('scroll', function() {
  let scrollY = window.pageYOffset;
  let currentIdx = 0;
  let navHeight = document.querySelector('.detail_nav_wrap')?.offsetHeight || 0;

  sectionIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.pageYOffset - navHeight - OFFSET;
    if (scrollY >= sectionTop) currentIdx = idx;
  });

  navItems.forEach((btn, idx) => {
    if (idx === currentIdx) btn.classList.add('active');
    else btn.classList.remove('active');
  });
});
