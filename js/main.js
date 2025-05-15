document.addEventListener('DOMContentLoaded', () => {
  const dropdownTrigger = document.querySelector('.has-dropdown');
  const dropdownMenu = document.querySelector('.gnb_dropdown');

  if (!dropdownTrigger || !dropdownMenu) {
    console.warn("⚠️ 드롭다운 대상 요소가 없습니다.");
    return;
  }

  // 드롭다운 열기
  dropdownTrigger.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
  });

  // 드롭다운 닫기 (트리거에서 벗어날 때)
  dropdownTrigger.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!dropdownMenu.matches(':hover')) {
        dropdownMenu.style.display = 'none';
      }
    }, 100);
  });

  // 드롭다운에 마우스 올렸을 때 유지
  dropdownMenu.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
  });

  // 드롭다운에서 마우스 벗어났을 때 닫힘
  dropdownMenu.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
  });
});

