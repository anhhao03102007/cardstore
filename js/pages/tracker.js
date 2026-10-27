// Gian hang Box, Pack va the don
layout("tracker.html#shop")
const PRODUCT_COLORS = { red: "#e64a4a", blue: "#29b6d2", yellow: "#e8b83e", purple: "#9b6ac8", green: "#56a87c", black: "#63717e" }
const availableKinds = ["all", "booster", "box", "pack", "card", "starter", "accessory"]
const params = new URLSearchParams(location.search)
const setCode = (params.get("set") || "").trim().toUpperCase()
const initialKind = params.get("kind")
let kind = availableKinds.includes(initialKind) ? initialKind : "all"
let cur = CARDS[1], days = 30

function shopItems() {
  const sealed = PRODUCTS.filter((p) => p.cat === "booster" && ["Box", "Pack"].includes(p.sub))
    .map((p) => ({ ...p, kind: p.sub.toLowerCase(), isCard: false }))
  const starter = PRODUCTS.filter((p) => p.cat === "starter")
    .map((p) => ({ ...p, kind: "starter", isCard: false }))
  const accessories = PRODUCTS.filter((p) => p.cat === "accessory")
    .map((p) => ({ ...p, kind: "accessory", isCard: false }))
  const singles = CARDS.map((c) => ({ ...c, kind: "card", isCard: true }))
  return [...sealed, ...starter, ...accessories, ...singles]
}

function shopItemHTML(item, i) {
  const stockLabel = item.stock ? `Còn ${item.stock}` : "Hết hàng"
  const boosterImages = {
    "OP-09": item.sub === "Box" ? "../assets/box/op09-booster-box.png" : "../assets/pack/op09-booster-pack.png",
    "OP-08": item.sub === "Box" ? "../assets/box/op08-booster-box.png" : "../assets/pack/op08-booster-pack.png",
  }
  const boosterImage = item.cat === "booster" ? boosterImages[item.code] : ""
  const visual = item.isCard
    ? `<div class="art ${cardArtPath(item) ? "has-art" : ""} ${item.color} store-art">${cardArtPath(item) ? `<img class="card-illustration" src="${cardArtPath(item)}" alt="Ảnh thẻ tham khảo OP TCG" loading="lazy">` : '<div class="orb"></div><div class="fig"></div>'}<span class="rarity">${item.rarity}</span><span class="card-cost">${item.cost} <small>COST</small></span><b class="cname">${item.name}</b><div class="card-stats"><span>${item.attr}</span><b>${item.power.toLocaleString("vi-VN")} <small>POWER</small></b></div></div>`
    : boosterImage
      ? `<div class="store-product-photo"><span class="rarity">${item.sub === "Box" ? "BOX" : "PACK"} · ${item.code}</span><img src="${boosterImage}" alt="Ảnh tham khảo ${item.name}" loading="lazy"></div>`
    : `<div class="pimg store-pimg" style="--pc:${PRODUCT_COLORS[item.color] || "#0878b9"}"><span class="rarity">${item.sub === "Box" ? "SEALED BOX" : item.sub === "Pack" ? "BOOSTER PACK" : item.sub}</span><b>${item.code}</b><small>${item.note}</small></div>`
  const details = item.isCard ? `${item.set} · ${item.type} · ${item.rarity}` : item.note
  const itemName = item.isCard ? item.name : item.name.replace(/\s*\(Đặt trước\)/i, "")
  return `<article class="card shop-card" style="animation-delay:${i * 35}ms">
    ${visual}
    <div class="info">
      <div class="meta"><b>${item.code}</b><span>${stockLabel}</span></div>
      <h3 title="${itemName}">${itemName}</h3>
      <p class="shop-item-note">${details}</p>
      <div class="shop-price"><b>${fmt(item.price)}</b>${item.old ? `<del>${fmt(item.old)}</del>` : ""}</div>
      <div class="shop-buy"><label>Số lượng<input type="number" min="1" max="${item.stock}" value="1" aria-label="Số lượng ${itemName}" ${item.stock ? "" : "disabled"}></label>
        <button class="btn btn-primary" data-sale-add="${item.id}" ${item.stock ? "" : "disabled"}>${item.stock ? "Thêm vào giỏ" : "Hết hàng"}</button></div>
    </div>
  </article>`
}

function renderShop() {
  const q = $("#shopSearch").value.trim().toLocaleLowerCase("vi")
  const items = shopItems().filter((item) => !setCode || (item.isCard ? item.set === setCode : item.code.toUpperCase() === setCode))
  let list = items.filter((item) => (kind === "all" || (kind === "booster" ? ["box", "pack"].includes(item.kind) : item.kind === kind)) &&
    (!q || `${item.name} ${item.code} ${item.isCard ? `${item.set} ${item.rarity}` : item.note}`.toLocaleLowerCase("vi").includes(q)))
  const sort = $("#shopSort").value
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price)
  if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price)
  $("#shopGrid").innerHTML = list.map(shopItemHTML).join("")
  $("#shopCount").textContent = `${list.length} sản phẩm`
  $("#shopEmpty").hidden = list.length > 0
  if (setCode) {
    $("#shopEyebrow").textContent = "BỘ SƯU TẬP MỚI"
    $("#shopTitle").textContent = `Set ${setCode} · Box, Pack & Thẻ`
    $("#shopLead").textContent = `Khám phá trọn bộ sản phẩm ${setCode}: box, pack và các thẻ đơn thuộc cùng set.`
    $$("#shopTabs button").forEach((tab) => {
      tab.hidden = !["all", "booster", "box", "pack", "card"].includes(tab.dataset.kind)
    })
  } else {
    $$("#shopTabs button").forEach((tab) => { tab.hidden = false })
  }
}

$$("#shopTabs button").forEach((tab) => tab.classList.toggle("on", tab.dataset.kind === kind))
$("#shopTabs").addEventListener("click", (e) => {
  const button = e.target.closest("[data-kind]")
  if (!button) return
  kind = button.dataset.kind
  $$("#shopTabs button").forEach((tab) => tab.classList.toggle("on", tab === button))
  renderShop()
})
$("#shopSearch").addEventListener("input", renderShop)
$("#shopSort").addEventListener("change", renderShop)
$("#shopGrid").addEventListener("click", (e) => {
  const button = e.target.closest("[data-sale-add]")
  if (!button) return
  const item = byId(button.dataset.saleAdd)
  const input = button.parentElement.querySelector("input")
  const qty = Number(input.value)
  if (!Number.isInteger(qty) || qty < 1 || qty > item.stock) {
    toast(`Số lượng phải từ 1 đến ${item.stock}`)
    input.focus()
    return
  }
  Cart.add(item.id, "NM", qty)
})

const pctOf = (c) => { const d = priceSeries(c, 30); return ((d[29] - d[0]) / d[0]) * 100 }
function draw() {
  const r = drawChart($("#chart"), priceSeries(cur, days))
  $("#tCode").textContent = cur.code + " · " + cur.rarity
  $("#tName").textContent = cur.name
  $("#tPrice").textContent = fmt(cur.price)
  const ch = $("#tChange")
  ch.textContent = (r.pct >= 0 ? "+" : "") + r.pct.toFixed(1).replace(".", ",") + "% / " + days + " ngày"
  ch.className = r.pct >= 0 ? "up" : "down"
  $("#sMin").textContent = fmt(r.min)
  $("#sMax").textContent = fmt(r.max)
  $("#sAvg").textContent = fmt(r.avg)
  $("#tLink").href = "product.html?id=" + cur.id
}
function rows(q = "") {
  const l = [...CARDS].sort((a, b) => b.price - a.price).filter((c) => (c.name + c.code).toLowerCase().includes(q.toLowerCase()))
  $("#rows").innerHTML = l.map((c) => { const p = pctOf(c); return `<tr><td><b>${c.name}</b><br><small style="color:var(--muted)">${c.code}</small></td><td>${c.rarity}</td><td>${fmt(c.price)}</td><td class="${p >= 0 ? "up" : "down"}">${p >= 0 ? "▲ +" : "▼ "}${p.toFixed(1).replace(".", ",")}%</td><td><button class="chip" data-id="${c.id}">Xem biểu đồ</button></td></tr>` }).join("")
}
$("#range").onclick = (e) => { const b = e.target.closest("[data-d]"); if (!b) return; days = +b.dataset.d; $$("#range button").forEach((x) => x.classList.toggle("on", x === b)); draw() }
$("#rows").onclick = (e) => { const b = e.target.closest("[data-id]"); if (b) { cur = byId(b.dataset.id); draw(); scrollTo({ top: 0, behavior: "smooth" }) } }
$("#tq").oninput = (e) => { const q = e.target.value; rows(q); const f = CARDS.find((c) => (c.name + c.code).toLowerCase().includes(q.toLowerCase())); if (q && f) { cur = f; draw() } }

renderShop()
rows()
draw()
