import React, { useEffect, useRef} from "react";
import Fish from "./Fish";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const fishes = [];

const createFish = (ctx) => {
  fishes.push(new Fish(getRandomInt(100, 200), getRandomInt(50, 100), "red", 10, 10));

  for (let i = 0; i < 20; i++) {
    fishes.push(new Fish(getRandomInt(-10, 1200), getRandomInt(100, 390), "blue", 10, 10));
  }

  for (let i = 0; i < fishes.length; i++) {
    fishes[i].render(ctx);
  }
}

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

      for (let i = 0; i < fishes.length; i++) {
        fishes[i].update(ctx);
      }

      animationRef.current = requestAnimationFrame(update);
    }

    update();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
    />
  );
}

export default Box;
