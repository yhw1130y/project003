document.querySelectorAll('.detail_nav_item').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.detail_nav_item').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // 여기서 탭별로 콘텐츠 전환 추가 가능!
  });
});




//도서 하단 시작
// 도서정보 collapse toggle (접기/펼치기)
document.querySelectorAll('.collapse-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const target = btn.dataset.target;
    const contentBox = document.querySelector(`.collapse-box[data-box="${target}"]`);
    const isCollapsed = contentBox.classList.toggle('collapsed');
    if (isCollapsed) {
      btn.innerHTML = '펼쳐보기 <span>▼</span>';
    } else {
      btn.innerHTML = '접어보기 <span>▲</span>';
    }
  });

  // 시작 시, 책소개는 기본 펼침, 목차/서평은 접힘
  const target = btn.dataset.target;
  const contentBox = document.querySelector(`.collapse-box[data-box="${target}"]`);
  if (target === 'intro') {
    contentBox.classList.remove('collapsed');
    btn.innerHTML = '접어보기 <span>▲</span>';
  } else {
    contentBox.classList.add('collapsed');
    btn.innerHTML = '펼쳐보기 <span>▼</span>';
  }
});