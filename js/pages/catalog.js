layout('catalog.html')
const PER = 6, F = { set: new Set(), color: new Set(), rarity: new Set(), type: new Set(), attr: new Set(), counter: new Set() }
const opts = {
  set: [...new Set(CARDS.map((c) => c.set))].sort(), color: Object.keys(COLOR_VI), rarity: ['C', 'R', 'SR', 'SEC', 'PARALLEL', 'MANGA'],
  type: ['Leader', 'Character', 'Event'], attr: ['Slash', 'Strike', 'Special'], counter: ['0', '1000', '2000'] }
const label = (k, v) => (k === 'color' ? COLOR_VI[v] : v)
let page = 1
// khôi phục từ URL
const sp = new URLSearchParams(location.search)
Object.keys(F).forEach((k) => (sp.get(k) || '').split(',').filter(Boolean).forEach((v) => F[k].add(v)))
if (sp.get('q')) window.Q = sp.get('q')
$('#cost').value = sp.get('cost') || 10; $('#pow').value = sp.get('pow') || 0; $('#price').value = sp.get('price') || 9000000
$('#stock').checked = sp.get('stock') === '1'; $('#sort').value = sp.get('sort') || ''; page = +sp.get('page') || 1
$$('[data-f]').forEach((el) => {
  const k = el.dataset.f
  el.innerHTML = opts[k].map((v) => `<button class="chip ${F[k].has(v) ? 'on' : ''}" data-v="${v}">${label(k, v)}</button>`).join('')
  el.onclick = (e) => { const b = e.target.closest('[data-v]'); if (!b) return; F[k].has(b.dataset.v) ? F[k].delete(b.dataset.v) : F[k].add(b.dataset.v); b.classList.toggle('on'); page = 1; render() }
})
;['cost', 'pow', 'price', 'stock', 'sort'].forEach((id) => $('#' + id).addEventListener('input', () => { page = 1; render() }))
$('#reset').onclick = () => { Object.values(F).forEach((s) => s.clear()); window.Q = ''; $('#cost').value = 10; $('#pow').value = 0; $('#price').value = 9000000; $('#stock').checked = false; $$('.chip.on').forEach((c) => c.classList.remove('on')); render() }
$('#openSide').onclick = () => $('#side').classList.add('open'); $('#closeSide').onclick = () => $('#side').classList.remove('open')
function render() {
  const cost = +$('#cost').value, pow = +$('#pow').value, price = +$('#price').value, q = (window.Q || '').toLowerCase()
  $('#costV').textContent = cost; $('#powV').textContent = pow; $('#priceV').textContent = fmt(price)
  let list = CARDS.filter((c) => (!F.set.size || F.set.has(c.set)) && (!F.color.size || F.color.has(c.color)) && (!F.rarity.size || F.rarity.has(c.rarity)) &&
    (!F.type.size || F.type.has(c.type)) && (!F.attr.size || F.attr.has(c.attr)) && (!F.counter.size || F.counter.has(String(c.counter))) &&
    c.cost <= cost && c.power >= pow && c.price <= price && (!$('#stock').checked || c.stock > 0) && (!q || (c.name + c.code + c.rarity).toLowerCase().includes(q)))
  const s = $('#sort').value
  if (s) list = [...list].sort((a, b) => (s === 'asc' ? a.price - b.price : s === 'desc' ? b.price - a.price : b.power - a.power))
  const pages = Math.max(1, Math.ceil(list.length / PER)); page = Math.min(page, pages)
  $('#grid').innerHTML = list.slice((page - 1) * PER, page * PER).map(cardHTML).join('')
  $('#count').textContent = list.length + ' kết quả'; $('#empty').hidden = list.length > 0
  $('#pager').innerHTML = pages > 1 ? Array.from({ length: pages }, (_, i) => `<button class="${i + 1 === page ? 'on' : ''}" data-p="${i + 1}">${i + 1}</button>`).join('') : ''
  $('#tags').innerHTML = [...Object.entries(F).flatMap(([k, s]) => [...s].map((v) => `<button data-k="${k}" data-v="${v}">${label(k, v)} ✕</button>`)), q ? `<button data-k="q">“${window.Q}” ✕</button>` : ''].join('')
  // đồng bộ URL
  const p = new URLSearchParams()
  Object.entries(F).forEach(([k, s]) => s.size && p.set(k, [...s].join(',')))
  if (q) p.set('q', window.Q); if (cost < 10) p.set('cost', cost); if (pow) p.set('pow', pow); if (price < 9000000) p.set('price', price)
  if ($('#stock').checked) p.set('stock', 1); if (s) p.set('sort', s); if (page > 1) p.set('page', page)
  history.replaceState(null, '', p.toString() ? '?' + p : location.pathname)
}
$('#pager').onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) { page = +b.dataset.p; render(); scrollTo({ top: 0, behavior: 'smooth' }) } }
$('#tags').onclick = (e) => {
  const b = e.target.closest('[data-k]'); if (!b) return
  if (b.dataset.k === 'q') window.Q = ''; else { F[b.dataset.k].delete(b.dataset.v); $(`[data-f=${b.dataset.k}] [data-v="${b.dataset.v}"]`).classList.remove('on') }
  render()
}
document.addEventListener('wishchange', () => {})
render()
