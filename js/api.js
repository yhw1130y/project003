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
const CARD_WIDTH = 353.33 + 10; // 카드+마진(px)
const VISIBLE_CARDS = 3; // 한 번에 3장 보임

$('.md_next').click(function () {
  $('#md_slide').animate({ marginLeft: -CARD_WIDTH }, 500, function () {
    $('#md_slide .md_list:first').appendTo('#md_slide');    
    $('#md_slide').css('margin-left', 0);
  });
});

$('.md_prev').click(function () {
  $('#md_slide .md_list:last').prependTo('#md_slide');
  $('#md_slide').css('margin-left', -CARD_WIDTH);
  $('#md_slide').animate({ marginLeft: 0 }, 500);
});

// 이런책 불러오기
async function fetchBooks(query) {
   const params = new URLSearchParams({
      target: "title",
      query,
   });
   const url = `https://dapi.kakao.com/v3/search/book?${params}`;

   const response = await fetch(url, {
      method: 'GET',
      headers: {
         Authorization: `KakaoAK 7dc8a40298c87972a469f758f14bd142`
      }
   });

   if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
   }

   return response.json();
}


async function bookDataMd() {
   try {
      const querys = ['후지모토', '한강', '추리','바르가스','AI','티니핑', '리그오브','사계절','경제','트럼프'];

      querys.forEach(async (query, i) => {
         const data = await fetchBooks(query);

         //썸네일이 빈 문자열인것은 제외
         const origin = data.documents;
         let book = origin.filter((val) => {
            return val.thumbnail != '' && val.contents != '';
         })
    
         const divs = $('#md_slide').find('.md_list').eq(i);  
            divs.append(`
               <div class="md_list_img">
                  <img src=${data.documents[0].thumbnail}/>
                  <img src=${data.documents[1].thumbnail}/>
                  <img src=${data.documents[2].thumbnail}/>
                  <img src=${data.documents[3].thumbnail}/>
               </div>
               <div class="md_list_text">
                  <h3>${data.documents[0].title}</h3>
                  <p>${data.documents[0].authors}</p>
                  <span>${data.documents[0].contents}</span>
               </div>
                  <div class="md_list_logo">
                  <img src="./img/cardlogo.png" alt="#">
                  <span>영풍문고 온라인 MD</span>
               </div>  
          `);

      })
   } catch (error) {
      console.log('에러발생', error);
   }
}

bookDataMd();

// 좋은 평가

// 1. 카드 상단 이미지, 리뷰텍스트 배열 (12개씩 채우면 됨)
const cardBgImgs = [
  "./img/background.png", "./img/background2.png", "./img/background3.png"
];
const cardTexts = [
  "목소리로 변화하는 대화의 힘! 심리상담사가 추천하는 방법.",
  "10대도 지친다! 셀프케어가 필요한 이유.",
  "하나가 살기 위해서는 왜 다른 하나가 죽어야하는가?",
  "알수없는 우리학교 미스터리, 브이로그로 푼다!",
  "사장님 필수 회계, 돈 남기는 장사의 시작.",
  "살아있는 전설, 최고령 사교 클럽의 비밀.",
  "뭔가 자꾸 먹고 싶을 때, 이 책을 펼쳐라!",
  "주식 실패는 없다! 부자아빠의 트레이닝.",
  "몸과 마음을 회복하는 다정하고 이성적인 뇌과학 처방전.",
  "초등 영문법! 이제 외우지 말고 리딩으로 풀자.",
  "마음을 채우는 심리학, 일년, 열두 달의 슬픔과 기쁨.",
  "논술이 맛있어지는 초등 글쓰기의 모든 것!"
];

// 2. 책 제목 배열(12권)
const bookTitles = [
  "목소리의 표정 - 심리상담사의 나답게 말하기 삶을 바꾸는 대화 마인드셋",
  "10대도 피곤하다(큰글자도서) - 청소년들의 활력을 위한 셀프케어",
  "혁명가 붓다 - 붓다의 시선으로 그의 삶으로",
  "미스터리 브이로그(우리학교 소설 읽는 시간)",
  "사장님이여 회계하라 - 돈 남기는 장사의 비결",
  "웬만해선 죽을 수 없는 최고령 사교 클럽",
  "식탐 해방 - 살찌지 않는 뇌를 만드는 21일 식습관 혁명",
  "실패를 성공으로 바꾸는 주식투자의 기술 - 초보 투자자를 위한 부자아빠의 핵심 트레이닝",
  "나는 왜 아무것도 하기 싫을까 - 나도 모르게 방전된 몸과 마음을 회복하는 뇌과학 처방전",
  "바빠 초등 영문법 써먹는 리딩 2 Reading with grammar - 초등 영문법과 리딩의 연결 고리를 단단하게!",
  "이달의 심리학 - 일 년 열두 달 마음의 달력",
  "학교 선생님이 콕 집은 초등 처음 글쓰기 2 - 안상현 쌤의 맛있는 논술 레시피"
];

// 3. 카카오 도서 API fetch
async function fetchBookInfo(query) {
  const params = new URLSearchParams({
    target: "title",
    query,
    size: 1
  });
  const url = `https://dapi.kakao.com/v3/search/book?${params}`;
  const response = await fetch(url, {
    headers: { Authorization: "KakaoAK 7dc8a40298c87972a469f758f14bd142" } // 본인 REST API키로 교체
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.documents && data.documents[0] ? data.documents[0] : null;
}

// 4. 카드 12개 자동 렌더링
async function renderGoodCards() {
  $('#good_slider').empty();
  for (let i = 0; i < 12; i++) {
    let info = await fetchBookInfo(bookTitles[i]);
    let img = info && info.thumbnail ? info.thumbnail : 'https://via.placeholder.com/64x96?text=No+Image';
    let title = info && info.title ? info.title : bookTitles[i];
    let rate = 5; // 별점 임의
    let reviewCnt = Math.floor(Math.random() * 10) + 1; // 리뷰수 임의(1~10)
    $('#good_slider').append(`
      <div class="good_card">
        <div class="good_card_top">
          <img src="${cardBgImgs[i % cardBgImgs.length]}" alt="" class="good_top_bgimg">
          <div class="good_top_filter"></div>
          <div class="good_top_text">“${cardTexts[i]}”</div>
        </div>
        <div class="good_card_bottom">
          <img src="${img}" alt="">
          <div>
            <div class="good_title">${title}</div>
            <div class="good_rate">⭐ ${rate}</div>
            <div class="good_review_cnt">리뷰 ${reviewCnt}개</div>
          </div>
        </div>
      </div>
    `);
  }
  setDots();
  slideTo(0);
}
renderGoodCards();

// 5. 인디케이터(점) 자동 렌더
function setDots() {
  let pages = Math.ceil(12 / 3);
  $('.good_dots').empty();
  for (let i = 0; i < pages; i++) {
    $('.good_dots').append(`<span class="dot${i===0?' active':''}"></span>`);
  }
}

// 6. 슬라이드 기능 (3장씩 이동)
let current = 0;
$('.good_next').click(function () { slideTo(current + 1); });
$('.good_prev').click(function () { slideTo(current - 1); });
$('.good_dots').on('click', '.dot', function () {
  slideTo($(this).index());
});
function slideTo(page) {
  const max = Math.ceil(12 / 3) - 1;
  if (page < 0) page = max;
  if (page > max) page = 0;
  current = page;
  $('#good_slider').css('margin-left', -(current * 1110) + 'px');
  $('.good_dots .dot').removeClass('active').eq(current).addClass('active');
}