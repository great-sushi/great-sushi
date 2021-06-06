import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Fish from "./Fish";
import Hook from "./Hook";
import tuna from "../../assets/image/tuna_fishing.png";
import salmon from "../../assets/image/salmon_fishing.png";
import ocean from "../../assets/image/ocean.jpg";
import eel from "../../assets/image/eel_fishing.png";
import octopus from "../../assets/image/octopus_fishing.png";
import shrimp from "../../assets/image/shrimp_fishing.png";
import hookImage from "../../assets/image/hook.png";
import { updateCaughtFish, updateRequest } from "../../actions/fishing";
import { getRandomInt } from "../../utils";

const Wrapper = styled.div`
  canvas {
    background-image: url(${ocean});
    background-size: cover;
    background-position: bottom;
  }
`;

let fishes;

const createFish = (ctx, width, height) => {
  for (let i = 0; i < 6; i++) {
    fishes.push(new Fish("tuna", getRandomInt(0, width / 2), getRandomInt(height * 0.2, height * 0.7), 100, 30, tuna));
    fishes.push(new Fish("salmon", getRandomInt(width / 2, width), getRandomInt(height * 0.2, height * 0.7), 120, 30, salmon));
    fishes.push(new Fish("eel", getRandomInt(0, width), getRandomInt(height * 0.4, height * 0.7), 90, 30, eel));
  }

  for (let i = 0; i < 4; i++) {
    fishes.push(new Fish("octopus", getRandomInt(-10, width), height * 0.9, 80, 40, octopus));
  }

  for (let i = 0; i < 10; i++) {
    fishes.push(new Fish("shrimp", getRandomInt(-10, width), getRandomInt(height * 0.2, height * 0.7), 50, 30, shrimp));
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
let hook;

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

  hook = new Hook(fishingLine.endX - 1, fishingLine.endY, 15, 20, hookImage);
};

const drawFishingLine = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(fishingLine.startX, fishingLine.startY);
  ctx.lineTo(fishingLine.endX, fishingLine.endY);
  ctx.closePath();
  ctx.strokeStyle = fishingLine.color;
  ctx.stroke();
  ctx.beginPath();

  hook.render(ctx);
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
  const modal = useSelector((state) => state.modal);
  fishes = [];

  const decreaseHookPosition = (currentX, currentY, endX) => {
    const xDecrement = 10;
    const yDecrement = 10;

    if (currentY < 20) {
      isHookCreated = false;
      if (caughtFish) {
        fishes.splice(caughtFishIndex, 1);
        dispatch(updateCaughtFish(caughtFish));
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

      hook.x = fishingLine.endX;
      hook.y = fishingLine.endY - 10;
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
    const dpr = window.devicePixelRatio;

    let width = window.innerWidth * 0.7;
    let height = window.innerHeight * 0.7;

    createFish(ctx, width, height);

    dispatch(updateRequest({
      tuna: getRandomInt(1, 5),
      salmon: getRandomInt(1, 5),
      eel: getRandomInt(1, 5),
      shrimp: getRandomInt(1, 5),
      octopus: getRandomInt(1, 3),
    }));

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
          hook.render(ctx);
        }
      }

      for (let i = 0; i < fishes.length; i++) {
        fishes[i].update(ctx, width, height);
      }

      animationRef.current = requestAnimationFrame(update);
    }

    const resize = () => {
      width = window.innerWidth * 0.7;
      height = window.innerHeight * 0.7;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);

      window.addEventListener("resize", resize);
    };

    update();
    resize();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [modal.isVisible]);

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
