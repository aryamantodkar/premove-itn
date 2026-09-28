const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("premove-theme");

if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

function updateThemeLabel() {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
}

themeToggle.addEventListener("click", () => {
  root.dataset.theme = themeToggle.getAttribute("aria-label") === "Switch to light theme"
    ? "light" : "dark";
  localStorage.setItem("premove-theme", root.dataset.theme);
  updateThemeLabel();
});

matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateThemeLabel);
updateThemeLabel();

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.parentElement.querySelector("code").textContent;
    await navigator.clipboard.writeText(code);
    button.setAttribute("aria-label", "Copied");
    setTimeout(() => button.setAttribute("aria-label", "Copy the contents from the code block"), 2000);
  });
});
