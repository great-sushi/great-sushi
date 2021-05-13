import React, { useEffect, useRef } from "react";
import Rectangle from "./Rail";

function RailZone() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.45;

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const rectangle = new Rectangle();
      rectangle.draw(ctx, 700, 200);
      requestAnimationFrame(update);
    }

    update();

    return () => cancelAnimationFrame(update);
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
    />
  );
}

export default RailZone;
