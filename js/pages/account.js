layout('account.html')
const ORDERS = [['#OP240512', '12/05/2026', 'Monkey D. Luffy (OP09-119)', 2450000, 'ok', 'Đã giao'], ['#OP240518', '18/05/2026', 'Roronoa Zoro (OP06-118) ×2', 3700000, 'ship', 'Đang giao'], ['#OP240521', '21/05/2026', 'Sabo (OP04-083)', 120000, 'wait', 'Chờ xác nhận']]
const views = {
  orders: () => `<div class="profile"><div class="avatar">⚓</div><div><b>Nguyễn Văn A</b><br><small style="color:var(--muted)">nguyenvana@email.com · Thành viên Vàng</small></div></div>
    <div class="panel"><table><thead><tr><th>MÃ ĐƠN</th><th>NGÀY</th><th>SẢN PHẨM</th><th>TỔNG</th><th>TRẠNG THÁI</th></tr></thead><tbody>${ORDERS.map((o) => `<tr><td><b>${o[0]}</b></td><td>${o[1]}</td><td>${o[2]}</td><td>${fmt(o[3])}</td><td><span class="st ${o[4]}">${o[5]}</span></td></tr>`).join('')}</tbody></table></div>`,
  wishlist: () => { const l = Wish.get().map(byId).filter(Boolean); return l.length ? `<div class="grid cards" style="grid-template-columns:repeat(3,1fr)">${l.map(cardHTML).join('')}</div>` : `<p class="empty">Bạn chưa theo dõi thẻ nào.<br><br><a class="btn btn-primary" href="catalog.html">Khám phá thẻ</a></p>` },
  address: () => `<div class="addr"><div class="panel"><b>Nhà riêng</b> <span class="st ok">Mặc định</span><br>Nguyễn Văn A · 0901 234 567<br>12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</div><div class="panel"><b>Văn phòng</b><br>Nguyễn Văn A · 0901 234 567<br>88 Lê Lợi, Quận 3, TP. Hồ Chí Minh</div></div><br><button class="btn btn-primary">+ Thêm địa chỉ</button>`,
  profile: () => `<form class="panel form" id="pf" style="max-width:520px"><input value="Nguyễn Văn A" /><input type="email" value="nguyenvana@email.com" /><input type="tel" value="0901234567" /><button class="btn btn-primary">Lưu thay đổi</button></form>`,
}
function show(t) { $$('#menu button').forEach((b) => b.classList.toggle('on', b.dataset.t === t)); $('#body').innerHTML = views[t](); location.hash = t }
$('#menu').onclick = (e) => { const b = e.target.closest('[data-t]'); if (b) show(b.dataset.t) }
document.addEventListener('submit', (e) => { e.preventDefault(); toast('Đã lưu thay đổi') })
document.addEventListener('wishchange', () => show('wishlist'))
show(views[location.hash.slice(1)] ? location.hash.slice(1) : 'orders')
