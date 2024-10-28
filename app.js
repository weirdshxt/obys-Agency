function loaderAnimation() {
  let tl = gsap.timeline();

  tl.from(".l-text h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from(".l-msge p",{
    opacity:0,
    duration: 0.3,
  })

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

  tl.to("#loader", {
    y: "-100%",
    duration: 0.2,
    delay: 0.3,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from(".hero h1", {
    y: 120,
    stagger: 0.1,
  });
}

loaderAnimation();

document.addEventListener("mousemove", (dets) => {
  gsap.to(".cursor", {
    left: dets.x,
    top: dets.y,
  });
});

Shery.makeMagnet("#nav-option h4", {});

const h4Elements = document.querySelectorAll("#nav-option h4");
const cursor = document.querySelector(".cursor");

h4Elements.forEach((h4) => {
  h4.addEventListener("mouseenter", () => {
    console.log("kabir");
    cursor.setAttribute(
      "style",
      "width: 3.5vw; height: 3.5vw; position: fixed; background-color: black; border-radius: 50%; pointer-events: none; transition: width 0.3s ease, height 0.3s ease;"
    );
  });

  h4.addEventListener("mouseleave", () => {
    console.log("rima");
    cursor.setAttribute(
      "style",
      "width: 2.5vw; height: 2.5vw; position: fixed; background-color: black; border-radius: 50%; pointer-events: none; transition: width 0.3s ease, height 0.3s ease;"
    );
  });
});


