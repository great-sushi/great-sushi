import React, { useEffect, useRef } from "react";

const cx = 1050;
const cy = 80;

function drawGuage(ctx, percentage ){
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(cx, cy, 300, 20);
  ctx.fill();

  ctx.fillStyle = "red";
  ctx.fillRect(cx, cy, 300 * percentage / 100, 20);
  ctx.fill();
  ctx.fillText(percentage + "%", cx, cy);
}

function Guage({ percentage }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.2;

    ctx.font ="24px verdana";
    ctx.textAlign ="left";
    ctx.textBaseline ="bottom";
    ctx.fillStyle ="gray";

    const update = () => {
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

      drawGuage(ctx, percentage);
      requestAnimationFrame(update);
    };

    update();
  }, [percentage]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default Guage;
