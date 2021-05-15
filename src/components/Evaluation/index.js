import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  GOOD,
  WRONG_SUHSI,
  SPICY,
  BLAND,
} from "../../constants";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  left: 0;
  right: 0;
  top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 100px;
  background-color: white;

  p {
    font-size: 20px;
  }
`;

function Evaluation() {
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabis } = useSelector((state) => state.sushi);

  const [evaluation, setEvaluation] = useState("");

  useEffect(() => {
    if (rice.id.length === 0) {
      setEvaluation("");
    }

    if (sashimiOrder.name === sashimi.id && wasabiOrder === wasabis.length) {
      setEvaluation(GOOD);
      return;
    }

    if (sashimi.id.length && sashimiOrder.name !== sashimi.id) {
      setEvaluation(WRONG_SUHSI);
      return;
    }
    if (wasabiOrder < wasabis.length) {
      setEvaluation(SPICY);
    }
    if (rice.id.length && wasabiOrder > wasabis.length) {
      setEvaluation(BLAND);
    }
  }, [sashimi]);

  return (
    <Wrapper>
      <p>{evaluation}</p>
    </Wrapper>
  );
}

export default Evaluation;
