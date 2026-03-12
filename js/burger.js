const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", burgerClick);
function burgerClick() {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
}

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  if (window.location.pathname.endsWith(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});
