let startPoint = 50;
let lowPoint= 150;
let controlPoint = 100;
let x = 0;

class Rail {
  constructor() {
    this.speed = 0.5;
  }

  draw(ctx) {
    ctx.setTransform(1, 0, 0, 1, x, 0);


    for (let i = 0; i < 15; i++) {
      ctx.fillStyle = "#c0ab5f";
      ctx.beginPath();
      ctx.moveTo(startPoint + 100 * i, 0);
      ctx.lineTo(lowPoint + 100 * i, 0);
      ctx.quadraticCurveTo(controlPoint + 100 * i, 40, lowPoint + 100 * i, 120);
      ctx.lineTo(startPoint + 100 * i, 120);
      ctx.stroke();
      ctx.quadraticCurveTo(controlPoint * i, 40, startPoint + 100 * i, 0);
      ctx.stroke();
      ctx.fill();
    }

    x -= this.speed;
  }
}

export default Rail;
