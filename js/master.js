// Settings
if (localStorage.getItem("color_option")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === localStorage.getItem("color_option")) {
      el.classList.add("active");
    }
  });
}
document.querySelector(".icon-holder .fa-cog").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".settings").classList.toggle("open");
};

let colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");
    });
  });
});

let backgroundOption = true;
let backgroundInterval;

if (localStorage.getItem("background_option") !== null) {
  if (localStorage.getItem("background_option") === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".background-list li").forEach((el) => {
    el.classList.remove("active");
  });
}
if (localStorage.getItem("background_option") === "true") {
  document
    .querySelector(".background-list li:first-of-type")
    .classList.add("active");
} else {
  document
    .querySelector(".background-list li:last-of-type")
    .classList.add("active");
}

let backgroundLi = document.querySelectorAll(".background-list li");
backgroundLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");

      if (e.target.dataset.background === "yes") {
        backgroundOption = true;
        randomizeImg();
        localStorage.setItem("background_option", true);
      } else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("background_option", false);
      }
    });
  });
});

function randomizeImg() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage = `url(images/${imagesArray[randomNumber]})`;
    }, 10000);
  }
}

randomizeImg();

// Navbar
const allLinks = document.querySelectorAll(".header a");
function scrollToSection(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allLinks);

let bars = (document.querySelector(".fa-bars").onclick = function (e) {
  // e.target.classList.toggle("open");
  document.querySelector(".header ul").classList.toggle("open");
});

window.addEventListener("scroll", () => {
  if (this.pageYOffset > 0) {
    document.querySelector(".header").style =
      "color: #333; background: #fff; box-shadow: 0 0 10px #eee";
    document.querySelectorAll(".header a").forEach((el) => {
      el.style = "color: var(--main-color);";
    });
    document.querySelectorAll(".header ul.open a").forEach((el) => {
      el.style = "color: var(--main-color);";
    });
  } else {
    document.querySelector(".header").style =
      "color: #fff; background: transparent;";
    document.querySelectorAll(".header a").forEach((el) => {
      el.style = "color: #fff;";
    });
    document.querySelectorAll(".header ul.open a").forEach((el) => {
      el.style = "color: var(--main-color);";
    });
  }
});

// Landing
let landingPage = document.querySelector(".landing-page");

let imagesArray = [
  "Ballons.jpg",
  "Clouds.jpg",
  "Sea.jpg",
  "Sky.jpg",
  "Trees.jpg",
];

// Our Skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  let offset = skillsOffsetTop + skillsOuterHeight - windowHeight;
  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
  if (windowScrollTop >= offset) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};

// Gallary
let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("i");
    closeButton.classList.add("fa", "fa-times");
    popupBox.appendChild(closeButton);

    closeButton.addEventListener("click", function (e) {
      e.target.parentElement.remove();
      document.querySelector(".popup-overlay").remove();
    });
  });
});
