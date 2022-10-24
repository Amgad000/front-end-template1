// the scroll up button
let scrollTopBtn = document.querySelector("button.scrolling");
window.addEventListener("scroll", function () {
  if (this.scrollY >= this.innerHeight * 2) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// the customizing options
let gearBtn = document.querySelector(".customize i");
gearBtn.onclick = function () {
  this.classList.toggle("fa-spin");
  this.parentElement.parentElement.classList.toggle("show");
};
// [1] changeing colors
// >>> looking in local storage for selected color?
let colorSpans = document.querySelectorAll(".customize .colors span");

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );

  colorSpans.forEach((item) => {
    item.classList.remove("active");
  });

  document
    .querySelector(`[data-color="${localStorage.getItem("color")}"]`)
    .classList.add("active");
}

colorSpans.forEach((span) => {
  span.addEventListener("click", function () {
    //[1] add color to :root
    document.documentElement.style.setProperty(
      "--main-color",
      span.dataset.color
    );
    //[2] add color to local storage
    localStorage.setItem("color", span.dataset.color);
    //[3] add class active to color span
    colorSpans.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});
// [2] alter backgrounds

let landingPage = document.querySelector(".landing");
let yesBtn = document.querySelector(".backgrounds button:nth-of-type(1)");
let noBtn = document.querySelector(".backgrounds button:nth-of-type(2)");

let imgurls = [
  "imgs/background-1.jpg",
  "imgs/background-2.jpg",
  "imgs/background-3.jpg",
  "imgs/background-4.jpg",
];
let changer;
let duration = 5000;

if (localStorage.getItem("background")) {
  landingPage.style.backgroundImage = localStorage.getItem("background");
}
if (localStorage.getItem("back-button") == "yes") {
  yesBtn.classList.add("on");
  if (noBtn.classList.contains("on")) {
    noBtn.classList.remove("on");
  }

  clearInterval(changer);
  changer = setInterval(() => {
    let random = Math.floor(Math.random() * imgurls.length);
    landingPage.style.backgroundImage = `url(${imgurls[random]})`;
  }, duration);
} else {
  noBtn.classList.add("on");
  if (yesBtn.classList.contains("on")) {
    yesBtn.classList.remove("on");
  }
  localStorage.setItem("back-button", "no");
}

yesBtn.onclick = function () {
  clearInterval(changer);
  changer = setInterval(() => {
    let random = Math.floor(Math.random() * imgurls.length);
    landingPage.style.backgroundImage = `url(${imgurls[random]})`;
  }, duration);

  yesBtn.classList.add("on");
  if (noBtn.classList.contains("on")) {
    noBtn.classList.remove("on");
  }
  localStorage.setItem("back-button", "yes");
};

noBtn.onclick = function () {
  clearInterval(changer);
  localStorage.setItem("background", landingPage.style.backgroundImage);

  noBtn.classList.add("on");
  if (yesBtn.classList.contains("on")) {
    yesBtn.classList.remove("on");
  }
  localStorage.setItem("back-button", "no");
};

// showing the navigation spans or not
let navSpansCont = document.querySelector(".nav-spans");
let navSpans = document.querySelectorAll(".nav-spans span");
let navYes = document.querySelector(".nav-bullets button:nth-of-type(1)");
let navNo = document.querySelector(".nav-bullets button:nth-of-type(2)");

if (localStorage.getItem("nav") == "yes") {
  navSpansCont.classList.add("in");
  navYes.classList.add("on");
} else {
  navSpansCont.classList.remove("in");
  navNo.classList.add("on");
}

navYes.addEventListener("click", function () {
  navSpansCont.classList.add("in");
  this.classList.add("on");
  if (navNo.classList.contains("on")) {
    navNo.classList.remove("on");
  }
  localStorage.setItem("nav", "yes");
});
navNo.addEventListener("click", function () {
  navSpansCont.classList.remove("in");
  this.classList.add("on");
  if (navYes.classList.contains("on")) {
    navYes.classList.remove("on");
  }
  localStorage.setItem("nav", "no");
});

navSpans.forEach((span) => {
  span.onclick = function () {
    document.querySelector(`.${span.dataset.section}`).scrollIntoView({
      behavior: "smooth",
    });
  };
});

document.querySelector(".customize .reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// End customizing options

// landing page >> show menu in small screens
let barBtn = document.querySelector(".landing .icon i");
let menuUl = document.querySelector(".landing ul");

barBtn.onclick = function () {
  this.classList.toggle("clicked");
  menuUl.classList.toggle("opacity");
};
// [End] landing page >> show menu in small screens

/*
clicking at any point in landing page >> remove any shown bar
*/
menuUl.onclick = function (e) {
  e.stopPropagation();
  // to avoid closing menu by clicking on li
};
landingPage.addEventListener("click", function (e) {
  if (e.target == barBtn || e.target == menuUl) {
    console.log("not the one");
  } else {
    menuUl.classList.remove("opacity");
    if (barBtn.classList.contains("clicked")) {
      barBtn.classList.remove("clicked");
    }

    gearBtn.parentElement.parentElement.classList.remove("show");
    if (gearBtn.classList.contains("fa-spin")) {
      gearBtn.classList.remove("fa-spin");
    }
  }
});

// the skills section
let skillSection = document.querySelector(".skills");
let skillSpans = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = function () {
  let sectionOffsetT = skillSection.offsetTop;
  let sectionHeignt = skillSection.offsetHeight * 0.8;
  // decreas this parameter (sectionHeight) to start earlier bu(* .8)
  let windowHeiht = this.innerHeight;
  let windowScroll = this.scrollY;

  if (windowScroll > sectionOffsetT + sectionHeignt - windowHeiht) {
    skillSpans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};
// End the skills section

// popup of Gallary setion
let gallaryimgs = document.querySelectorAll(".gallary .images img");
gallaryimgs.forEach((img) => {
  img.addEventListener("click", function () {
    let layout = document.createElement("div");
    layout.className = "popup-layout";
    document.body.append(layout);

    let popup = document.createElement("div");
    popup.className = "popup";
    document.body.append(popup);

    if (img.alt != "") {
      let title = document.createElement("h3");
      title.innerHTML = img.alt;
      popup.append(title);
    }

    let image = document.createElement("img");
    image.src = img.src;
    popup.append(image);

    let xBtn = document.createElement("button");
    xBtn.textContent = "x";
    popup.append(xBtn);
  });
});

// >>> closing the popup
document.addEventListener("click", function (e) {
  if (e.target.parentElement.classList.contains("popup")) {
    e.target.parentElement.remove();
    document.querySelector(".popup-layout").remove();
  }
});
// End popup of Gallary setion

// putting year in the footer
let copyRight = document.querySelector(".footer .year span");
let copyDate = new Date();
copyRight.innerHTML = `${copyDate.getFullYear()}`;
