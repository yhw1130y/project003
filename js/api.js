async function fetchBookByTitle(title) {
  const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(title)}`, {
    headers: {
      Authorization: 'KakaoAK 7dc8a40298c87972a469f758f14bd142'
    }
  });
  const data = await response.json();
  return data.documents[0]; 
}

// 오늘의 책
function renderTodaysBook(book) {
  const container = document.querySelector('.todays_book .book_list');
  const item = document.createElement('li');
  item.innerHTML = `
    <a href="${book.url}" target="_blank">
      <img src="${book.thumbnail}" alt="${book.title}">
      <div class="book_info">
        <strong class="book_title">${book.title}</strong>
        <span class="book_author">${book.authors.join(', ')}</span>
      </div>
    </a>
  `;
  container.appendChild(item);
}

const todaysTitles = [
  "우리의 낙원에서 만나자 - 이 계절을 함께 건너는 당신에게",
  "새벽 탐험 - 슷카이 그림책",
  "바움가트너",
  "더 퍼스트 - 돈과 시간을 장악하는 1% 부의 법칙",
  "클래식 왜 안 좋아하세요? - 아는 만큼 들리는 나의 첫 클래식 수업"
];

todaysTitles.forEach(title => {
  fetchBookByTitle(title).then(book => {
    if (book) renderTodaysBook(book);
    else console.warn(`❌ [검색 실패] "${title}"`);
  });
});


// md 도서
function renderMdBook(book) {
  const container = document.querySelector('.md_recommend .book_list');
  const item = document.createElement('li');
  item.innerHTML = `
    <a href="${book.url}" target="_blank">
      <img src="${book.thumbnail}" alt="${book.title}">
      <div class="book_info">
        <strong class="book_title">${book.title}</strong>
        <span class="book_author">${book.authors.join(', ')}</span>
      </div>
    </a>
  `;
  container.appendChild(item);
}

const mdRecommendTitles = [
  "내 꿈에 가끔만 놀러와",
  "김켈리의 신비마트3",
  "호수와 암실",
  "고음질 명반 가이드북 3 - 음악이 없다면 오디오파일은 없다",
  "모든 것이 양자 이론 - 세상을 이루는 17가지 기본 입자 이야기"
];

mdRecommendTitles.forEach(title => {
  fetchBookByTitle(title).then(book => {
    if (book) renderMdBook(book);
    else console.warn(`❌ [검색 실패] "${title}"`);
  });
});
// 핫북
function renderHotBook(book) {
  const container = document.querySelector('.hot_books .swiper-slide');
  const item = document.createElement('li');
  item.innerHTML = `
    <a href="${book.url}" target="_blank">
      <img src="${book.thumbnail}" alt="${book.title}">
      <div class="book_info">
        <strong class="book_title">${book.title}</strong>
        <span class="book_author">${book.authors.join(', ')}</span>
      </div>
    </a>
  `;
  container.appendChild(item);
}

const mdRecommendTitles = [
  "내 꿈에 가끔만 놀러와",
  "김켈리의 신비마트3",
  "호수와 암실",
  "고음질 명반 가이드북 3 - 음악이 없다면 오디오파일은 없다",
  "모든 것이 양자 이론 - 세상을 이루는 17가지 기본 입자 이야기"
];

mdRecommendTitles.forEach(title => {
  fetchBookByTitle(title).then(book => {
    if (book) renderMdBook(book);
    else console.warn(`❌ [검색 실패] "${title}"`);
  });
});