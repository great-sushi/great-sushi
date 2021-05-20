import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import netImage from "../../assets/image/net.png";

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

  const changeFishCoordinate = (ctx) => {
    for (let i = 0; i < fish.length; i++) {
      fish[fish.length -1].x = getRandomInt(ctx.canvas.width * 0.2, ctx.canvas.width / 2);
      fish[fish.length -1].y = getRandomInt(ctx.canvas.height / 2, ctx.canvas.height * 0.8);
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
    ctx.canvas.width = document.body.clientWidth * 0.2;
    ctx.canvas.height = document.body.clientHeight * 0.2;

    if (fish.length !== 0) {
      changeFishCoordinate(ctx);
    }

    const net = new Image();
    net.src = netImage;

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(net, 0, 0, ctx.canvas.width, ctx.canvas.height);
      drawFish(ctx);
      animationRef.current = requestAnimationFrame(update);
    };

    const resize = () => {
      ctx.canvas.width = window.innerWidth * 0.2;
      ctx.canvas.height = window.innerHeight * 0.2;

      window.addEventListener("resize", resize);
    };

    update();
    resize();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [fish.length]);

  return (
    <Wrapper>
      <canvas ref={canvasRef}/>
    </Wrapper>
  );
}

export default Net;
