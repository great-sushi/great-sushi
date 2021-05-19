class Hook {
  constructor(x, y, width, height, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = src;
  }

  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Hook;
