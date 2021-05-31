import tunaLeft from "../../assets/image/tuna_fishing_left.png";
import tunaRight from "../../assets/image/tuna_fishing.png";
import salmonLeft from "../../assets/image/salmon_fishing_left.png";
import salmonRight from "../../assets/image/salmon_fishing.png";
import eelLeft from "../../assets/image/eel_fishing_left.png";
import eelRight from "../../assets/image/eel_fishing.png";
import octopus from "../../assets/image/octopus_fishing.png";
import shrimpLeft from "../../assets/image/shrimp_fishing_left.png";
import shrimpRight from "../../assets/image/shrimp_fishing.png";
import { getRandomInt } from "../../utils";

class Fish {
  constructor(name, x, y, width, height, src) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = src;
    this.velocity = Math.random() - 0.5;
    this.initDirection = 0;
  }

  render(ctx) {
    if (this.image.src) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  update(ctx, width, height) {
    if (this.initDirection === 0) {
      if (this.x < width) {
        if (this.width !== 80) {
          this.x++;
        }

        if (this.width === 100) {
          this.image.src = tunaRight;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 120) {
          this.image.src = salmonRight;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 90) {
          this.image.src = eelRight;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 80) {
          this.image.src = octopus;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 50) {
          this.image.src = shrimpRight;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
      } else {
        this.initDirection = 1;

        if (this.width === 80) {
          this.y = height * 0.9;
        } else if (this.width === 90) {
          this.y = getRandomInt(height * 0.4, height * 0.7);
        } else {
          this.y = getRandomInt(height * 0.2, height * 0.7);
        }
      }
    } else {
      if (this.x > - width * 0.1) {
        if (this.x !== 80) {
          this.x--;
        }
        if (this.width === 100) {
          this.image.src = tunaLeft;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 120) {
          this.image.src = salmonLeft;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 90) {
          this.image.src = eelLeft;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 80) {
          this.image.src = octopus;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        if (this.width === 50) {
          this.image.src = shrimpLeft;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
      } else {
        this.initDirection = 0;

        if (this.width === 80) {
          this.y = height * 0.9;
        } else if (this.width === 90) {
          this.y = getRandomInt(height * 0.4, height * 0.7);
        } else {
          this.y = getRandomInt(height * 0.2, height * 0.7);
        }
      }
    }

    if (this.width !== 80) {
      this.x += this.velocity;
    } else {
      this.x += 0.1;
    }
  }
}

export default Fish;
