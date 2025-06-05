// 서브 메인 책
const bookTitle = "우리의 낙원에서 만나자";

async function fetchBookInfo(title) {
  const res = await fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(title)}`, {
    headers: { Authorization: "KakaoAK 7dc8a40298c87972a469f758f14bd142" }
  });
  const data = await res.json();
  return data.documents[0];
}

async function renderDetail() {
  const data = await fetchBookInfo(bookTitle);
  // 표지
  document.querySelector('.book_thumb_img').src = data.thumbnail;
  // 제목/저자/출판사/날짜
  document.querySelector('.detail_title').textContent = data.title;
  document.querySelector('.author').textContent = data.authors.join(', ');
  document.querySelector('.publisher').textContent = data.publisher;
  document.querySelector('.date').textContent = data.datetime.substring(0,10);
  // 가격/할인/원가(임의값!)
  document.querySelector('.price').textContent = data.sale_price.toLocaleString() + '원';
  document.querySelector('.origin_price').textContent = data.price.toLocaleString() + '원';
  document.querySelector('.discount').textContent = '10% 할인';
  document.querySelector('.point').textContent = '적립금';
  document.querySelector('.point_txt').textContent = Math.floor(data.sale_price * 0.05).toLocaleString() + '원 (5%)';
  document.querySelector('.pay_method').textContent = '무이자 할부';
  document.querySelector('.extra').textContent = '결제 혜택';
  document.querySelector('.coupon').textContent = '쿠폰';
  document.querySelector('.total_price').textContent = data.sale_price.toLocaleString() + '원';
}
renderDetail();

const bookData = {
  img: "https://image.yes24.com/goods/131303097/XL",
  title: "우리의 낙원에서 만나자 - 이 계절을 함께 건너는 당신에게",
  author: "하태완",
  publisher: "북로망스",
  price: 17550
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('bookImg').src = bookData.img;
  document.getElementById('bookTitle').textContent = bookData.title;
  document.getElementById('bookAuthor').textContent = `${bookData.author} 저 | ${bookData.publisher}`;
  document.getElementById('bookPrice').textContent = bookData.price.toLocaleString();
});



// 이분야 뜨는책
// ==== 슬라이드1: 이 분야에서 요즘 뜨는 책 ====
const bookTitles1 = [
  "치유의 빛", "고래눈이 내리다", "내게 남은 스물다섯 번의 계절", "나태주의 풀꽃 인생수업",
  "내 꿈에 가끔만 놀러와", "파과", "어른의 관계에는 마침표가 없다", "첫 여름 완주"
];
const PAGE_SIZE1 = 4;
let page1 = 0;
const KAKAO_API_KEY = '7dc8a40298c87972a469f758f14bd142';

function fetchBooks1(cb) {
  let books = [];
  let done = 0;
  bookTitles1.forEach((title, i) => {
    fetch(`https://dapi.kakao.com/v3/search/book?target=title&size=1&query=${encodeURIComponent(title)}`, {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` }
    }).then(r => r.json()).then(data => {
      if (data.documents && data.documents.length > 0) {
        books[i] = data.documents[0];
      } else {
        books[i] = null;
      }
      done++;
      if (done === bookTitles1.length) cb(books.filter(b => b));
    });
  });
}

function renderSlider1(books, page) {
  const track = document.getElementById('sliderTrack1');
  track.innerHTML = '';
  books.forEach(book => {
    track.innerHTML += `
      <div class="related-book-card1">
        <img src="${book.thumbnail || ''}" alt="">
        <div class="related-book-title1">${book.title}</div>
        <div class="related-book-meta1">${book.authors.join(', ')} | ${book.publisher}</div>
      </div>
    `;
  });
  // ★ 중요: 트랙 width 동적으로!
  track.style.width = (156 * books.length + 18 * (books.length - 1)) + 'px';
  track.style.transform = `translateX(-${page * 720}px)`;
  document.querySelectorAll('.slider-dots1 .dot1').forEach((dot, i) => {
    dot.classList.toggle('active1', i === page);
  });
}

fetchBooks1(books => {
  renderSlider1(books, page1);

  document.querySelector('.slider-btn1.prev1').onclick = function() {
    if (page1 > 0) { page1--; renderSlider1(books, page1); }
  };
  document.querySelector('.slider-btn1.next1').onclick = function() {
    if (page1 < Math.ceil(books.length / PAGE_SIZE1) - 1) { page1++; renderSlider1(books, page1); }
  };
  document.querySelectorAll('.slider-dots1 .dot1').forEach((dot, idx) => {
    dot.onclick = () => { page1 = idx; renderSlider1(books, page1); }
  });
});

// ==== 슬라이드2: 소설/에세이/시 분야 베스트 ====
const bookTitles2 = [
  "모순", "급류", "소년이 온다", "단 한 번의 삶",
  "홍학의 자리", "파과", "채식주의자", "어른의 행복은 조용하다"
];
const PAGE_SIZE2 = 4;
let page2 = 0;

function fetchBooks2(cb) {
  let books = [];
  let done = 0;
  bookTitles2.forEach((title, i) => {
    fetch(`https://dapi.kakao.com/v3/search/book?target=title&size=1&query=${encodeURIComponent(title)}`, {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` }
    }).then(r => r.json()).then(data => {
      if (data.documents && data.documents.length > 0) {
        books[i] = data.documents[0];
      } else {
        books[i] = null;
      }
      done++;
      if (done === bookTitles2.length) cb(books.filter(b => b));
    });
  });
}

function renderSlider2(books, page) {
  const track = document.getElementById('sliderTrack2');
  track.innerHTML = '';
  books.forEach(book => {
    track.innerHTML += `
      <div class="related-book-card2">
        <img src="${book.thumbnail || ''}" alt="">
        <div class="related-book-title2">${book.title}</div>
        <div class="related-book-meta2">${book.authors.join(', ')} | ${book.publisher}</div>
      </div>
    `;
  });
  // ★ 중요: 트랙 width 동적으로!
  track.style.width = (156 * books.length + 18 * (books.length - 1)) + 'px';
  track.style.transform = `translateX(-${page * 720}px)`;
  document.querySelectorAll('.slider-dots2 .dot2').forEach((dot, i) => {
    dot.classList.toggle('active2', i === page);
  });
}

fetchBooks2(books => {
  renderSlider2(books, page2);

  document.querySelector('.slider-btn2.prev2').onclick = function() {
    if (page2 > 0) { page2--; renderSlider2(books, page2); }
  };
  document.querySelector('.slider-btn2.next2').onclick = function() {
    if (page2 < Math.ceil(books.length / PAGE_SIZE2) - 1) { page2++; renderSlider2(books, page2); }
  };
  document.querySelectorAll('.slider-dots2 .dot2').forEach((dot, idx) => {
    dot.onclick = () => { page2 = idx; renderSlider2(books, page2); }
  });
});