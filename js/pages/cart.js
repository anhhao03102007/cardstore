layout('cart.html')
let coupon = null, done = false
const COUPONS = { LUFFY10: 0.1, NAKAMA5: 0.05 }
const SHIP = 30000
function totals() {
  const items = Cart.get().map((x) => ({ ...x, c: byId(x.id) }))
  const sub = items.reduce((s, x) => s + x.c.price * COND[x.cond][1] * x.qty, 0)
  const disc = coupon ? sub * COUPONS[coupon] : 0
  const ship = sub - disc >= 1000000 || !items.length ? 0 : SHIP
  return { items, sub, disc, ship, total: sub - disc + ship }
}
function draw() {
  const m = $('#main')
  if (done) return (m.innerHTML = `<div class="done"><div class="tick">✓</div><p class="eyebrow">HOÀN TẤT BẢN DEMO</p><h1>Đã mô phỏng đặt hàng</h1><p style="color:var(--muted);margin:10px 0 24px">Mã demo #${done.id}. Đây chỉ là bản xem thử: đơn chưa được gửi đến cửa hàng và không có khoản thanh toán nào được thực hiện.</p><a class="btn btn-primary" href="set.html">Tiếp tục mua sắm</a></div>`)
  const t = totals()
  if (!t.items.length) return (m.innerHTML = `<div class="page-head"><h1>Giỏ hàng</h1></div><p class="empty">Giỏ hàng đang trống.<br><br><a class="btn btn-primary" href="catalog.html">Khám phá thẻ bài</a></p>`)
  m.innerHTML = `<div class="page-head"><p class="eyebrow">THANH TOÁN</p><h1>Giỏ hàng</h1><div class="steps"><span class="on">1. Giỏ hàng</span><span>→</span><span class="on">2. Thông tin</span><span>→</span><span>3. Hoàn tất</span></div></div>
  <div class="cart-grid">
    <div><div class="panel">${t.items.map((x, i) => `<div class="line"><div class="thumb ${x.c.color}"></div>
      <div><b>${x.c.name}</b><br><small>${x.c.code} · ${x.cond} · ${fmt(x.c.price * COND[x.cond][1])}</small><br><button class="rm" data-rm="${i}">Xóa</button></div>
      <div style="text-align:right"><div class="qty"><button data-m="${i}" data-d="-1">−</button><span>${x.qty}</span><button data-m="${i}" data-d="1">+</button></div><br><b>${fmt(x.c.price * COND[x.cond][1] * x.qty)}</b></div></div>`).join('')}</div>
    <form class="panel form" id="checkout" style="margin-top:20px"><h3 style="font:800 18px Manrope">Thông tin đơn hàng demo</h3><p class="hint">Không cần tạo tài khoản. Thông tin chỉ dùng để trình diễn luồng thanh toán; không được gửi đi.</p>
      <div class="two"><input required placeholder="Họ và tên" /><input required type="tel" pattern="[0-9]{9,11}" placeholder="Số điện thoại" /></div>
      <input required type="email" placeholder="Email" /><input required placeholder="Địa chỉ" />
      <div class="two"><input required placeholder="Quận / Huyện" /><input required placeholder="Tỉnh / Thành phố" /></div>
      <h3 style="font:800 18px Manrope;margin-top:8px">Phương thức thanh toán mô phỏng</h3>
      <div class="pay"><label><input type="radio" name="p" value="cod" checked /> Thanh toán khi nhận hàng (demo)</label><label><input type="radio" name="p" value="transfer" /> Chuyển khoản (demo, không thực hiện)</label><label><input type="radio" name="p" value="wallet" /> Ví điện tử (demo, không thực hiện)</label></div>
      <button class="btn btn-primary" style="height:50px;margin-top:8px">Mô phỏng đặt hàng · ${fmt(t.total)}</button></form></div>
    <aside class="panel sum"><h3 style="font:800 18px Manrope">Tóm tắt đơn hàng</h3>
      <div class="coupon"><input id="cp" placeholder="Mã giảm giá (LUFFY10)" value="${coupon || ''}" /><button class="btn btn-primary" id="applyCp" type="button">Áp dụng</button></div>
      <div class="r"><span>Tạm tính</span><span>${fmt(t.sub)}</span></div>
      ${t.disc ? `<div class="r"><span>Giảm giá (${coupon})</span><span class="up">−${fmt(t.disc)}</span></div>` : ''}
      <div class="r"><span>Vận chuyển</span><span>${t.ship ? fmt(t.ship) : 'Miễn phí'}</span></div>
      <div class="r t"><span>Tổng cộng</span><span>${fmt(t.total)}</span></div>
      <p class="hint">${t.sub - t.disc < 1000000 ? `Mua thêm ${fmt(1000000 - (t.sub - t.disc))} để được miễn phí vận chuyển.` : '✔ Đủ điều kiện miễn phí vận chuyển.'}</p></aside></div><div style="height:40px"></div>`
}
document.addEventListener('click', (e) => {
  const rm = e.target.closest('[data-rm]'), mm = e.target.closest('[data-m]')
  if (rm) { const c = Cart.get(); c.splice(+rm.dataset.rm, 1); Cart.set(c); draw() }
  else if (mm) { const c = Cart.get(), it = c[+mm.dataset.m]; it.qty += +mm.dataset.d; if (it.qty < 1) c.splice(+mm.dataset.m, 1); it.qty = Math.min(it.qty, byId(it.id).stock); Cart.set(c); draw() }
  else if (e.target.id === 'applyCp') { const v = $('#cp').value.trim().toUpperCase(); if (COUPONS[v]) { coupon = v; toast('Đã áp dụng mã ' + v) } else { coupon = null; toast('Mã không hợp lệ') } draw() }
})
document.addEventListener('submit', (e) => {
  if (e.target.id !== 'checkout') return
  e.preventDefault()
  const order = {
    id: `DEMO${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    total: totals().total,
    items: Cart.get().map(({ id, qty }) => ({ id, qty })),
    payment: new FormData(e.target).get('p'),
    status: 'demo',
  }
  const orders = JSON.parse(localStorage.getItem('demoOrders') || '[]')
  orders.push(order)
  localStorage.setItem('demoOrders', JSON.stringify(orders))
  localStorage.removeItem('cart')
  Cart.badge()
  done = order
  draw()
  scrollTo(0, 0)
})
draw()
