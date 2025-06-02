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


const books = [
  {
    img: "https://image.yes24.com/goods/131034786/XL",
    title: "우리의 계절에 슬픔은 필요 없어",
    meta: "김혜진 | 좋은북스"
  },
  {
    img: "https://image.yes24.com/goods/130744545/XL",
    title: "격이 다른 마흔의 사소한 습관",
    meta: "클로이 | 팀앤와이드"
  },
  {
    img: "https://image.yes24.com/goods/129924185/XL",
    title: "ETS 토익 정기시험 기출문제집 4 LC",
    meta: "ETS | 와이비엠"
  },
  {
    img: "https://image.yes24.com/goods/129924188/XL",
    title: "ETS 토익 정기시험 기출문제집 4 RC",
    meta: "ETS | 와이비엠"
  },
  // --- 4개 더 복사해서 8개 만들기 ---
  {
    img: "https://image.yes24.com/goods/131034786/XL",
    title: "우리의 계절에 슬픔은 필요 없어2",
    meta: "김혜진 | 좋은북스"
  },
  {
    img: "https://image.yes24.com/goods/130744545/XL",
    title: "격이 다른 마흔의 사소한 습관2",
    meta: "클로이 | 팀앤와이드"
  },
  {
    img: "https://image.yes24.com/goods/129924185/XL",
    title: "ETS 토익 정기시험 기출문제집 4 LC2",
    meta: "ETS | 와이비엠"
  },
  {
    img: "https://image.yes24.com/goods/129924188/XL",
    title: "ETS 토익 정기시험 기출문제집 4 RC2",
    meta: "ETS | 와이비엠"
  },
];

const sliderTrack = document.getElementById('sliderTrack');

// 카드 동적 생성
books.forEach(book => {
  const card = document.createElement('div');
  card.className = 'related-book-card';
  card.innerHTML = `
    <img src="${book.img}" alt="${book.title}">
    <div class="related-book-info">
      <div class="related-book-title">${book.title}</div>
      <div class="related-book-meta">${book.meta}</div>
    </div>
  `;
  sliderTrack.appendChild(card);
});

// 슬라이드 로직
let currentPage = 0;
const pageSize = 4;
const totalPages = Math.ceil(books.length / pageSize);

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentPage * 100}%)`;
}

document.getElementById('slidePrevBtn').onclick = function() {
  if (currentPage > 0) {
    currentPage--;
    updateSlider();
  }
};

document.getElementById('slideNextBtn').onclick = function() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateSlider();
  }
};

// 초기화
updateSlider();