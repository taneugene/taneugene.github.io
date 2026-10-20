// Loaded in <head> so the theme is applied before first paint (no flicker).
// Setting cycles system -> light -> dark, as on the old al-folio site.

let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  if (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") {
    themeSetting = "system";
  }
  return themeSetting;
};

let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting == "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return themeSetting;
};

let applyTheme = () => {
  document.documentElement.setAttribute("data-theme-setting", determineThemeSetting());
  document.documentElement.setAttribute("data-theme", determineComputedTheme());
};

let toggleThemeSetting = () => {
  let next = { system: "light", light: "dark", dark: "system" }[determineThemeSetting()];
  localStorage.setItem("theme", next);
  applyTheme();
};

applyTheme();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("light-toggle").addEventListener("click", toggleThemeSetting);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
