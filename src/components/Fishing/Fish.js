const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

class Fish {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color
    this.width = width;
    this.height = height;
    this.velocity = Math.random() - 0.5;
    this.initDirection = 0;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ctx) {
    if (this.initDirection === 0) {
      if (this.x < 1200) {
        this.x++;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      } else {
        this.initDirection = 1;
        this.y = getRandomInt(-10, 800);
      }
    } else {
      if (this.x > -50) {
        this.x--;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      } else {
        this.initDirection = 0;
        this.y = getRandomInt(10, 800);
      }
    }

    this.x += this.velocity;
  }
}

export default Fish;
