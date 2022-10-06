window.addEventListener("load", function(){
    const mainCanvas = document.getElementById("mainCanvas");
    mainCanvas.height = this.window.innerHeight;
    mainCanvas.width = this.window.innerWidth;

    const mainCtx = mainCanvas.getContext('2d');

    const hexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
    const colorList = ["red", "green"];

    let count = 1;

    console.log(mainCtx);

    class Rect{
        constructor(effect) {
            this.effect = effect;
            //Position
            this.x = this.effect.width * Math.random();
            this.y = this.effect.height * Math.random();
            //Size
            this.width = Math.random() * 10 + 10;
            this.height = Math.random() * 100;


            this.color = colorList[Math.random() >= 0.5 ? 1 : 0];


            // this.lineHeight = this.height + Math.random() * 50;
            // this.lineX = this.x + this.width / 2 - 1;
            // this.lineY = this.y - (this.lineHeight/2 - this.height/2) * Math.random();
            
            this.upLineHeight = Math.random() * 50;
            this.upLineX = this.x + this.width / 2 - 1;
            this.upLineY = this.y - this.upLineHeight;

            this.downLineHeight = Math.random() * 50;
            this.downLineX = this.x + this.width / 2 - 1;
            this.downLineY = this.y + this.height;

            this.speed = this.color == "red" ?  Math.random() : -Math.random();

            this.opacity = 0;
            this.reverse = false;
        }

        draw(context) {
            this.reverse ? this.opacity -= 0.01 : this.opacity += 0.01;
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

    class Effect{
        constructor(width, height) {
            this.width = width;
            this.height = height;

            this.rectArray = [];
            this.p = 0;
        }
        init() {
            this.rectArray.push(new Rect(this));
        }
        draw(context) {
            this.rectArray.forEach(rect => {rect.draw(context)});
        }
        easeOut() {
            if (Math.floor(this.rectArray[0].opacity) > 0) {
                this.rectArray.shift();
                this.p -=1;
            } else {
                this.rectArray[this.p].reverse = true;
                this.p += 1;
            }
        }
        update() {
            this.rectArray.forEach(rect => {rect.update()});
        }
    }

    const eff = new Effect(this.window.innerWidth, this.window.innerHeight);
    for (let i = 0; i < 70; i++) {
        eff.init();
    }

    function animate() {
        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        count += 1;
        eff.draw(mainCtx);
        eff.update();

        if (count % 20 == 0) {
            eff.init();
            eff.easeOut();
        }

        setTimeout(() => {
            requestAnimationFrame(animate);
        },  1000/60);
    }
    animate();
})
