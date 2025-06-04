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

const bookTitles = [
  "치유의 빛", "고래눈이 내리다", "내게 남은 스물다섯 번의 계절", "나태주의 풀꽃 인생수업",
  "내 꿈에 가끔만 놀러와", "파과", "어른의 관계에는 마침표가 없다", "첫 여름 완주"
];
const PAGE_SIZE = 4;
let page = 0;

const sliderTrack = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.slider-dots .dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

const KAKAO_API_KEY = '7dc8a40298c87972a469f758f14bd142'; // 본인 키로 바꿔!

async function fetchBookInfo(title) {
  const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(title)}&size=1`;
  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` }
  });
  const data = await res.json();
  if (data.documents && data.documents.length) {
    const book = data.documents[0];
    return {
      title: book.title,
      thumbnail: book.thumbnail || 'https://via.placeholder.com/140x196?text=No+Image',
      authors: book.authors.join(", "),
      publisher: book.publisher
    }
  } else {
    // fallback
    return {
      title, thumbnail: 'https://via.placeholder.com/140x196?text=No+Image', authors: '', publisher: ''
    }
  }
}

async function loadBooks() {
  const books = [];
  for (const title of bookTitles) {
    books.push(await fetchBookInfo(title));
  }
  return books;
}

function renderSlider(books, page) {
  sliderTrack.innerHTML = '';
  for (let i = 0; i < PAGE_SIZE; i++) {
    const idx = page * PAGE_SIZE + i;
    if (books[idx]) {
      sliderTrack.innerHTML += `
        <div class="related-book-card">
          <img src="${books[idx].thumbnail}" alt="${books[idx].title}">
          <div class="related-book-title">${books[idx].title}</div>
          <div class="related-book-meta">${books[idx].authors} | ${books[idx].publisher}</div>
        </div>
      `;
    }
  }
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === page));
}

loadBooks().then(books => {
  renderSlider(books, page);

  prevBtn.onclick = () => {
    if (page > 0) {
      page--;
      renderSlider(books, page);
    }
  };
  nextBtn.onclick = () => {
    if (page < Math.ceil(books.length / PAGE_SIZE) - 1) {
      page++;
      renderSlider(books, page);
    }
  };
  dots.forEach((dot, idx) => {
    dot.onclick = () => {
      page = idx;
      renderSlider(books, page);
    }
  });
});