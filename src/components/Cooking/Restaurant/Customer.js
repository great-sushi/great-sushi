class Customer {
  constructor(src, column, row) {
    this.image = new Image();
    this.image.src = src;
    this.column = column;
    this.row = row;
    this.frameWidth = 159;
    this.frameHeight = 269;
    this.additoryWidth = 200;
    this.additoryHeight = 200;
  }

  draw(ctx, width, height) {
    if (width > 1440) {
      ctx.drawImage(
        this.image,
        this.column * this.frameWidth,
        this.row * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        width / 2 - this.frameWidth / 2 - this.additoryWidth / 2,
        height - this.frameHeight - this.additoryHeight,
        this.frameWidth + this.additoryWidth,
        this.frameHeight + this.additoryHeight
      );
    } else {
      ctx.drawImage(
        this.image,
        this.column * this.frameWidth,
        this.row * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        width / 2 - this.frameWidth / 2 - this.additoryWidth / 8,
        height - this.frameHeight - this.additoryHeight / 4,
        this.frameWidth + this.additoryWidth / 4,
        this.frameHeight + this.additoryHeight / 4
      );
    }
  }
}

export default Customer;
