(function setTheme() {
  const themeKey = "user-theme";
  const defaultTheme = "dark-theme";
  const storedTheme = localStorage.getItem(themeKey) || defaultTheme;
  document.body.classList.add(storedTheme);
})();
