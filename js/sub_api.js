const bookTitle = "우리의 낙원에서 만나자 - 이 계절을 함께 건너는 당신에게";

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