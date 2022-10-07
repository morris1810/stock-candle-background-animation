import { CandleAnimation } from "./CandleAnimation.js";


window.addEventListener("load", function () {
  // const hexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
  
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  mainCanvas.height = window.innerHeight;
  mainCanvas.width = window.innerWidth;

  const maxCandle = Math.floor(window.innerWidth/40);


  let count = 1;

  const cAnimate = new CandleAnimation(
    this.window.innerWidth,
    this.window.innerHeight
  );

  for (let i = 0; i < maxCandle; i++) {
    cAnimate.init();
  }

  function animate() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    count += 1;
    cAnimate.draw(mainCtx);
    cAnimate.update();

    if (count % 200 == 0) {
      cAnimate.init();
      cAnimate.easeOut();
    }

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000 / 60);
  }
  animate();
});