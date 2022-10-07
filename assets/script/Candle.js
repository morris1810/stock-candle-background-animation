export class Candle {
  constructor(animate) {
    this.animate = animate;
    //Position
    this.x = this.animate.width * Math.random();
    this.y = this.animate.height * Math.random();
    //Size
    this.width = Math.random() * 10 + 10;
    this.height = Math.random() * 100;

    this.color = Math.random() >= 0.5 ? "red" : "green";

    // this.lineHeight = this.height + Math.random() * 50;
    // this.lineX = this.x + this.width / 2 - 1;
    // this.lineY = this.y - (this.lineHeight/2 - this.height/2) * Math.random();

    this.upLineHeight = Math.random() * 50;
    this.upLineX = this.x + this.width / 2 - 1;
    this.upLineY = this.y - this.upLineHeight;

    this.downLineHeight = Math.random() * 50;
    this.downLineX = this.x + this.width / 2 - 1;
    this.downLineY = this.y + this.height;

    this.speed = this.color == "red" ? Math.random() : -Math.random();

    this.opacity = 0;
    this.reverse = false;
  }

  draw(context) {
    this.reverse ? (this.opacity -= 0.01) : (this.opacity += 0.01);
    // context.setFillColor(this.color, this.opacity);
    if (this.color == "red") {
      this.rgbaCode = `rgba(255, 0, 0, ${this.opacity})`;
    } else if (this.color == "green") {
      this.rgbaCode = `rgba(0, 255, 0, ${this.opacity})`;
    }
    context.fillStyle = this.rgbaCode;

    context.fillRect(this.upLineX, this.upLineY, 2, this.upLineHeight);
    context.fillRect(this.downLineX, this.downLineY, 2, this.downLineHeight);
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += this.speed;
    this.upLineY += this.speed;
    this.downLineY += this.speed;
  }
}
