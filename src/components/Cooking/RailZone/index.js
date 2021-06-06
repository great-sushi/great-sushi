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
    const dpr = window.devicePixelRatio;

    let width = window.innerWidth;
    let height = window.innerHeight * 0.2;

    const rail = new Rail(startPoint, lowPoint, controlPoint, controlPointIn);

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rail.draw(ctx, height);
      animationRef.current = requestAnimationFrame(update);
    }

    const resize = () => {
      width = window.innerWidth;
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
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
    />
  );
}

export default React.memo(RailZone);
