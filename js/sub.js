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
