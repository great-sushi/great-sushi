import React, { useEffect, useRef} from "react";
import Fish from "./Fish";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const fishes = [];

const createFish = (ctx) => {
  fishes.push(new Fish(getRandomInt(100, 200), getRandomInt(50, 100), "red", 30, 30));

  for (let i = 0; i < 20; i++) {
    fishes.push(new Fish(getRandomInt(-10, 1200), getRandomInt(100, 390), "blue", 30, 30));
  }

  for (let i = 0; i < fishes.length; i++) {
    fishes[i].render(ctx);
  }
};

let fishingLine;
let isHookCreated = false;
let intervalId;
let caughtFish;
let caughtFishIndex;

const createFishingLine = (e) => {
  if (!isHookCreated) {
    fishingLine = {
      startX: 550,
      startY: 0,
      endX: e.nativeEvent.offsetX,
      endY: e.nativeEvent.offsetY,
      color: "grey",
    }
  }
};

const drawFishingLine = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(fishingLine.startX, fishingLine.startY);
  ctx.lineTo(fishingLine.endX, fishingLine.endY);
  ctx.closePath();
  ctx.strokeStyle = fishingLine.color;
  ctx.stroke();
  ctx.beginPath();
};

const createHookStartPosition = (e) => {
  isHookCreated = true;
  fishingLine.endX = e.nativeEvent.offsetX;
  fishingLine.endY = e.nativeEvent.offsetY;
  intervalId = setInterval(() => {
    decreaseHookPosition(fishingLine.endX, fishingLine.endY, fishingLine.startX, fishingLine.startY);
  }, 100);
}

const decreaseHookPosition = (currentX, currentY, endX, endY, ctx) => {
  const xDecrement = 10;
  const yDecrement = 10;

  if (currentY < 20) {
    isHookCreated = false;
    fishes.splice(caughtFishIndex, 1);
  } else {
    if (currentX === endX) {
      fishingLine.endY -= yDecrement;
    }

    if (currentX > endX) {
      fishingLine.endX -= xDecrement;
      fishingLine.endY -= yDecrement;
    } else {
      fishingLine.endX += xDecrement;
      fishingLine.endY -= yDecrement;
    }
  }
};

const catchFish = (ctx) => {
  caughtFish.y = fishingLine.endY - 4;
  caughtFish.x = fishingLine.endX - 4;
  caughtFish.render(ctx);
};

const detectClick = () => {
  for (let i = 0; i < fishes.length; i++) {
    if (fishingLine.endX > fishes[i].x
      && fishingLine.endX < fishes[i].x + fishes[i].width
      && fishingLine.endY > fishes[i].y - fishes[i].height
      && fishingLine.endY < fishes[i].y
    ) {
      caughtFish = fishes[i];
      caughtFishIndex = i;
    }
  }
};

function Box() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth * 0.8;
    ctx.canvas.height = window.innerHeight * 0.75;

    createFish(ctx);

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "skyblue";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (fishingLine && fishingLine.endY > 20) {
        drawFishingLine(ctx);
      }

      if (!isHookCreated) {
        clearInterval(intervalId);
      }

      if (isHookCreated) {
        detectClick();
        if (caughtFish) {
          catchFish(ctx);
        } else {
          caughtFish = null;
          caughtFishIndex = null;
        }
      }

      for (let i = 0; i < fishes.length; i++) {
        fishes[i].update(ctx);
      }

      animationRef.current = requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseMove={createFishingLine}
      onClick={createHookStartPosition}
    />
  );
}

export default Box;
