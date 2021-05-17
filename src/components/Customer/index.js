import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import customerImage from "../../asset/customer.png";
import sheetImage from "../../asset/sheet.png";
import leftSheetImage from "../../asset/sheet_left.png";
import backgroundImage from "../../asset/background.jpg";
import {
  ADD_ORDER,
  GOOD,
  WRONG_SUHSI,
  SPICY,
  BLAND,
} from "../../constants";
import salmon from "../../asset/salmon.png";
import tuna from "../../asset/tuna.png";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rows = [0, 1];
const columns = [0, 3, 6, 9];

const SASHIMIS = [
  {
    id: "tuna",
    name: "참치",
    link: tuna,
  },
  {
    id: "salmon",
    name: "연어",
    link: salmon,
  },
];

const randomWasabiSize = () => {
  return Math.floor(Math.random() * 11) * 10;
};

const randomSashimi = () => {
  const randomIndex = Math.floor(Math.random() * SASHIMIS.length);
  return SASHIMIS[randomIndex];
};

function Customer() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);

  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [evaluation, setEvaluation] = useState("");

  useEffect(() => {
    if (sashimi.id.length === 0) {
      const sashimi = randomSashimi();
      const wasabi = randomWasabiSize();
      dispatch({ type: ADD_ORDER, sashimi, wasabi });
    }
  }, [sashimi.id]);

  useEffect(() => {
    if (rice.id.length === 0) {
      setEvaluation("");
      setRow(() => rows[getRandomInt(0, 1)]);
      setColumn(() => columns[getRandomInt(0, 3)]);
      return;
    }

    if (sashimiOrder.id === sashimi.id && wasabiOrder === wasabi.size) {
      setColumn(column);
      setEvaluation(GOOD);
      return;
    }

    if (sashimi.id.length && sashimiOrder.id !== sashimi.id) {
      setColumn((prev) => prev + 2);
      setEvaluation(WRONG_SUHSI);
      return;
    }
    if (wasabiOrder < wasabi.size) {
      setColumn((prev) => prev + 2);
      setEvaluation(SPICY);
    }
    if (rice.id.length && wasabiOrder > wasabi.size) {
      setColumn((prev) => prev + 2);
      setEvaluation(BLAND);
    }
  }, [sashimi]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.55;

    ctx.fillStyle = "black";
    ctx.textAlign ="center";
    ctx.textBaseline ="bottom";
    ctx.font ="24px RixYeoljeongdo_Regular";

    const image = new Image();
    const sheet = new Image();
    const leftSheet = new Image();
    const background = new Image();

    image.src = customerImage;
    sheet.src = sheetImage;
    leftSheet.src = leftSheetImage;
    background.src = backgroundImage;

    const frameWidth = 159;
    const frameHeight = 269;
    // 627, 219

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(background, 0, 0, ctx.canvas.width, 600);
      ctx.drawImage(image, column * frameWidth, row * frameHeight, frameWidth, frameHeight, ctx.canvas.width * 0.44, ctx.canvas.height * 0.39, frameWidth, frameHeight);

      if (sashimiOrder.name) {
        ctx.drawImage(leftSheet, ctx.canvas.width * 0.2, ctx.canvas.height * 0.2, 350, 150);
        ctx.fillText(`${sashimiOrder.name}초밥 와사비 ${wasabiOrder}% 로요`, ctx.canvas.width * 0.32, ctx.canvas.height * 0.35);
      }

      if (evaluation) {
        ctx.drawImage(sheet, ctx.canvas.width * 0.55, ctx.canvas.height * 0.2, 300, 150);
        ctx.fillText(evaluation, ctx.canvas.width * 0.65, ctx.canvas.height * 0.37);
      }

      animationRef.current = requestAnimationFrame(update);
    }

    update();

    return () => cancelAnimationFrame(animationRef.current);
  }, [column, evaluation, row, sashimiOrder.name, wasabiOrder]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default Customer;
