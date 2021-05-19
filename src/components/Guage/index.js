import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const cx = 1040;
const cy = 23;

function drawGuage(ctx, percentage ){
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(cx, cy, 300, 20);
  ctx.fill();

  ctx.fillStyle = "red";
  ctx.fillRect(cx, cy, 300 * percentage / 100, 20);
  ctx.fill();
  ctx.fillText(percentage + "%", cx, cy);
}

function Guage() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const wasabi = useSelector((state) => state.sushi.wasabi);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.2;

    ctx.font = "24px verdana";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "gray";

    const update = () => {
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

      drawGuage(ctx, wasabi.size);
      animationRef.current = requestAnimationFrame(update);
    };

    const resize = () => {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight * 0.55;

      window.addEventListener("resize", resize);
    };

    update();
    resize();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [wasabi.size]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default React.memo(Guage);
