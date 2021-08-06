import React from "react";

import styled from "styled-components";

import netImage from "../../../assets/image/net.png";
import useCanvas from "../../../hooks/useCanvas";
import useNet from "../../../hooks/useNet";

const Wrapper = styled.div`
  canvas {
    border-radius: 10px;
    background-image: url(${netImage});
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
`;

function Net() {
  const { drawFish, fish } = useNet();
  const canvasRef = useCanvas(0.2, 0.2, drawFish, [fish.length]);

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
