import React, { useEffect, useRef, useState} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Fish from "./Fish";
import tuna from "../../asset/tuna_fishing.png";
import salmon from "../../asset/salmon_fishing.png";
import ocean from "../../asset/ocean.jpg";
import eel from "../../asset/eel_fishing.png";
import octopus from "../../asset/octopus_fishing.png";
import shrimp from "../../asset/shrimp_fishing.png";

const Wrapper = styled.div`
  canvas {
    border-radius: 10px;
    background-image: url(${ocean});
    background-size: cover;
    background-position: bottom;
  }
`;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

let fishes;

const createFish = (ctx) => {
  for (let i = 0; i < 6; i++) {
    fishes.push(new Fish("tuna", getRandomInt(-10, 1000), getRandomInt(100, 450), 100, 30, tuna));
    fishes.push(new Fish("salmon", getRandomInt(-10, 1000), getRandomInt(100, 450), 120, 30, salmon));
    fishes.push(new Fish("eel", getRandomInt(-10, 1000), getRandomInt(300, 450), 90, 30, eel));
  }

  for (let i = 0; i < 4; i++) {
    fishes.push(new Fish("octopus", getRandomInt(-10, 1000), 500, 80, 40, octopus));
  }

  for (let i = 0; i < 10; i++) {
    fishes.push(new Fish("shrimp", getRandomInt(-10, 1000), getRandomInt(100, 450), 50, 30, shrimp));
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

const catchFish = (ctx) => {
  caughtFish.y = fishingLine.endY - 10;
  caughtFish.x = fishingLine.endX - 10;
  caughtFish.render(ctx);
};

const detectClick = () => {
  for (let i = 0; i < fishes.length; i++) {
    if (fishingLine.endX > fishes[i].x
      && fishingLine.endX < fishes[i].x + fishes[i].width
      && fishingLine.endY > fishes[i].y - fishes[i].height
      && fishingLine.endY < fishes[i].y
      && !caughtFish
    ) {
      caughtFish = fishes[i];
      caughtFishIndex = i;
    }
  }
};

function Box() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dispatch = useDispatch();
  fishes = [];

  const decreaseHookPosition = (currentX, currentY, endX, endY, ctx) => {
    const xDecrement = 10;
    const yDecrement = 10;

    if (currentY < 20) {
      isHookCreated = false;
      if (caughtFish) {
        fishes.splice(caughtFishIndex, 1);
        // setCaughtFishes((prev) => [...prev, caughtFish]);
        dispatch({ type: "CATCH_FISH", fish: caughtFish });
        caughtFish = null;
        caughtFishIndex = null;
      }
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

  const createHookStartPosition = (e) => {
    if (isHookCreated) {
      return;
    }

    isHookCreated = true;

    fishingLine.endX = e.nativeEvent.offsetX;
    fishingLine.endY = e.nativeEvent.offsetY;
    intervalId = setInterval(() => {
      decreaseHookPosition(fishingLine.endX, fishingLine.endY, fishingLine.startX, fishingLine.startY);
    }, 100);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth * 0.7;
    ctx.canvas.height = window.innerHeight * 0.7;

    createFish(ctx);

    dispatch({
      type: "UPDATE_REQUEST",
      request: {
        tuna: getRandomInt(1, 5),
        salmon: getRandomInt(1, 5),
        eel: getRandomInt(1, 5),
        shrimp: getRandomInt(1, 5),
        octopus: getRandomInt(1, 3),
      }
    });

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
    <Wrapper>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseMove={createFishingLine}
        onClick={createHookStartPosition}
      />
    </Wrapper>
  );
}

export default Box;
