import tunaLeft from "../../asset/tuna_fishing_left.png";
import tunaRight from "../../asset/tuna_fishing.png";
import salmonLeft from "../../asset/salmon_fishing_left.png";
import salmonRight from "../../asset/salmon_fishing.png";
import eelLeft from "../../asset/eel_fishing_left.png";
import eelRight from "../../asset/eel_fishing.png";
import octopus from "../../asset/octopus_fishing.png";
import shrimpLeft from "../../asset/shrimp_fishing_left.png";
import shrimpRight from "../../asset/shrimp_fishing.png";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

class Fish {
  constructor(x, y, width, height, src) {
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

  update(ctx) {
    if (this.initDirection === 0) {
      if (this.x < 1000) {
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
          this.y = 500;
        } else if (this.width === 90) {
          this.y = getRandomInt(300, 450);
        } else {
          this.y = getRandomInt(100, 450);
        }
      }
    } else {
      if (this.x > -50) {
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
          this.y = 500;
        } else if (this.width === 90) {
          this.y = getRandomInt(300, 450);
        } else {
          this.y = getRandomInt(100, 450);
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
