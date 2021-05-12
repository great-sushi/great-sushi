let startPoint = 50;
let lowPoint= 150;
let controlPoint = 90

class Rail {
  constructor() {
    this.speed = 0.5;
  }

  draw(ctx) {
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = "#c0ab5f";
      ctx.beginPath();
      ctx.moveTo(startPoint + 100 * i, 0);
      ctx.lineTo(lowPoint+ 100 * i, 0);
      ctx.stroke();
      ctx.quadraticCurveTo(controlPoint + 100 * i, 40, lowPoint+ 100 * i, 120);
      ctx.stroke();
      ctx.lineTo(startPoint + 100 * i, 120);
      ctx.stroke();
      ctx.quadraticCurveTo(90 * i, 40, startPoint + 100 * i, 0);
      ctx.stroke();
      ctx.fill();
    }
  }
}

export default Rail;
