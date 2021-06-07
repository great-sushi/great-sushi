import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import netImage from "../../assets/image/net.png";
import { clearNet } from "../../actions/fishing";
import { getRandomInt } from "../../utils";
import useCanvas from "../../hooks/useCanvas";

const Wrapper = styled.div`
  canvas {
    border-radius: 10px;
    background-image: url(${netImage});
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
`;

function Net() {
  const fish = useSelector((state) => state.fishing.fish);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const changeFishCoordinate = (width, height) => {
    for (let i = 0; i < fish.length; i++) {
      fish[fish.length -1].x = getRandomInt(width * 0.2, width / 2);
      fish[fish.length -1].y = getRandomInt(height / 2, height * 0.8);
    }
  };

  const drawFish = (ctx) => {
    for (let i = 0; i < fish.length; i++) {
      fish[i].render(ctx);
    }
  };

  const canvasRef = useCanvas(0.2, 0.2, drawFish, [fish.length]);

  useEffect(() => {
    if (modal.isVisible) {
      dispatch(clearNet());
    }
  }, [modal.isVisible]);

  useEffect(() => {
    if (fish.length !== 0) {
      changeFishCoordinate(window.innerWidth * 0.2, window.innerHeight * 0.2);
    }
  }, [fish.length]);

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
