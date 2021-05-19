class Customer {
  constructor(src, column, row) {
    this.image = new Image();
    this.image.src = src;
    this.column = column;
    this.row = row;
    this.frameWidth = 159;
    this.frameHeight = 269;
    this.additoryWidth = 400;
    this.additoryHeight = 400;
  }

  draw(ctx) {
    if (ctx.canvas.width > 1440) {
      ctx.drawImage(
        this.image,
        this.column * this.frameWidth,
        this.row * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        ctx.canvas.width / 2 - this.frameWidth / 2 - this.additoryHeight / 2,
        ctx.canvas.height - this.frameHeight - this.additoryHeight,
        this.frameWidth + this.additoryWidth, this.frameHeight + this.additoryHeight
      );
    } else {
      ctx.drawImage(
        this.image,
        this.column * this.frameWidth,
        this.row * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        ctx.canvas.width / 2 - this.frameWidth / 2,
        ctx.canvas.height - this.frameHeight,
        this.frameWidth,
        this.frameHeight
      );
    }
  }
}

export default Customer;
