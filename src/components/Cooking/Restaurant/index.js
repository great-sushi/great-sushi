import React from "react";

import styled from "styled-components";

import backgroundImage from "../../../assets/image/background.jpg";
import useCanvas from "../../../hooks/useCanvas";
import useCustomer from "../../../hooks/useCustomer";

const Wrapper = styled.div`
  canvas {
    background-image: url(${backgroundImage});
    background-size: cover;
  }
`;

function Restaurant() {
  const { row, column, draw } = useCustomer();
  const canvasRef = useCanvas(1, 0.55, draw, [column, row]);

  return (
    <Wrapper>
      <canvas
        id="canvas"
        ref={canvasRef}
      />
    </Wrapper>
  );
}

export default React.memo(Restaurant);
