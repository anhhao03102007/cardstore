layout('catalog.html')
const c = byId(new URLSearchParams(location.search).get('id')) || CARDS[0]
document.title = c.name + ' ' + c.code + ' - Grand Line Card Vault'
let cond = 'NM', qty = 1
const tabsData = {
  info: () => `<div class="stats"><div><small>COST</small><b>${c.cost}</b></div><div><small>POWER</small><b>${c.power || '-'}</b></div><div><small>COUNTER</small><b>${c.counter || '-'}</b></div><div><small>MÀU</small><b>${COLOR_VI[c.color]}</b></div><div><small>ATTRIBUTE</small><b>${c.attr}</b></div><div><small>LOẠI</small><b>${c.type}</b></div></div><p><b style="color:var(--ink)">Hiệu ứng:</b> ${c.effect}</p>`,
  price: () => `<div class="panel"><div class="chart-head"><div><small>30 ngày gần nhất</small><b id="pp"></b></div><div class="right"><small id="pc"></small></div></div><svg id="chart" viewBox="0 0 500 200" preserveAspectRatio="none"></svg><p class="hint">Giá tham khảo từ dữ liệu giao dịch, không phải cam kết đầu tư.</p></div>`,
  cond: () => `<div class="cond-grid"><div><b>NM - Near Mint</b>Gần như mới, không trầy xước rõ.</div><div><b>LP - Lightly Played</b>Có vết mòn nhẹ ở viền/góc.</div><div><b>MP - Moderately Played</b>Mòn rõ, vẫn dùng tốt trong sleeve.</div></div><p>Mọi thẻ giá trị cao đều có ảnh chụp thực tế theo yêu cầu.</p>`,
  ship: () => `<p>Giao nội thành 1–2 ngày, toàn quốc 2–4 ngày. Thẻ đóng gói sleeve + top loader + hộp cứng. Miễn phí vận chuyển từ 1.000.000đ. Đổi trả trong 7 ngày nếu sai mô tả.</p>`,
}
function draw() {
  const p = c.price * COND[cond][1]
  $('#main').innerHTML = `
  <p class="crumbs"><a href="../index.html">Trang chủ</a> / <a href="catalog.html">Single Cards</a> / ${c.code}</p>
  <div class="pd">
    <div><div class="art ${cardArtPath(c) ? "has-art" : ""} ${c.color}" data-flip>${cardArtPath(c) ? `<img class="card-illustration" src="${cardArtPath(c)}" alt="Ảnh thẻ tham khảo OP TCG">` : '<div class="orb"></div><div class="fig"></div>'}<span class="rarity">${c.rarity}</span><span class="card-cost">${c.cost} <small>COST</small></span><b class="cname">${c.name}</b><div class="card-stats"><span>${c.attr}</span><b>${c.power.toLocaleString("vi-VN")} <small>POWER</small></b></div><div class="back">ONE PIECE</div></div>
      <div class="pd-actions"><button class="btn" data-flip-btn>Mặt trước / sau</button></div></div>
    <div>
      <div class="tagrow"><span class="${['SEC', 'PARALLEL', 'MANGA'].includes(c.rarity) ? 'gold' : ''}">${c.rarity}</span><span>${c.set}</span><span>${COLOR_VI[c.color]}</span><span>${c.type}</span></div>
      <h1>${c.name}</h1><p style="color:var(--muted)">${c.code} · Japanese</p>
      <div class="price">${fmt(p)}${c.old ? `<del>${fmt(c.old * COND[cond][1])}</del>` : ''}</div>
      <small class="up">+8,2% trong 30 ngày</small>
      <div class="field"><label>TÌNH TRẠNG</label><div class="opts" id="conds" style="display:flex;gap:8px;flex-wrap:wrap">${Object.entries(COND).map(([k, v]) => `<button class="chip ${k === cond ? 'on' : ''}" data-c="${k}">${v[0]}</button>`).join('')}</div></div>
      <div class="field"><label>SỐ LƯỢNG · ${c.stock ? 'CÒN ' + c.stock : 'HẾT HÀNG'}</label><div class="qty"><button data-q="-1">−</button><span>${qty}</span><button data-q="1">+</button></div></div>
      <div class="buy-row"><button class="btn btn-primary" id="addBtn" ${c.stock ? '' : 'disabled'}>🛍 Thêm vào giỏ</button><button class="btn btn-outline" id="buyNow" ${c.stock ? '' : 'disabled'}>Mua ngay</button><button class="btn btn-outline" id="wish">${Wish.has(c.id) ? '♥ Đang theo dõi' : '♡ Theo dõi giá'}</button></div>
      <p class="hint">✔ Chính hãng 100% · ✔ Đóng gói top loader · ✔ Đổi trả 7 ngày</p>
    </div>
  </div>
  <div class="tabs" id="tabs"><button class="on" data-t="info">Thông tin thẻ</button><button data-t="price">Biểu đồ giá</button><button data-t="cond">Tình trạng</button><button data-t="ship">Vận chuyển</button></div>
  <div class="tab-body" id="tabBody"></div>
  <div class="heading" style="margin-top:30px"><div><p class="eyebrow">CÓ THỂ BẠN CẦN</p><h2>Thẻ liên quan</h2></div></div>
  <div class="grid cards">${CARDS.filter((x) => x.id !== c.id && (x.color === c.color || x.set === c.set)).slice(0, 4).map(cardHTML).join('')}</div><div style="height:30px"></div>`
  tab('info')
}
function tab(t) {
  $$('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === t))
  $('#tabBody').innerHTML = tabsData[t]()
  if (t === 'price') { const r = drawChart($('#chart'), priceSeries(c, 30)); $('#pp').textContent = fmt(c.price); $('#pc').textContent = `Thấp ${fmt(r.min)} · Cao ${fmt(r.max)} · TB ${fmt(r.avg)}` }
}
document.addEventListener('click', (e) => {
  const k = e.target.closest('[data-c]'), q = e.target.closest('[data-q]'), t = e.target.closest('[data-t]')
  if (k) { cond = k.dataset.c; draw() }
  else if (q) { qty = Math.max(1, Math.min(c.stock || 1, qty + +q.dataset.q)); draw() }
  else if (t) tab(t.dataset.t)
  else if (e.target.closest('[data-flip-btn]')) $('.pd .art').classList.toggle('flip')
  else if (e.target.id === 'addBtn') Cart.add(c.id, cond, qty)
  else if (e.target.id === 'buyNow') { Cart.add(c.id, cond, qty); location.href = 'cart.html' }
  else if (e.target.id === 'wish') { Wish.toggle(c.id); toast('Đã cập nhật danh sách theo dõi'); draw() }
})
draw()
