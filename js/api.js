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

// 베스트셀러
const weeklyTitles = [
  "채식주의자",
  "흔한남매 19",
  "모순",
  "소년이 온다",
  "차가운 자본주의",
  "어제와 똑같은 내가 싫어서 심리학을 공부하기 시작했습니다",
  "파과",
  "쇼펜하우어 인생수업(리커버 에디션) - 한 번뿐인 삶 이렇게 살아라",
  "단 한 번의 삶",
  "홍학의 자리"
];

let currentBooks = [];

async function fetchWeeklyBooks() {
  const promises = weeklyTitles.map(async (title, index) => {
    const book = await fetchBookByTitle(title);

    if (!book) {
      console.warn(`❗ "${title}" 검색 결과 없음`);
      return {
        title: "검색결과 없음",
        thumbnail: "./img/placeholder.jpg",
        tags: ["No Data"],
        rank: index + 1
      };
    }
    return {
      title: book.title,
      thumbnail: book.thumbnail || './img/placeholder.jpg',
      tags: [book.publisher, book.authors?.[0] || ''],
      rank: index + 1
    };
  });

  currentBooks = await Promise.all(promises);
  updateMainBook(currentBooks[0]);
  renderListBooks();
}

function updateMainBook(book) {
  const main = document.querySelector('.weekly_best .best_main');
  main.querySelector('img').src = book.thumbnail;
  main.querySelector('.rank').textContent = String(book.rank).padStart(2, '0');

  const tags = main.querySelector('.tags');
  tags.innerHTML = '';
  book.tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = '#' + tag;
    tags.appendChild(span);
  });
}

function renderListBooks() {
  const list = document.querySelector('.weekly_best .best_list ul');
  list.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const book = currentBooks[i % currentBooks.length];
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="book">
        <img src="${book.thumbnail}" alt="${book.title}">
        <span class="rank">${book.rank}</span>
      </div>
    `;
    list.appendChild(li);
  }
}

document.querySelector('.weekly_best .btn-next').addEventListener('click', () => {
  const first = currentBooks.shift();
  currentBooks.push(first);
  updateMainBook(currentBooks[0]);
  renderListBooks();
});

document.querySelector('.weekly_best .btn-prev').addEventListener('click', () => {
  const last = currentBooks.pop();
  currentBooks.unshift(last);
  updateMainBook(currentBooks[0]);
  renderListBooks();
});

fetchWeeklyBooks();

// 급상승 도서
const rankBookTitles = [
  "단다단 16",
  "청설",
  "오가미 츠미키와 기일상 2",
  "워런 버핏 웨이",
  "노랑무늬영원",
  "엔비디아 젠슨 황 생각하는 기계-전 세계 최초 공식 자서전",
  "나 혼자만 레벨업 14 - 한정판",
  "괴수 8호 15",
  "대도시의 사랑법",
  "니체 인생수업(리커버 에디션) - 니체가 세상에 남긴 66가지 인생지혜",
  "친구가 상처 줄 때 똑똑하게 나를 지키는 법",
  "카구라바치 5",
  "아프도록 수고한 당신에게 건강지속력",
  "사카모토 홀리데이즈 1 특별판",
  "과자 사면 과학 드립니다"
];

const rankBookList = document.querySelector(".rank_books .book_list");
const prevBtn = document.querySelector(".rank-btn-prev");
const nextBtn = document.querySelector(".rank-btn-next");

let rankBooks = [];
let currentPage = 0;
const perPage = 5;

function renderPage() {
  rankBookList.innerHTML = "";
  const start = currentPage * perPage;
  const end = start + perPage;
  const slicedBooks = rankBooks.slice(start, end);

  slicedBooks.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${book.url}" target="_blank">
        <img src="${book.thumbnail}" alt="${book.title}">
        <div class="book_info">
          <strong class="book_title">${book.title}</strong>
          <span class="book_author">${book.authors?.join(', ')}</span>
        </div>
      </a>
    `;
    rankBookList.appendChild(li);
  });
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener("click", () => {
  if ((currentPage + 1) * perPage < rankBooks.length) {
    currentPage++;
    renderPage();
  }
});

Promise.all(
  rankBookTitles.map(title => fetchBookByTitle(title))
).then(results => {
  rankBooks = results.filter(book => book);
  renderPage();
});

// 핫북
const hotBookTitles = [
  "엄마 당신의 이야기를 들려주세요(당신의 이야기를 들려주세요)",
  "아빠 당신의 이야기를 들려주세요(당신의 이야기를 들려주세요)",
  "슬픔",
  "나민애의 동시 읽기 좋은 날 - 도란도란 읽고 또박또박 따라 쓰는 감수성 동시 수업",
  "단 한 번의 삶",
  "니체 인생수업(리커버 에디션) - 니체가 세상에 남긴 66가지 인생지혜",
  "슈뻘맨 무인 편의점 히어로 1 - 수상한 편의점 등장",
  " 티니핑 댄스핑은 별이 다섯 개",
  "빛과 실-2024 노벨문학상 수상 강연문 수록",
  "채식주의자"
];

const hotBookList = document.querySelector(".hot_books .book_list");
const hotPrevBtn = document.querySelector(".hot-btn-prev");
const hotNextBtn = document.querySelector(".hot-btn-next");

let hotBooks = [];
let hotCurrentPage = 0;
const hotPerPage = 5;

function renderHotPage() {
  hotBookList.innerHTML = "";
  const start = hotCurrentPage * hotPerPage;
  const end = start + hotPerPage;
  const sliced = hotBooks.slice(start, end);

  sliced.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}">
      <div class="book_info">
        <strong class="book_title">${book.title}</strong>
        <span class="book_author">${book.authors?.join(', ')}</span>
      </div>
    `;
    hotBookList.appendChild(li);
  });
}

hotPrevBtn.addEventListener("click", () => {
  if (hotCurrentPage > 0) {
    hotCurrentPage--;
    renderHotPage();
  }
});

hotNextBtn.addEventListener("click", () => {
  const maxPage = Math.floor(hotBooks.length / hotPerPage);
  if (hotCurrentPage < maxPage) {
    hotCurrentPage++;
    renderHotPage();
  }
});

// API 호출 및 렌더링
Promise.all(hotBookTitles.map(title => fetchBookByTitle(title)))
  .then(results => {
    hotBooks = results.filter(book => book);
    renderHotPage();
  });

// 이런책 어떠세요 동작 파트

$('.md_prev').click(function () {
   $('.md_slide_list:last').prependTo('#md_slide');
   $('#md_slide').css('margin-left', "-31.4%");
   $('#md_slide').stop().animate({ marginLeft: 0 }, 800);
});

$('.md_next').click(function () {
   $('#md_slide').stop().animate({ marginLeft: "-31.4%" }, 800, function () {
      $('.md_slide_list:first').appendTo('#md_slide');
      $('#md_slide').css({ marginLeft: 0 });
   });
});

// 이런책 북 데이터

const bookQueryList = [
  '한강',             // 1
  '아기공룡둘리',      // 2
  '프란치스코 교황',   // 3
  '바르가스 요사',     // 4
  '사계절 시리즈',     // 5
  'AI',               // 6
  '트럼프'            // 7
  // 8, 9, 10 원하는대로 추가 가능
];

// 네 REST API 키로 교체!
const KAKAO_API_KEY = '7dc8a40298c87972a469f758f14bd142';

async function fetchBooks(query) {
  const params = new URLSearchParams({
    target: "title",
    query: query,
    size: 4
  });
  const realUrl = `https://dapi.kakao.com/v3/search/book?${params}`;
  // Proxy로 CORS 우회 (개발환경에서만, 서비스에서는 서버 중계 권장)
  const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(realUrl)}`;
  const response = await fetch(proxyUrl, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${KAKAO_API_KEY}`
    }
  });
  if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
  return response.json();
}

async function bookDataMdApi() {
  for (let i = 0; i < bookQueryList.length; i++) {
    const query = bookQueryList[i];
    try {
      const data = await fetchBooks(query);
      const books = data.documents.filter(b => b.thumbnail && b.title && b.authors && b.contents);
      if (books.length < 4) continue;

      // 각 리스트에 4권 썸네일
      let imgs = '';
      for (let j = 0; j < 4; j++) {
        imgs += `<img src="${books[j].thumbnail}" alt="${books[j].title}" />`;
      }

      const info = books[0]; // 대표책 정보

      $(`.md_slide_list${i+1}`).append(`
        <div class="md_list_img">
          ${imgs}
        </div>
        <div class="md_list_text">
          <h3>${info.title}</h3>
          <p>${info.authors.join(', ')}</p>
          <span>${info.contents}</span>
        </div>
        <div class="md_list_logo">
          <img src="https://cdn.ypbooks.co.kr/front_web/assets/img/temp/yp_md_default.png" alt="#">
          <span>영풍문고 온라인 MD</span>
        </div>
      `);
    } catch (error) {
      console.error(`${query} API 오류:`, error);
    }
  }
}

$(function() {
  bookDataMdApi();
});