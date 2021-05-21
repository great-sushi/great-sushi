class Background {
  constructor(src, width, height) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }
}

export default Background;
