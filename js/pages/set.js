layout("set.html")

const setCode = "OP-09"
const colors = { red: "#e64a4a", blue: "#29b6d2", yellow: "#e8b83e", purple: "#9b6ac8", green: "#56a87c", black: "#63717e" }
const items = [
  ...PRODUCTS.filter((product) => product.cat === "booster" && product.code === setCode)
    .map((product) => ({ ...product, kind: product.sub.toLowerCase(), sealed: true })),
  ...CARDS.filter((card) => card.set === setCode)
    .map((card) => ({ ...card, kind: "card", sealed: false })),
]
let selectedType = "all"

function productVisual(item) {
  if (!item.sealed) {
    const art = cardArtPath(item)
    return `<div class="art ${art ? "has-art" : ""} ${item.color} set-item-art">${art ? `<img class="card-illustration" src="${art}" alt="Ảnh thẻ tham khảo OP TCG" loading="lazy">` : '<div class="orb"></div><div class="fig"></div>'}<span class="rarity">${item.rarity}</span><span class="card-cost">${item.cost} <small>COST</small></span><b class="cname">${item.name}</b><div class="card-stats"><span>${item.attr}</span><b>${item.power.toLocaleString("vi-VN")} <small>POWER</small></b></div></div>`
  }
  const isBox = item.kind === "box"
  const image = isBox ? "../assets/box/op09-booster-box.png" : "../assets/pack/op09-booster-pack.png"
  const alt = isBox ? "Ảnh tham khảo Booster Box OP-09" : "Ảnh tham khảo Booster Pack OP-09"
  return `<div class="set-product-visual ${item.color}"><span class="rarity">${isBox ? "BOX · OP-09" : "PACK · OP-09"}</span><img src="${image}" alt="${alt}" loading="lazy"><small class="set-product-note">${item.note}</small></div>`
}

function productCard(item, index) {
  const cardInfo = item.sealed ? item.note : `${item.set} · ${item.rarity} · ${COLOR_VI[item.color]}`
  const subtitle = item.sealed ? item.name : `${item.name} · ${item.code}`
  return `<article class="card set-product-card" style="animation-delay:${index * 50}ms">
    ${productVisual(item)}
    <div class="info">
      <div class="meta"><b>${item.code}</b><span>${item.stock ? `Còn ${item.stock}` : "Hết hàng"}</span></div>
      <h3 title="${subtitle}">${item.sealed ? item.name : `<a href="product.html?id=${item.id}">${item.name}</a>`}</h3>
      <p class="set-item-meta">${cardInfo}</p>
      <div class="set-item-price"><b>${fmt(item.price)}</b>${item.old ? `<del>${fmt(item.old)}</del>` : ""}</div>
      <div class="set-item-actions"><label>Số lượng<input type="number" min="1" max="${item.stock}" value="1" aria-label="Số lượng ${subtitle}" ${item.stock ? "" : "disabled"}></label>
        <button class="btn btn-primary" data-set-add="${item.id}" ${item.stock ? "" : "disabled"}>${item.stock ? "Thêm vào giỏ" : "Hết hàng"}</button></div>
    </div>
  </article>`
}

function render() {
  const visible = items.filter((item) => selectedType === "all" ||
    (selectedType === "sealed" ? item.sealed : item.kind === selectedType))
  $("#setGrid").innerHTML = visible.map(productCard).join("")
  $("#setCount").textContent = `${visible.length} sản phẩm`
  $("#setEmpty").hidden = visible.length > 0
}

$("#setTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-type]")
  if (!button) return
  selectedType = button.dataset.type
  $$("#setTabs button").forEach((tab) => tab.classList.toggle("on", tab === button))
  render()
})

$("#setGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-set-add]")
  if (!button) return
  const item = byId(button.dataset.setAdd)
  const qty = Number(button.parentElement.querySelector("input").value)
  if (!Number.isInteger(qty) || qty < 1 || qty > item.stock) {
    toast(`Số lượng phải từ 1 đến ${item.stock}`)
    button.parentElement.querySelector("input").focus()
    return
  }
  Cart.add(item.id, "NM", qty)
})

render()
