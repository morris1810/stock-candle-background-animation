import { Candle } from "./Candle.js";

export class CandleAnimation {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.candleArray = [];
    this.p = 0;
  }
  init() {
    this.candleArray.push(new Candle(this));
  }
  draw(context) {
    this.candleArray.forEach((rect) => {
      rect.draw(context);
    });
  }
  easeOut() {
    if (Math.floor(this.candleArray[0].opacity) > 0) {
      this.candleArray.shift();
      this.p -= 1;
    } else {
      this.candleArray[this.p].reverse = true;
      this.p += 1;
    }
  }
  update() {
    this.candleArray.forEach((rect) => {
      rect.update();
    });
  }
}
