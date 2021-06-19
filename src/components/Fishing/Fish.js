import { getRandomInt } from "../../utils";
import { FISH_IMAGE } from "../../constants/imageSetting";

class Fish {
  constructor(name, x, y, width, height, src, initDirection) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = src;
    this.velocity = 1;
    this.initDirection = initDirection;
  }

  render(ctx) {
    if (this.image.src) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  update(ctx, width, height) {
    if (this.initDirection === 0) {
      if (this.x < width) {
        if (this.name === "octopus") {
          this.image.src = FISH_IMAGE.octopus;
          this.x += 0.1;
        } else {
          this.image.src = FISH_IMAGE.RIGHT[this.name];
          this.x += this.velocity;
        }

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.initDirection = 1;

        if (this.name === "octopus") {
          this.y = height * 0.9;
        } else if (this.name === "eel") {
          this.y = getRandomInt(height * 0.4, height * 0.7);
        } else {
          this.y = getRandomInt(height * 0.2, height * 0.7);
        }
      }
    } else {
      if (this.x > - width * 0.1) {
        if (this.name === "octopus") {
          this.image.src = FISH_IMAGE.octopus;
          this.x -= 0.1;
        } else {
          this.image.src = FISH_IMAGE.LEFT[this.name];
          this.x -= this.velocity;
        }

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.initDirection = 0;

        if (this.name === "octopus") {
          this.y = height * 0.9;
        } else if (this.name === "eel") {
          this.y = getRandomInt(height * 0.4, height * 0.7);
        } else {
          this.y = getRandomInt(height * 0.2, height * 0.7);
        }
      }
    }
  }
}

export default Fish;
