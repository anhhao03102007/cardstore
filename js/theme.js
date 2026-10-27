;(() => {
  const root = document.documentElement
  const storedTheme = localStorage.getItem("theme")
  const preferredTheme = matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark"

  function syncButton() {
    const button = document.getElementById("themeBtn")
    if (!button) return
    button.textContent = root.dataset.theme === "dark" ? "☀" : "☾"
    button.setAttribute(
      "aria-label",
      root.dataset.theme === "dark"
        ? "Chuyển sang giao diện sáng"
        : "Chuyển sang giao diện tối",
    )
  }

  root.dataset.theme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : preferredTheme

  document.addEventListener("DOMContentLoaded", syncButton)
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#themeBtn")) return
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", root.dataset.theme)
    syncButton()
  })
})()
