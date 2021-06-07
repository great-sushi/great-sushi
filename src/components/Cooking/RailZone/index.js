import React from "react";
import Rail from "./Rail";
import useCanvas from "../../../hooks/useCanvas";

let startPoint = 0;
let lowPoint= 100;
let controlPoint = 50;
let controlPointIn = -50;

function RailZone() {
  const rail = new Rail(startPoint, lowPoint, controlPoint, controlPointIn);
  const draw = (ctx, height) => {
    rail.draw(ctx, height);
  }
  const canvasRef = useCanvas(1, 0.2, draw);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
    />
  );
}

export default React.memo(RailZone);
