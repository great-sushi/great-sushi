let x = 0;

class Rail {
  constructor(startPoint, lowPoint, controlPoint, controlPointIn) {
    this.startPoint = startPoint;
    this.lowPoint = lowPoint;
    this.controlPoint = controlPoint;
    this.controlPointIn = controlPointIn;
    this.speed = 1.5;
  }

  moveRail() {
    x -= this.speed;

    if (x <= -199) {
      x = 0;
    }
  }

  draw(ctx, height) {
    ctx.setTransform(2, 0, 0, 2, x, 0);
    ctx.beginPath();

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = "#c0ab5f";
      ctx.moveTo(this.startPoint + 100 * i, 0);
      ctx.lineTo(this.lowPoint + 100 * i, 0);
      ctx.quadraticCurveTo(this.controlPoint + 100 * i, 40, this.lowPoint + 100 * i, height);
      ctx.lineTo(this.startPoint + 100 * i, height);
      ctx.quadraticCurveTo(this.controlPointIn + 100 * i, 40, this.startPoint + 100 * i, 0);
      ctx.fill();
      ctx.stroke();
    }

    this.moveRail();
  }
}

export default Rail;
