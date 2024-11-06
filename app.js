function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" flagent since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveScroll();

function loaderAnimation() {
  let tl = gsap.timeline();

  tl.from(".l-text h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from(".l-msge p", {
    opacity: 0,
    duration: 0.3,
  });

  tl.from("#l-count", {
    opacity: 0,
    onStart: () => {
      let h5timer = document.querySelector("#l-count h5");
      let grow = 0;

      setInterval(() => {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 25);
    },
  });

  tl.to(".l-text h1, #l-count, .l-msge p", {
    opacity: 0,
    stagger: 0.1,
    delay: 2.3,
  });

  tl.to(
    "#loader",
    {
      y: "-100%",
      duration: 0.5,
      delay: 0.3,
    },
    "-=1.5"
  );

  tl.from(
    ".firsth1, #page2",
    {
      opacity: 0,
    },
    "-=1"
  );

  tl.from(
    ".hero h1",
    {
      y: 100,
      duration: 0.4,
      stagger: 0.1,
    },
    "-=1.2"
  );

  tl.to("#loader", {
    display: "none",
  });
}
loaderAnimation();

document.addEventListener("mousemove", (dets) => {
  gsap.to(".cursor", {
    left: dets.x,
    top: dets.y,
  });
});

function flagAnimation() {
  let flag = document.querySelector(".flag h1");

  flag.addEventListener("mousemove", (event) => {
    gsap.to(".flag img", {
      left: event.clientX - 180,
      top: event.clientY - 125,
      opacity: 0.7,
    });
  });
  flag.addEventListener("mouseleave", () => {
    gsap.to(".flag img", {
      opacity: 0,
    });
  });
}
flagAnimation();

function videoPlayer() {
  let vCursor = document.querySelector("#v-container");
  const video = document.querySelector("#v-container video");
  const vContainer = document.querySelector("#v-container");
  const page2 = document.querySelector("#page2");

  vContainer.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#v-cursor"
      ).innerHTML = `<i class="ri-pause-fill"></i>`;
      gsap.to("#v-cursor", {
        scale: 0.5,
      });
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#v-cursor"
      ).innerHTML = `<i class="ri-play-large-fill"></i>`;
      gsap.to("#v-cursor", {
        scale: 1,
      });
    }
  });

  page2.addEventListener("mouseleave", () => {
    video.pause();
    video.style.opacity = 0;
  });

  vCursor.addEventListener("mousemove", (event) => {
    gsap.to("#v-cursor", {
      left: event.clientX - 400,
      top: event.clientY - 250,
    });
    gsap.to(".cursor", {
      opacity: 0,
    });
  });
  vCursor.addEventListener("mouseleave", () => {
    gsap.to("#v-cursor", {
      left: "70%",
      top: "-0%",
    });
    gsap.to(".cursor", {
      opacity: 1,
    });
  });
}
videoPlayer();

Shery.makeMagnet("#nav-option h4", {});

const h4Elements = document.querySelectorAll("#nav-option h4");
const h6Elements = document.querySelectorAll(".h-effect h6");
const cursor = document.querySelector(".cursor");

const cursorStyles = {
  default:
    "width: 2.5vw; height: 2.5vw; position: fixed; background-color: black; border-radius: 50%; pointer-events: none; transition: width 0.3s ease, height 0.3s ease;",
  hover:
    "width: 3.5vw; height: 3.5vw; position: fixed; background-color: black; border-radius: 50%; pointer-events: none; transition: width 0.3s ease, height 0.3s ease;",
};

const handleMouseEnter = () => {
  cursor.setAttribute("style", cursorStyles.hover);
};

const handleMouseLeave = () => {
  cursor.setAttribute("style", cursorStyles.default);
};

h4Elements.forEach((h4) => {
  h4.addEventListener("mouseenter", handleMouseEnter);
  h4.addEventListener("mouseleave", handleMouseLeave);
});

h6Elements.forEach((h6) => {
  h6.addEventListener("mouseenter", handleMouseEnter);
  h6.addEventListener("mouseleave", handleMouseLeave);
});

function fHoverEffect() {
  document.querySelectorAll(".h-effect").forEach((hEffect) => {
    const items = hEffect.querySelectorAll(".social-item");

    hEffect.addEventListener("mouseenter", () => {
      items[0].style.transform = "translateY(-20px)"; // Move up
      items[0].style.opacity = "0"; // Fade out
      items[1].style.transform = "translateY(0)"; // Move down
      items[1].style.opacity = "1"; // Fade in
    });

    hEffect.addEventListener("mouseleave", () => {
      items[0].style.transform = "translateY(0)"; // Reset position
      items[0].style.opacity = "1"; // Fade in
      items[1].style.transform = "translateY(40px)"; // Reset position
      items[1].style.opacity = "0"; // Fade out
    });
  });
}
fHoverEffect();

function sheryAnimation() {
  Shery.imageEffect(".img", {
    style: 5,
    config: {
      a: { value: 1.37, range: [0, 30] },
      b: { value: 0.48, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8214264416529342 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 9.98, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.18, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.31, range: [0, 10] },
      metaball: { value: 0.46, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}
sheryAnimation();

function projectsTextAnime() {
  const projects = document.querySelectorAll(".projects");
  projects.forEach((hEffect) => {
    const items = hEffect.querySelectorAll(".projects .p-effect h2");

    hEffect.addEventListener("mouseenter", () => {
      handleMouseEnter();
      items[0].style.transform = "translateY(-20px)"; // Move up
      items[0].style.opacity = "0"; // Fade out
      items[1].style.transform = "translateY(0)"; // Move down
      items[1].style.opacity = "1"; // Fade in
    });

    hEffect.addEventListener("mouseleave", () => {
      handleMouseLeave();
      items[0].style.transform = "translateY(0)"; // Reset position
      items[0].style.opacity = "1"; // Fade in
      items[1].style.transform = "translateY(40px)"; // Reset position
      items[1].style.opacity = "0"; // Fade out
    });
  });
}
projectsTextAnime();

function footerAnimation() {
  var clutter = "";
  var clutter2 = "";
  document
    .querySelector(".f-text .f-text1")
    .textContent.split("")
    .forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
  document.querySelector(".f-text .f-text1").innerHTML = clutter;
  document
    .querySelector(".f-text .f-text2")
    .textContent.split("")
    .forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`;
    });
  document.querySelector(".f-text .f-text2").innerHTML = clutter2;

  document.querySelector(".f-text").addEventListener("mouseenter", function () {
    gsap.to(".f-text1 span", {
      opacity: 0,
      stagger: 0.05,
    });
    gsap.to(".f-text2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.1,
    });
    gsap.to("#footer svg", {
      left: "10%",
      duration: 0.5,
      delay: 1.4,
    });
  });
  document.querySelector(".f-text").addEventListener("mouseleave", function () {
    gsap.to(".f-text1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,
    });
    gsap.to(".f-text2 span", {
      opacity: 0,
      stagger: 0.05,
    });
    gsap.to("#footer svg", {
      left: "2%",
      duration: 0.4,
      delay: 1.3,
    });
  });
}

footerAnimation();
