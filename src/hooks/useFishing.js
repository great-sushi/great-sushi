import { useRef } from "react";
import { useDispatch } from "react-redux";

import Fish from "../components/Fishing/Fish";
import Hook from "../components/Fishing/Hook";

import { getRandomInt } from "../utils";
import eel from "../assets/image/eel_fishing.png";
import hookImage from "../assets/image/hook.png";
import octopus from "../assets/image/octopus_fishing.png";
import salmon from "../assets/image/salmon_fishing.png";
import shrimp from "../assets/image/shrimp_fishing.png";
import tuna from "../assets/image/tuna_fishing.png";

import { updateCaughtFish } from "../actions/fishing";

function useFishing() {
  const dispatch = useDispatch();
  const fishesRef = useRef();
  const fishingLineRef = useRef();
  const isHookCreatedRef = useRef();
  const intervalIdRef = useRef();
  const caughtFishRef = useRef();
  const caughtFishIndexRef = useRef();
  const hookRef = useRef();

  fishesRef.current = [];

  const createFish = (width, height) => {
    for (let i = 0; i < 6; i++) {
      fishesRef.current.push(
        new Fish(
          "tuna",
          getRandomInt(0, width / 2),
          getRandomInt(height * 0.2, height * 0.7),
          100,
          30,
          tuna,
          getRandomInt(0, 1)
        ));
      fishesRef.current.push(
        new Fish(
          "salmon",
          getRandomInt(width / 2, width),
          getRandomInt(height * 0.2, height * 0.7),
          120,
          30,
          salmon,
          getRandomInt(0, 1)
        ));
      fishesRef.current.push(
        new Fish(
          "eel",
          getRandomInt(0, width),
          getRandomInt(height * 0.4, height * 0.7),
          90,
          30,
          eel,
          getRandomInt(0, 1)
        ));
    }

    for (let i = 0; i < 4; i++) {
      fishesRef.current.push(
        new Fish(
          "octopus",
          getRandomInt(-10, width),
          height * 0.9,
          80,
          40,
          octopus,
          getRandomInt(0, 1)
        ));
    }

    for (let i = 0; i < 10; i++) {
      fishesRef.current.push(
        new Fish(
          "shrimp",
          getRandomInt(-10, width),
          getRandomInt(height * 0.2, height * 0.7),
          50,
          30,
          shrimp,
          getRandomInt(0, 1)
        ));
    }
  };

  const createFishingLine = (e) => {
    if (!isHookCreatedRef.current) {
      fishingLineRef.current = {
        startX: 550,
        startY: 0,
        endX: e.nativeEvent.offsetX,
        endY: e.nativeEvent.offsetY,
        color: "grey",
      }
    }

    hookRef.current = new Hook(
      fishingLineRef.current.endX - 1,
      fishingLineRef.current.endY,
      15,
      20,
      hookImage
    );
  };

  const drawFishingLine = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(fishingLineRef.current.startX, fishingLineRef.current.startY);
    ctx.lineTo(fishingLineRef.current.endX, fishingLineRef.current.endY);
    ctx.closePath();
    ctx.strokeStyle = fishingLineRef.current.color;
    ctx.stroke();
    ctx.beginPath();

    hookRef.current.render(ctx);
  };

  const catchFish = (ctx) => {
    caughtFishRef.current.y = fishingLineRef.current.endY - 10;
    caughtFishRef.current.x = fishingLineRef.current.endX - 10;
    caughtFishRef.current.render(ctx);
  };

  const detectClick = () => {
    for (let i = 0; i < fishesRef.current.length; i++) {
      if (fishingLineRef.current.endX > fishesRef.current[i].x
        && fishingLineRef.current.endX < fishesRef.current[i].x + fishesRef.current[i].width
        && fishingLineRef.current.endY > fishesRef.current[i].y - fishesRef.current[i].height
        && fishingLineRef.current.endY < fishesRef.current[i].y
        && !caughtFishRef.current
      ) {
        caughtFishRef.current = fishesRef.current[i];
        caughtFishIndexRef.current = i;
      }
    }
  };

  const removeCaughtFish = () => {
    fishesRef.current.splice(caughtFishIndexRef.current, 1);
  };

  const decreaseHookPosition = (currentX, currentY, endX) => {
    const xDecrement = 10;
    const yDecrement = 10;
    const isTouchedSurface = currentY < 20;

    if (isTouchedSurface) {
      isHookCreatedRef.current = false;

      if (caughtFishRef.current) {
        removeCaughtFish();
        dispatch(updateCaughtFish(caughtFishRef.current));
        caughtFishRef.current = null;
        caughtFishIndexRef.current = null;
      }
    } else {
      if (currentX === endX) {
        fishingLineRef.current.endY -= yDecrement;
      }

      if (currentX > endX) {
        fishingLineRef.current.endX -= xDecrement;
        fishingLineRef.current.endY -= yDecrement;
      } else {
        fishingLineRef.current.endX += xDecrement;
        fishingLineRef.current.endY -= yDecrement;
      }

      hookRef.current.x = fishingLineRef.current.endX;
      hookRef.current.y = fishingLineRef.current.endY - 10;
    }
  };

  const createHookStartPosition = (e) => {
    if (isHookCreatedRef.current) {
      return;
    }

    isHookCreatedRef.current = true;

    fishingLineRef.current.endX = e.nativeEvent.offsetX;
    fishingLineRef.current.endY = e.nativeEvent.offsetY;

    intervalIdRef.current = setInterval(() => {
      decreaseHookPosition(
        fishingLineRef.current.endX,
        fishingLineRef.current.endY,
        fishingLineRef.current.startX
      );
    }, 100);
  };

  const draw = (ctx, height, width) => {
    if (fishingLineRef.current && fishingLineRef.current.endY > 20) {
      drawFishingLine(ctx);
    }

    if (!isHookCreatedRef.current) {
      clearInterval(intervalIdRef.current);
    }

    if (isHookCreatedRef.current) {
      detectClick();
      if (caughtFishRef.current) {
        catchFish(ctx);
        hookRef.current.render(ctx);
      }
    }

    for (let i = 0; i < fishesRef.current.length; i++) {
      fishesRef.current[i].update(ctx, width, height);
    }
  };

  return { createFish, createFishingLine, createHookStartPosition, draw };
}

export default useFishing;
