import { useEffect, useRef } from "react";

function useCanvas(widthRatio, heightRatio, draw, dependency) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio;

    let width = window.innerWidth * widthRatio;
    let height = window.innerHeight * heightRatio;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, height, width);
      animationRef.current = requestAnimationFrame(update);
    };

    const resize = () => {
      width = window.innerWidth * widthRatio;
      height = window.innerHeight * heightRatio;

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
  }, dependency);

  return canvasRef;
}

export default useCanvas;
