import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  canvas {
    border-radius: 10px;
  }
`;


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function Net() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const fish = useSelector((state) => state.fishing.fish);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const changeFishCoordinate = () => {
    for (let i = 0; i < fish.length; i++) {
      fish[fish.length -1].x = getRandomInt(0, 200);
      fish[fish.length -1].y = getRandomInt(0, 100);
    }
  }

  const drawFish = (ctx) => {
    for (let i = 0; i < fish.length; i++) {
      fish[i].render(ctx);
    }
  };

  useEffect(() => {
    if (modal.isVisible) {
      dispatch({ type: "CLEAR_FISH" });
    }
  }, [modal.isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth * 0.2;
    ctx.canvas.height = window.innerHeight * 0.2;

    if (fish.length !== 0) {
      changeFishCoordinate();
    }

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawFish(ctx);
      animationRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [fish.length]);

  return (
    <Wrapper>
      <canvas ref={canvasRef}/>
    </Wrapper>
  );
}

export default Net;
