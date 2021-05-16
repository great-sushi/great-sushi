import React from "react";
import styled from "styled-components";
import Table from "../Table";
import Timer from "../Timer";
import Order from "../Order";
import Evaluation from "../Evaluation";
import Revenue from "../Revenue";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function Game() {
  const { sashimiOrder } = useSelector((state) => state.order);
  return (
    <Wrapper>
      <Timer />
      <Revenue />
      <Order />
      {sashimiOrder.name.length && <Evaluation />}
      <Table />
    </Wrapper>
  );
}

export default Game;
