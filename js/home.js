;(() => {
  const $ = (s) => document.querySelector(s)
  const fmt = (n) => n.toLocaleString("vi-VN") + "đ"
  const cardArtPath = (card) => {
    const images = {
      "OP09-119": "op09-119-luffy.png",
      "OP02-013": "op02-013-ace.png",
    }
    return images[card.code] ? `assets/card-art/one-piece/${images[card.code]}` : ""
  }

  const CARDS = [
    {
      id: 1,
      code: "OP09-119",
      name: "Monkey D. Luffy",
      rarity: "SEC",
      color: "red",
      cost: 5,
      power: 7000,
      counter: 0,
      attr: "Strike",
      price: 2450000,
      old: 2890000,
      stock: 2,
      hot: true,
    },
    {
      id: 2,
      code: "OP05-119",
      name: "Monkey D. Luffy",
      rarity: "MANGA",
      color: "yellow",
      cost: 7,
      power: 9000,
      counter: 0,
      attr: "Strike",
      price: 8990000,
      old: 0,
      stock: 1,
      hot: true,
    },
    {
      id: 3,
      code: "OP06-118",
      name: "Roronoa Zoro",
      rarity: "SEC",
      color: "green",
      cost: 5,
      power: 7000,
      counter: 0,
      attr: "Slash",
      price: 1850000,
      old: 2100000,
      stock: 3,
      hot: true,
    },
    {
      id: 4,
      code: "OP01-120",
      name: "Shanks",
      rarity: "PARALLEL",
      color: "blue",
      cost: 9,
      power: 10000,
      counter: 0,
      attr: "Slash",
      price: 4200000,
      old: 0,
      stock: 1,
      hot: true,
    },
    {
      id: 5,
      code: "OP03-122",
      name: "Charlotte Katakuri",
      rarity: "SR",
      color: "purple",
      cost: 4,
      power: 5000,
      counter: 1000,
      attr: "Special",
      price: 650000,
      old: 0,
      stock: 6,
    },
    {
      id: 6,
      code: "OP02-013",
      name: "Portgas D. Ace",
      rarity: "SR",
      color: "red",
      cost: 5,
      power: 6000,
      counter: 0,
      attr: "Special",
      price: 980000,
      old: 1100000,
      stock: 4,
    },
    {
      id: 7,
      code: "OP04-083",
      name: "Sabo",
      rarity: "R",
      color: "black",
      cost: 3,
      power: 4000,
      counter: 1000,
      attr: "Strike",
      price: 120000,
      old: 0,
      stock: 12,
    },
    {
      id: 8,
      code: "OP08-057",
      name: "Trafalgar Law",
      rarity: "SR",
      color: "blue",
      cost: 4,
      power: 5000,
      counter: 0,
      attr: "Slash",
      price: 540000,
      old: 0,
      stock: 0,
    },
    {
      id: 9,
      code: "OP07-051",
      name: "Boa Hancock",
      rarity: "SEC",
      color: "purple",
      cost: 6,
      power: 7000,
      counter: 0,
      attr: "Special",
      price: 3100000,
      old: 0,
      stock: 2,
    },
    {
      id: 10,
      code: "OP09-093",
      name: "Marshall D. Teach",
      rarity: "SEC",
      color: "black",
      cost: 10,
      power: 12000,
      counter: 0,
      attr: "Special",
      price: 2200000,
      old: 0,
      stock: 3,
    },
    {
      id: 11,
      code: "OP05-060",
      name: "Nami",
      rarity: "R",
      color: "yellow",
      cost: 2,
      power: 0,
      counter: 2000,
      attr: "-",
      price: 90000,
      old: 0,
      stock: 20,
    },
    {
      id: 12,
      code: "OP06-022",
      name: "Vinsmoke Sanji",
      rarity: "SR",
      color: "green",
      cost: 4,
      power: 5000,
      counter: 1000,
      attr: "Strike",
      price: 430000,
      old: 0,
      stock: 5,
    },
  ]
  const COLORS = [
    ["all", "Tất cả", "#29d6e6"],
    ["red", "Đỏ", "#e95353"],
    ["blue", "Xanh", "#2493d2"],
    ["green", "Lục", "#51a66e"],
    ["purple", "Tím", "#9b62c7"],
    ["black", "Đen", "#34414d"],
    ["yellow", "Vàng", "#f1c756"],
  ]
  const SLIDES = [
    {
      badge: "NEW RELEASE · OP-09",
      kicker: "THE FOUR EMPERORS",
      title: "CHINH PHỤC<br /><em>ĐẠI HẢI TRÌNH</em>",
      desc: "Khám phá Booster Pack OP-09 cùng những lá SEC và Parallel Rare đáng săn đón nhất mùa này.",
      box: "THE FOUR<br />EMPERORS",
      code: "OP-09",
      hue: "#e64a4a",
    },
    {
      badge: "STARTER DECK",
      kicker: "READY TO PLAY",
      title: "BẮT ĐẦU<br /><em>HẢI TRÌNH MỚI</em>",
      desc: "Bộ bài dựng sẵn cân bằng, phù hợp cho người mới và đã sẵn sàng thi đấu.",
      box: "STARTER<br />DECK",
      code: "ST-21",
      hue: "#2493d2",
    },
    {
      badge: "PRE-ORDER · OP-10",
      kicker: "ROYAL BLOODLINES",
      title: "ĐẶT TRƯỚC<br /><em>KHO BÁU MỚI</em>",
      desc: "Giữ chỗ Booster Box mới sớm để không bỏ lỡ những lá Parallel Rare.",
      box: "ROYAL<br />BLOODLINES",
      code: "OP-10",
      hue: "#9b62c7",
    },
  ]

  const state = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]").reduce(
      (s, x) => s + x.qty,
      0,
    ),
    color: "all",
    favs: new Set(),
    slide: 0,
    days: 30,
  }

  // Toast
  let toastTimer
  const toast = (msg) => {
    const t = $("#toast")
    t.textContent = msg
    t.classList.add("show")
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => t.classList.remove("show"), 1800)
  }

  // Card template
  const cardHTML = (c, i = 0) => `
    <article class="card ${
      ["SEC", "PARALLEL", "MANGA"].includes(c.rarity) ? "rare" : ""
    }" style="animation-delay:${i * 50}ms">
      <div class="art ${cardArtPath(c) ? "has-art" : ""} ${c.color}" data-flip title="Nhấn để xem mặt sau">
        ${cardArtPath(c) ? `<img class="card-illustration" src="${cardArtPath(c)}" alt="Ảnh thẻ tham khảo OP TCG" loading="lazy">` : '<div class="orb"></div><div class="fig"></div>'}
        <span class="rarity">${c.rarity}</span>
        <button class="fav ${
          state.favs.has(c.id) ? "on" : ""
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
        <h3><a href="pages/product.html?id=${c.id}">${c.name}</a></h3>
        <div class="buy"><span><b>${fmt(c.price)}</b>${
          c.old ? `<del>${fmt(c.old)}</del>` : ""
        }</span>
          <button class="add" data-add="${c.id}" ${
            c.stock ? "" : "disabled"
          } aria-label="Thêm vào giỏ">🛍</button></div>
      </div>
    </article>`

  // Delegated card actions
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]")
    const fav = e.target.closest("[data-fav]")
    const flip = e.target.closest("[data-flip]")
    if (add) {
      const ct = JSON.parse(localStorage.getItem("cart") || "[]"),
        it = ct.find((x) => x.id == add.dataset.add && x.cond === "NM")
      it ? it.qty++ : ct.push({ id: +add.dataset.add, cond: "NM", qty: 1 })
      localStorage.setItem("cart", JSON.stringify(ct))
      state.cart = ct.reduce((s, x) => s + x.qty, 0)
      $("#cartCount").textContent = state.cart
      toast(
        "Đã thêm " +
          CARDS.find((c) => c.id == add.dataset.add).name +
          " vào giỏ",
      )
    } else if (fav) {
      const id = +fav.dataset.fav
      state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id)
      fav.classList.toggle("on")
    } else if (flip) flip.classList.toggle("flip")
    if (!e.target.closest(".search")) $("#suggest").classList.remove("open")
  })

  // Hot cards
  $("#hotGrid").innerHTML = CARDS.filter((c) => c.hot)
    .map(cardHTML)
    .join("")

  // Countdown (kết thúc lúc 24:00 hôm nay)
  const tick = () => {
    const end = new Date()
    end.setHours(24, 0, 0, 0)
    const s = Math.max(0, Math.floor((end - Date.now()) / 1000))
    $("#countdown").textContent = [s / 3600, (s % 3600) / 60, s % 60]
      .map((n) => String(Math.floor(n)).padStart(2, "0"))
      .join(":")
  }
  tick()
  setInterval(tick, 1000)

  // Filters
  $("#colorFilters").innerHTML = COLORS.map(
    ([k, label, c]) =>
      `<button data-color="${k}" class="${
        k === "all" ? "on" : ""
      }"><i class="dot" style="--c:${c}"></i>${label}</button>`,
  ).join("")
  $("#colorFilters").onclick = (e) => {
    const b = e.target.closest("[data-color]")
    if (!b) return
    state.color = b.dataset.color
    document
      .querySelectorAll("#colorFilters button")
      .forEach((x) => x.classList.toggle("on", x === b))
    render()
  }
  const render = () => {
    const q = normalizeSearch($("#searchInput").value.trim())
    const r = $("#rarityFilter").value,
      cost = $("#costFilter").value,
      power = +$("#powerFilter").value || 0,
      counter = $("#counterFilter").value,
      attr = $("#attrFilter").value,
      price = $("#priceFilter").value,
      sort = $("#sortFilter").value
    const priceQuery = parsePriceQuery($("#searchInput").value)
    let list = CARDS.filter(
      (c) =>
        (state.color === "all" || c.color === state.color) &&
        (!r || c.rarity === r) &&
        (!cost || (cost === "le5" ? c.cost <= 5 : c.cost > 5)) &&
        (!power || c.power >= power) &&
        (!counter || c.counter === +counter) &&
        (!attr || c.attr === attr) &&
        (!price ||
          (price === "2"
            ? c.price < 2e6
            : price === "5"
              ? c.price >= 2e6 && c.price <= 5e6
              : c.price > 5e6)) &&
        (!$("#stockFilter").checked || c.stock > 0) &&
        (!priceQuery || priceQuery(c.price)) &&
        (!q || priceQuery || matchesSearch(c, q)),
    )
    if (sort)
      list = [...list].sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price,
      )
    $("#singleGrid").innerHTML = list.map(cardHTML).join("")
    $("#resultCount").textContent = list.length + " kết quả"
    $("#empty").hidden = list.length > 0
  }
  ;[
    "#rarityFilter",
    "#costFilter",
    "#powerFilter",
    "#counterFilter",
    "#attrFilter",
    "#priceFilter",
    "#sortFilter",
    "#stockFilter",
  ].forEach((s) => $(s).addEventListener("change", render))
  $("#resetBtn").onclick = () => {
    ;["#rarityFilter", "#costFilter", "#powerFilter", "#counterFilter", "#attrFilter", "#priceFilter", "#sortFilter"].forEach(
      (s) => ($(s).value = ""),
    )
    $("#stockFilter").checked = false
    $("#searchInput").value = ""
    state.color = "all"
    document
      .querySelectorAll("#colorFilters button")
      .forEach((x) => x.classList.toggle("on", x.dataset.color === "all"))
    render()
  }

  // Header search matches card identity, rarity and listed price.
  const normalizeSearch = (value) =>
    value.toLocaleLowerCase("vi").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const searchText = (c) =>
    normalizeSearch(`${c.name} ${c.code} ${c.code.replace(/-/g, "")} ${c.rarity} ${c.price} ${fmt(c.price)}`)
  const matchesSearch = (c, q) =>
    searchText(c).includes(q) ||
    normalizeSearch(c.code).replace(/-/g, "").includes(q.replace(/[-\s]/g, ""))
  const parsePriceQuery = (value) => {
    const q = normalizeSearch(value).replace(/\s/g, "")
    const match = q.match(/^(?:gia|price)?(<=|>=|<|>|:)([\d.,]+)(k|nghin|ngan|m|tr|trieu)?$/)
    if (!match) return null
    const amount = Number(match[2].replace(/[,.]/g, ""))
    const multiplier = ["k", "nghin", "ngan"].includes(match[3]) ? 1000 : ["m", "tr", "trieu"].includes(match[3]) ? 1000000 : 1
    const target = amount * multiplier
    return (price) => match[1] === "<" ? price < target : match[1] === "<=" ? price <= target : match[1] === ">" ? price > target : match[1] === ">=" ? price >= target : price === target
  }
  // Search autocomplete
  const input = $("#searchInput"),
    box = $("#suggest")
  input.addEventListener("input", () => {
    const q = normalizeSearch(input.value.trim())
    render()
    const hits = q
      ? CARDS.filter((c) => {
          const priceQuery = parsePriceQuery(input.value)
          return priceQuery ? priceQuery(c.price) : matchesSearch(c, q)
        }).slice(0, 5)
      : []
    box.innerHTML = hits
      .map(
        (c) =>
          `<a href="pages/product.html?id=${c.id}"><span>${c.code} · ${c.name}</span><small>${c.rarity} · ${fmt(c.price)}</small></a>`,
      )
      .join("")
    box.classList.toggle("open", hits.length > 0)
  })
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      box.classList.remove("open")
      document.querySelector("#singles").scrollIntoView({ behavior: "smooth" })
    }
  })

  // Mobile menu: toggle nav + search
  $("#menuBtn").onclick = () => {
    $("#nav").classList.toggle("open")
    document.querySelector(".search").classList.toggle("show")
  }

  // Hero slider
  $("#heroDots").innerHTML = SLIDES.map(
    (_, i) => `<button aria-label="Slide ${i + 1}" data-slide="${i}"></button>`,
  ).join("")
  const showSlide = (i) => {
    state.slide = i
    const s = SLIDES[i],
      text = document.querySelector(".hero-text")
    text.style.opacity = 0
    setTimeout(() => {
      $("#heroBadge").textContent = s.badge
      $("#heroKicker").textContent = s.kicker
      $("#heroTitle").innerHTML = s.title
      $("#heroDesc").textContent = s.desc
      $("#boxName").innerHTML = s.box
      $("#boxCode").textContent = s.code
      $("#heroVisual").style.setProperty("--hc", s.hue)
      text.style.opacity = 1
    }, 200)
    document
      .querySelectorAll("#heroDots button")
      .forEach((b, k) => b.classList.toggle("on", k === i))
  }
  let auto = setInterval(
    () => showSlide((state.slide + 1) % SLIDES.length),
    6500,
  )
  $("#heroDots").onclick = (e) => {
    const b = e.target.closest("[data-slide]")
    if (!b) return
    clearInterval(auto)
    showSlide(+b.dataset.slide)
  }
  showSlide(0)

  // 3D tilt (tắt khi reduced-motion)
  const hv = $("#heroVisual")
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hv.addEventListener("mousemove", (e) => {
      const r = hv.getBoundingClientRect()
      hv.style.setProperty(
        "--ry",
        ((e.clientX - r.left) / r.width - 0.5) * 24 + "deg",
      )
      hv.style.setProperty(
        "--rx",
        ((e.clientY - r.top) / r.height - 0.5) * -16 + "deg",
      )
    })
    hv.addEventListener("mouseleave", () => {
      hv.style.setProperty("--ry", "0deg")
      hv.style.setProperty("--rx", "0deg")
    })
  }

  // Price tracker (dữ liệu mô phỏng, có seed theo thẻ)
  const tSel = $("#trackerCard")
  const rare = CARDS.filter((c) =>
    ["SEC", "PARALLEL", "MANGA"].includes(c.rarity),
  )
  tSel.innerHTML = rare
    .map(
      (c) =>
        `<option value="${c.id}">${c.code} · ${c.name} (${c.rarity})</option>`,
    )
    .join("")
  const series = (c, n) => {
    let seed = c.id * 9301,
      v = c.price * 0.85
    return Array.from({ length: n }, (_, i) => {
      seed = (seed * 49297 + 233280) % 233280
      v +=
        (seed / 233280 - 0.45) * c.price * 0.04 + (c.price - v) * (i / n) * 0.08
      return i === n - 1 ? c.price : Math.max(v, c.price * 0.5)
    })
  }
  const drawChart = () => {
    const c = CARDS.find((x) => x.id == tSel.value)
    const d = series(c, state.days)
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
    const pct = ((d[d.length - 1] - d[0]) / d[0]) * 100
    $("#chart").innerHTML =
      `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#29d6e6" stop-opacity=".35"/><stop offset="1" stop-color="#29d6e6" stop-opacity="0"/></linearGradient></defs>
      ${[0, 1, 2, 3].map((i) => `<line x1="0" x2="500" y1="${20 + i * 56}" y2="${20 + i * 56}" stroke="rgba(255,255,255,.07)"/>`).join("")}
      <path d="${line} V200 H0Z" fill="url(#g)"/><path d="${line}" fill="none" stroke="#29d6e6" stroke-width="3" vector-effect="non-scaling-stroke"/>`
    $("#tCode").textContent = c.code + " · " + c.rarity
    $("#tName").textContent = c.name
    $("#tPrice").textContent = fmt(c.price)
    const ch = $("#tChange")
    ch.textContent =
      (pct >= 0 ? "+" : "") +
      pct.toFixed(1).replace(".", ",") +
      "% / " +
      state.days +
      " ngày"
    ch.className = pct >= 0 ? "up" : "down"
  }
  tSel.onchange = drawChart
  $("#rangeBtns").onclick = (e) => {
    const b = e.target.closest("[data-d]")
    if (!b) return
    state.days = +b.dataset.d
    document
      .querySelectorAll("#rangeBtns button")
      .forEach((x) => x.classList.toggle("on", x === b))
    drawChart()
  }

  $("#cartCount").textContent = state.cart
  render()
  drawChart()
})()
