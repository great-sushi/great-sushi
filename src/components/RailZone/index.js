import React, { useEffect, useRef } from "react";
import Rail from "./Rail";

let startPoint = 0;
let lowPoint= 100;
let controlPoint = 50;
let controlPointIn = -50;

function RailZone() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.2;

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const rail = new Rail(startPoint, lowPoint, controlPoint, controlPointIn);
      rail.draw(ctx);
      animationRef.current = requestAnimationFrame(update);
    }

    update();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
    />
  );
}

export default RailZone;
