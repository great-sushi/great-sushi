import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { PLUS_MONEY, MINUS_MONEY } from "../../constants";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  right: 30px;
  top: 160px;
  width: 200px;
  height: 100px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  p {
    font-size: 40px;
  }
`;

function Revenue() {
  const dispatch = useDispatch();
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabis } = useSelector((state) => state.sushi);
  const { money } = useSelector((state) => state.revenue);

  useEffect(() => {
    if (rice.id.length !== 0 && sashimiOrder.name === sashimi.id && wasabiOrder === wasabis.length) {
      dispatch({ type: PLUS_MONEY, money: 1000 });
      return;
    }

    if (sashimi.id.length && sashimiOrder.name !== sashimi.id) {
      dispatch({ type: MINUS_MONEY, money: 1000 });
      return;
    }
    if (wasabiOrder < wasabis.length) {
      dispatch({ type: MINUS_MONEY, money: 500 });
    }
    if (rice.id.length && wasabiOrder > wasabis.length) {
      dispatch({ type: MINUS_MONEY, money: 500 });
    }
  }, [sashimi]);

  return (
    <Wrapper>
      <h1>수익금</h1>
      <p>{money}</p>
    </Wrapper>
  );
}

export default Revenue;
