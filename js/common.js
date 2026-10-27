// Dữ liệu + layout + giỏ hàng dùng chung cho các trang con
const fmt = (n) => Math.round(n).toLocaleString("vi-VN") + "đ"
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const cardArtPath = (card) => {
  const images = {
    "OP09-119": "op09-119-luffy.png",
    "OP02-013": "op02-013-ace.png",
  }
  const image = images[card.code]
  if (!image) return ""
  const root = location.pathname.toLowerCase().includes("/pages/")
    ? "../assets/card-art/one-piece/"
    : "assets/card-art/one-piece/"
  return root + image
}
const CARDS = [
  {
    id: 1,
    code: "OP09-119",
    name: "Monkey D. Luffy",
    set: "OP-09",
    type: "Character",
    rarity: "SEC",
    color: "red",
    cost: 5,
    power: 7000,
    counter: 0,
    attr: "Strike",
    price: 2450000,
    old: 2890000,
    stock: 2,
    effect:
      "[On Play] Rút 2 lá bài, sau đó bỏ 1 lá. Cho 1 Character của đối thủ -4000 power.",
  },
  {
    id: 2,
    code: "OP05-119",
    name: "Monkey D. Luffy",
    set: "OP-05",
    type: "Character",
    rarity: "MANGA",
    color: "yellow",
    cost: 7,
    power: 9000,
    counter: 0,
    attr: "Strike",
    price: 8990000,
    old: 0,
    stock: 1,
    effect:
      "[Blocker] [On K.O.] Đưa 1 Character cost 4 trở xuống từ tay ra sân.",
  },
  {
    id: 3,
    code: "OP06-118",
    name: "Roronoa Zoro",
    set: "OP-06",
    type: "Character",
    rarity: "SEC",
    color: "green",
    cost: 5,
    power: 7000,
    counter: 0,
    attr: "Slash",
    price: 1850000,
    old: 2100000,
    stock: 3,
    effect: "[Rush] [Your Turn] Nhận +1000 power cho mỗi 2 lá Don!! đang gắn.",
  },
  {
    id: 4,
    code: "OP01-120",
    name: "Shanks",
    set: "OP-01",
    type: "Character",
    rarity: "PARALLEL",
    color: "blue",
    cost: 9,
    power: 10000,
    counter: 0,
    attr: "Slash",
    price: 4200000,
    old: 0,
    stock: 1,
    effect: "[On Play] K.O. tất cả Character cost 5 trở xuống của đối thủ.",
  },
  {
    id: 5,
    code: "OP03-122",
    name: "Charlotte Katakuri",
    set: "OP-03",
    type: "Leader",
    rarity: "SR",
    color: "purple",
    cost: 4,
    power: 5000,
    counter: 1000,
    attr: "Special",
    price: 650000,
    old: 0,
    stock: 6,
    effect: "[Activate: Main] Một lần mỗi lượt: Nhận 1 Don!! đang nghỉ.",
  },
  {
    id: 6,
    code: "OP02-013",
    name: "Portgas D. Ace",
    set: "OP-02",
    type: "Character",
    rarity: "SR",
    color: "red",
    cost: 5,
    power: 6000,
    counter: 0,
    attr: "Special",
    price: 980000,
    old: 1100000,
    stock: 4,
    effect: "[On Play] Cho 1 Character của đối thủ -3000 power trong lượt này.",
  },
  {
    id: 7,
    code: "OP04-083",
    name: "Sabo",
    set: "OP-04",
    type: "Character",
    rarity: "R",
    color: "black",
    cost: 3,
    power: 4000,
    counter: 1000,
    attr: "Strike",
    price: 120000,
    old: 0,
    stock: 12,
    effect: "[Blocker] [Trigger] Đưa lá này ra sân.",
  },
  {
    id: 8,
    code: "OP08-057",
    name: "Trafalgar Law",
    set: "OP-08",
    type: "Character",
    rarity: "SR",
    color: "blue",
    cost: 4,
    power: 5000,
    counter: 0,
    attr: "Slash",
    price: 540000,
    old: 0,
    stock: 0,
    effect: "[On Play] Đưa 1 Character cost 3 trở xuống về tay chủ.",
  },
  {
    id: 9,
    code: "OP07-051",
    name: "Boa Hancock",
    set: "OP-07",
    type: "Character",
    rarity: "SEC",
    color: "purple",
    cost: 6,
    power: 7000,
    counter: 0,
    attr: "Special",
    price: 3100000,
    old: 0,
    stock: 2,
    effect:
      "[On Play] Rút 1 lá. Character cost 4 trở xuống của đối thủ không thể tấn công.",
  },
  {
    id: 10,
    code: "OP09-093",
    name: "Marshall D. Teach",
    set: "OP-09",
    type: "Character",
    rarity: "SEC",
    color: "black",
    cost: 10,
    power: 12000,
    counter: 0,
    attr: "Special",
    price: 2200000,
    old: 0,
    stock: 3,
    effect:
      "[Double Attack] [On Play] Bỏ 2 lá trong tay: K.O. 1 Character cost 6 trở xuống.",
  },
  {
    id: 11,
    code: "OP05-060",
    name: "Nami",
    set: "OP-05",
    type: "Event",
    rarity: "R",
    color: "yellow",
    cost: 2,
    power: 0,
    counter: 2000,
    attr: "-",
    price: 90000,
    old: 0,
    stock: 20,
    effect: "[Counter] +2000 power cho 1 Leader hoặc Character trong trận này.",
  },
  {
    id: 12,
    code: "OP06-022",
    name: "Vinsmoke Sanji",
    set: "OP-06",
    type: "Character",
    rarity: "SR",
    color: "green",
    cost: 4,
    power: 5000,
    counter: 1000,
    attr: "Strike",
    price: 430000,
    old: 0,
    stock: 5,
    effect:
      "[Activate: Main] Nghỉ lá này: Đưa 1 Character cost 3 trở xuống ra sân.",
  },
]
const COND = {
  NM: ["Near Mint", 1],
  LP: ["Lightly Played", 0.85],
  MP: ["Moderately Played", 0.7],
}
const COLOR_VI = {
  red: "Đỏ",
  blue: "Xanh",
  green: "Lục",
  purple: "Tím",
  black: "Đen",
  yellow: "Vàng",
}
const PRODUCTS = [
  {
    id: 101,
    cat: "booster",
    sub: "Box",
    code: "OP-09",
    name: "Booster Box OP-09 The Four Emperors",
    color: "red",
    price: 1890000,
    old: 2100000,
    stock: 8,
    note: "24 pack / box",
  },
  {
    id: 102,
    cat: "booster",
    sub: "Pack",
    code: "OP-09",
    name: "Booster Pack OP-09",
    color: "red",
    price: 85000,
    old: 0,
    stock: 120,
    note: "6 lá / pack",
  },
  {
    id: 103,
    cat: "booster",
    sub: "Box",
    code: "OP-08",
    name: "Booster Box OP-08 Two Legends",
    color: "blue",
    price: 1750000,
    old: 0,
    stock: 5,
    note: "24 pack / box",
  },
  {
    id: 104,
    cat: "booster",
    sub: "Box",
    code: "EB-01",
    name: "Extra Booster EB-01 Memorial Collection",
    color: "yellow",
    price: 1650000,
    old: 1800000,
    stock: 3,
    note: "24 pack / box",
  },
  {
    id: 105,
    cat: "booster",
    sub: "Pack",
    code: "OP-08",
    name: "Booster Pack OP-08",
    color: "blue",
    price: 80000,
    old: 0,
    stock: 90,
    note: "6 lá / pack",
  },
  {
    id: 106,
    cat: "booster",
    sub: "Box",
    code: "OP-10",
    name: "Booster Box OP-10 Royal Bloodlines (Đặt trước)",
    color: "purple",
    price: 1950000,
    old: 0,
    stock: 20,
    note: "Phát hành dự kiến tháng 8",
  },
  {
    id: 111,
    cat: "starter",
    sub: "Deck",
    code: "ST-21",
    name: "Starter Deck ST-21 Gear 5",
    color: "red",
    price: 260000,
    old: 0,
    stock: 30,
    note: "50 lá · Leader Luffy",
  },
  {
    id: 112,
    cat: "starter",
    sub: "Deck",
    code: "ST-20",
    name: "Starter Deck ST-20 Yellow Charlotte Katakuri",
    color: "yellow",
    price: 260000,
    old: 290000,
    stock: 14,
    note: "50 lá · Leader Katakuri",
  },
  {
    id: 113,
    cat: "starter",
    sub: "Deck",
    code: "ST-15",
    name: "Starter Deck ST-15 Red Edward Newgate",
    color: "red",
    price: 250000,
    old: 0,
    stock: 18,
    note: "50 lá · Leader Whitebeard",
  },
  {
    id: 114,
    cat: "starter",
    sub: "Deck",
    code: "ST-17",
    name: "Starter Deck ST-17 Blue Donquixote Doflamingo",
    color: "blue",
    price: 250000,
    old: 0,
    stock: 0,
    note: "50 lá · Leader Doflamingo",
  },
  {
    id: 121,
    cat: "accessory",
    sub: "Sleeves",
    code: "SL-70",
    name: "Sleeves Luffy Gear 5 (70 cái)",
    color: "red",
    price: 95000,
    old: 0,
    stock: 60,
    note: "Size chuẩn 63×88mm",
  },
  {
    id: 122,
    cat: "accessory",
    sub: "Sleeves",
    code: "SL-100",
    name: "Sleeves Matte Trong suốt (100 cái)",
    color: "black",
    price: 70000,
    old: 85000,
    stock: 200,
    note: "Chống lóa",
  },
  {
    id: 123,
    cat: "accessory",
    sub: "Binder",
    code: "BD-9",
    name: "Binder 9 ô Straw Hat Crew",
    color: "yellow",
    price: 420000,
    old: 0,
    stock: 12,
    note: "Chứa 360 lá",
  },
  {
    id: 124,
    cat: "accessory",
    sub: "Binder",
    code: "BD-4",
    name: "Binder 4 ô Mini Going Merry",
    color: "green",
    price: 280000,
    old: 0,
    stock: 9,
    note: "Chứa 160 lá",
  },
  {
    id: 125,
    cat: "accessory",
    sub: "Playmat",
    code: "PM-01",
    name: "Playmat Four Emperors",
    color: "purple",
    price: 390000,
    old: 450000,
    stock: 15,
    note: "60×35cm · Cao su chống trượt",
  },
  {
    id: 126,
    cat: "accessory",
    sub: "Playmat",
    code: "PM-02",
    name: "Playmat Wano Country",
    color: "blue",
    price: 390000,
    old: 0,
    stock: 7,
    note: "60×35cm · Cao su chống trượt",
  },
]
const byId = (id) =>
  CARDS.find((c) => c.id == id) || PRODUCTS.find((c) => c.id == id)

// Giỏ hàng (localStorage)
const Cart = {
  get: () => JSON.parse(localStorage.getItem("cart") || "[]"),
  set(v) {
    localStorage.setItem("cart", JSON.stringify(v))
    Cart.badge()
  },
  add(id, cond = "NM", qty = 1) {
    const c = Cart.get(),
      it = c.find((x) => x.id == id && x.cond === cond)
    const max = byId(id).stock
    if (it) it.qty = Math.min(max, it.qty + qty)
    else c.push({ id: +id, cond, qty: Math.min(max, qty) })
    Cart.set(c)
    toast("Đã thêm " + byId(id).name + " vào giỏ")
  },
  count: () => Cart.get().reduce((s, x) => s + x.qty, 0),
  badge() {
    const b = $("#cartCount")
    if (b) b.textContent = Cart.count()
  },
}
const Wish = {
  get: () => JSON.parse(localStorage.getItem("wish") || "[]"),
  toggle(id) {
    let w = Wish.get()
    w = w.includes(+id) ? w.filter((x) => x !== +id) : [...w, +id]
    localStorage.setItem("wish", JSON.stringify(w))
    return w.includes(+id)
  },
  has: (id) => Wish.get().includes(+id),
}

let toastTimer
function toast(msg) {
  let t = $("#toast")
  if (!t) {
    t = document.createElement("div")
    t.id = "toast"
    t.className = "toast"
    document.body.append(t)
  }
  t.textContent = msg
  t.classList.add("show")
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800)
}

const cardHTML = (c, i = 0) => `
  <article class="card ${
    ["SEC", "PARALLEL", "MANGA"].includes(c.rarity) ? "rare" : ""
  }" style="animation-delay:${i * 40}ms">
    <div class="art ${cardArtPath(c) ? "has-art" : ""} ${c.color}" data-flip>
      ${cardArtPath(c) ? `<img class="card-illustration" src="${cardArtPath(c)}" alt="Ảnh thẻ tham khảo OP TCG" loading="lazy">` : '<div class="orb"></div><div class="fig"></div>'}
      <span class="rarity">${c.rarity}</span>
      <button class="fav ${
        Wish.has(c.id) ? "on" : ""
      }" data-fav="${c.id}" aria-label="Yêu thích">♥</button>
      <span class="card-cost">${c.cost} <small>COST</small></span>
      <b class="cname">${c.name}</b>
      <div class="card-stats"><span>${c.attr}</span><b>${c.power.toLocaleString("vi-VN")} <small>POWER</small></b></div>
      <div class="back">ONE PIECE</div>
    </div>
    <div class="info">
      <div class="meta"><b>${c.code}</b><span>NM · ${
        c.stock ? "Còn " + c.stock : "Hết hàng"
      }</span></div>
      <h3><a href="product.html?id=${c.id}">${c.name}</a></h3>
      <div class="buy"><span><b>${fmt(c.price)}</b>${
        c.old ? `<del>${fmt(c.old)}</del>` : ""
      }</span>
        <button class="add" data-add="${c.id}" ${
          c.stock ? "" : "disabled"
        } aria-label="Thêm vào giỏ">🛍</button></div>
    </div>
  </article>`

// Header + footer
function layout(active) {
  const nav = [['../index.html', 'Trang chủ'], ['catalog.html', 'Thẻ đơn'], ['set.html', 'Set mới'], ['tracker.html#shop', 'Box · Pack · Thẻ'], ['guide.html', 'Cẩm nang']]
  $("#site-header").outerHTML = `
  <div class="demo-notice" role="status"><b>BẢN DEMO TĨNH</b><span>Ảnh box/thẻ là tư liệu tham khảo; đơn hàng và thanh toán được mô phỏng, không phát sinh giao dịch thật.</span></div>
  <div class="announce">GIAO DIỆN GIỚI THIỆU SẢN PHẨM · GIÁ CẢ VÀ CHÍNH SÁCH CHỈ MANG TÍNH MINH HỌA</div>
  <header class="header"><div class="container header-row">
    <button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu">☰</button>
    <a class="logo" href="../index.html" aria-label="Grand Line Card Vault - Trang chủ"><span class="logo-mark">⚓</span><span><b>GRAND LINE</b><small>CARD VAULT</small></span></a>
    <form class="search" id="hSearch" action="catalog.html"><input name="q" type="search" placeholder="Tìm tên nhân vật, mã thẻ OP09-119..." /></form>
    <div class="actions"><button class="icon-btn" id="themeBtn" aria-label="Đổi giao diện">☀</button>
      <a class="icon-btn" href="account.html" aria-label="Tài khoản" title="Tài khoản" style="display:grid;place-items:center">👤</a>
      <a class="icon-btn cart-btn" href="cart.html" aria-label="Giỏ hàng" style="display:grid;place-items:center">🛍<span id="cartCount">0</span></a></div>
  </div>
  <nav class="container nav" id="nav">${nav.map(([h, l]) => `<a href="${h}" ${h === active ? 'style="color:var(--ocean)"' : ""}>${l}</a>`).join("")}<a class="sale-link" href="../index.html#hot">✦ Flash Sale</a></nav></header>`
  $("#site-footer").outerHTML = `
  <footer class="footer"><div class="container foot-grid">
    <div><a class="logo" href="../index.html" aria-label="Grand Line Card Vault - Trang chủ"><span class="logo-mark">⚓</span><b>GRAND LINE</b></a><p class="muted">Website giới thiệu sản phẩm TCG bản demo.</p></div>
    <div><b>Mua sắm</b><a href="catalog.html">Thẻ đơn</a><a href="set.html">Set mới OP-09</a><a href="tracker.html#shop">Box · Pack · Thẻ</a><a href="tracker.html#market">Theo dõi giá</a></div>
    <div><b>Hỗ trợ</b><a href="guide.html#giao-hang">Giao hàng</a><a href="guide.html#doi-tra">Đổi trả</a><a href="guide.html#that-gia">Thật / giả</a></div>
  </div><div class="container copy">© 2026 Grand Line Card Vault</div></footer>`
  $("#menuBtn").onclick = () => {
    $("#nav").classList.toggle("open")
    $("#hSearch").classList.toggle("show")
  }
  Cart.badge()
}

// Hành động chung trên thẻ
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]"),
    fav = e.target.closest("[data-fav]"),
    flip = e.target.closest("[data-flip]")
  if (add) Cart.add(add.dataset.add)
  else if (fav) {
    fav.classList.toggle("on", Wish.toggle(fav.dataset.fav))
    document.dispatchEvent(new Event("wishchange"))
  } else if (flip) flip.classList.toggle("flip")
})

// Biểu đồ giá mô phỏng
function priceSeries(c, n) {
  let seed = c.id * 9301,
    v = c.price * 0.85
  return Array.from({ length: n }, (_, i) => {
    seed = (seed * 49297 + 233280) % 233280
    v +=
      (seed / 233280 - 0.45) * c.price * 0.04 + (c.price - v) * (i / n) * 0.08
    return i === n - 1 ? c.price : Math.max(v, c.price * 0.5)
  })
}
function drawChart(svg, d, id = "g") {
  const min = Math.min(...d),
    max = Math.max(...d),
    span = max - min || 1
  const pts = d.map((v, i) => [
    (i / (d.length - 1)) * 500,
    190 - ((v - min) / span) * 170,
  ])
  const line = pts
    .map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1))
    .join(" ")
  svg.innerHTML = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#29d6e6" stop-opacity=".35"/><stop offset="1" stop-color="#29d6e6" stop-opacity="0"/></linearGradient></defs>
    ${[0, 1, 2, 3].map((i) => `<line x1="0" x2="500" y1="${20 + i * 56}" y2="${20 + i * 56}" stroke="rgba(128,160,180,.2)"/>`).join("")}
    <path d="${line} V200 H0Z" fill="url(#${id})"/><path d="${line}" fill="none" stroke="#29d6e6" stroke-width="3" vector-effect="non-scaling-stroke"/>`
  return {
    min,
    max,
    avg: d.reduce((a, b) => a + b, 0) / d.length,
    pct: ((d[d.length - 1] - d[0]) / d[0]) * 100,
  }
}
