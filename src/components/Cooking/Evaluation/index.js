import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import sheet from "../../../assets/image/sheet.png";
import useEvaluation from "../../../hooks/useEvaluation";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  right: 24%;
  top: 5%;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 200px;
  background-image: url(${sheet});
  background-size: cover;
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.big};
  padding: 0 20px 20px 20px;
  text-align: center;
  line-height: 1.3;
`;

function Evaluation() {
  const order = useSelector((state) => state.order);
  const sushi = useSelector((state) => state.sushi);
  const evaluation = useEvaluation(order, sushi);

  return (
    <Wrapper>
      <Content>
        {evaluation}
      </Content>
    </Wrapper>
  );
}

export default Evaluation;
