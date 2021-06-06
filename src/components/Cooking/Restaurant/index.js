import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import customerImage from "../../../assets/image/customer.png";
import backgroundImage from "../../../assets/image/background.jpg";
import Customer from "./Customer";
import styled from "styled-components";
import { getRandomInt } from "../../../utils";

const Wrapper = styled.div`
  canvas {
    background-image: url(${backgroundImage});
    background-size: cover;
  }
`;

const rows = [0, 1];
const columns = [0, 3, 6, 9];

function Restaurant() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);

  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);

  useEffect(() => {
    if (rice.id.length === 0) {
      setRow(() => rows[getRandomInt(0, 1)]);
      setColumn(() => columns[getRandomInt(0, 3)]);
      return;
    }

    if (sashimiOrder.id === sashimi.id && wasabiOrder === wasabi.size) {
      setColumn((column) => column);
      return;
    }

    if (sashimi.id.length && sashimiOrder.id !== sashimi.id) {
      setColumn(prev => prev + 2);
      return;
    }
    if (wasabiOrder < wasabi.size) {
      setColumn(prev => prev + 2);
    }
    if (rice.id.length && wasabiOrder > wasabi.size) {
      setColumn(prev => prev + 2);
    }
  }, [sashimi]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio;

    let width = window.innerWidth;
    let height = window.innerHeight * 0.55;

    const customer = new Customer(customerImage, column, row);

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      customer.draw(ctx, width, height);

      animationRef.current = requestAnimationFrame(update);
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight * 0.55;

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
  }, [column, row]);

  return (
    <Wrapper>
      <canvas
        id="canvas"
        ref={canvasRef}
      />
    </Wrapper>
  );
}

export default Restaurant;