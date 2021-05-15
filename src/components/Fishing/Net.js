import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  canvas {
    border-radius: 10px;
  }
`;

function Net() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const update = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    update();
  }, []);

  return (
    <Wrapper>
      <canvas ref={canvasRef}/>
    </Wrapper>
  );
}

export default Net;
