import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  GOOD,
  WRONG_SUHSI,
  SPICY,
  BLAND,
} from "../../../constants";
import sheet from "../../../assets/image/sheet.png";
import useAudio from "../../../hooks/useAudio";

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
  font-size: 30px;
  padding: 0 20px 20px 20px;
  text-align: center;
  line-height: 1.3;
`;

function Evaluation() {
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);

  const [evaluation, setEvaluation] = useState("");
  const [, { playAudio, toggleAudio }] = useAudio("coughing");

  useEffect(() => {
    if (rice.id.length === 0) {
      setEvaluation("");
      toggleAudio();
      return;
    }

    if (sashimiOrder.id === sashimi.id
        && wasabiOrder === wasabi.size
      ) {
      setEvaluation(GOOD);
      return;
    }

    if (sashimiOrder.id !== sashimi.id) {
      setEvaluation(WRONG_SUHSI);
      return;
    }

    if (wasabiOrder < wasabi.size) {
      setEvaluation(SPICY);
      playAudio();
    }

    if (wasabiOrder > wasabi.size) {
      setEvaluation(BLAND);
    }
  }, []);

  return (
    <Wrapper>
      <Content>
        {evaluation}
      </Content>
    </Wrapper>
  );
}

export default Evaluation;
