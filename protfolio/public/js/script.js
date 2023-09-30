let sidebar = document.getElementById("sidebar");
function showAbout() {
  if (sidebar.classList.contains("hide-about-area")) {
    sidebar.classList.remove("hide-about-area");
  } else {
    sidebar.classList.add("hide-about-area");
  }
}

let mobileNav = document.querySelector(".mobile-nav");
function showNavbar() {
  if (mobileNav.classList.contains("hide-mobi-nav")) {
    mobileNav.classList.remove("hide-mobi-nav");
  } else {
    mobileNav.classList.add("hide-mobi-nav");
  }
}


