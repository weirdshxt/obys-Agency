let tl = gsap.timeline();

tl.from(".l-text h1", {
  y: 150,
  stagger: 0.2,
  duration: 0.6,
  delay: 0.5,
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

tl.to("#loader", {
  y:"-100%",
  duration: 0.4,
  delay: 3,
});

tl.from("#page1", {
  opacity: 0,
  duration: 0.4,
  delay: 0.2,
  ease: Power4,
});

tl.to("#loader", {
  display: "none",
});
