const query = "우리의 낙원에서 만나자"; // ← 실제는 URL파라미터 등에서 동적으로!
fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(query)}&size=1`, {
  headers: { Authorization: "KakaoAK 7dc8a40298c87972a469f758f14bd142" }
})
  .then(res => res.json())
  .then(data => {
    const book = data.documents[0];
    document.getElementById("detail_cover").src = book.thumbnail || '';
    document.getElementById("detail_title").textContent = book.title || '';
    document.getElementById("detail_authors").textContent = book.authors?.join(', ') || '';
    document.getElementById("detail_publisher").textContent = book.publisher || '';
    document.getElementById("detail_pubdate").textContent = book.datetime?.slice(0, 10) || '';
    document.getElementById("detail_price").textContent = book.price ? book.price.toLocaleString() + '원' : '';
    document.getElementById("detail_saleprice").textContent = book.sale_price ? book.sale_price.toLocaleString() + '원' : '';
    document.getElementById("detail_discount").textContent = book.price && book.sale_price ? (Math.round((1 - book.sale_price / book.price) * 100)) + "% 할인" : "";
    document.getElementById("detail_point").textContent = book.sale_price ? Math.floor(book.sale_price * 0.05) : "0";
    document.getElementById("detail_sum").textContent = book.sale_price ? book.sale_price.toLocaleString() : "0";
  });

// --- 수량 증가/감소 및 합계 업데이트 ---
let qty = 1;
document.getElementById("qty_minus").onclick = function() {
  if(qty > 1) qty--;
  document.getElementById("detail_qty").value = qty;
  updateSum();
}
document.getElementById("qty_plus").onclick = function() {
  qty++;
  document.getElementById("detail_qty").value = qty;
  updateSum();
}
function updateSum() {
  const unit = +document.getElementById("detail_saleprice").textContent.replace(/[^0-9]/g,"");
  document.getElementById("detail_sum").textContent = (unit * qty).toLocaleString();
}