import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import netImage from "../../assets/image/net.png";
import { clearNet } from "../../actions/fishing";
import { getRandomInt } from "../../utils";

const Wrapper = styled.div`
  canvas {
    border-radius: 10px;
  }
`;

function Net() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const fish = useSelector((state) => state.fishing.fish);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const changeFishCoordinate = (width, height) => {
    for (let i = 0; i < fish.length; i++) {
      fish[fish.length -1].x = getRandomInt(width * 0.2, width / 2);
      fish[fish.length -1].y = getRandomInt(height / 2, height * 0.8);
    }
  }

  const drawFish = (ctx) => {
    for (let i = 0; i < fish.length; i++) {
      fish[i].render(ctx);
    }
  };

  useEffect(() => {
    if (modal.isVisible) {
      dispatch(clearNet());
    }
  }, [modal.isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio;

    let width = window.innerWidth * 0.2;
    let height = window.innerHeight * 0.2;

    if (fish.length !== 0) {
      changeFishCoordinate(width, height);
    }

    const net = new Image();
    net.src = netImage;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(net, 0, 0, width, height);
      drawFish(ctx);
      animationRef.current = requestAnimationFrame(update);
    };

    const resize = () => {
      width = window.innerWidth * 0.2;
      height = window.innerHeight * 0.2;

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
  }, [fish.length]);

  return (
    <Wrapper>
      <canvas
        id="canvas"
        ref={canvasRef}
      />
    </Wrapper>
  );
}

export default Net;
