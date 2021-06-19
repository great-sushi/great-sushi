import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import leftSheet from "../../../assets/image/sheet_left.png";
import { updateOrder } from "../../../actions/cooking";
import { getRandomInt } from "../../../utils";
import { MENUS } from "../../../constants/image";

const Wrapper = styled.div`
  position: absolute;
  border-radius: 8px;
  left: 24%;
  top: 5%;
  width: 300px;
  height: 200px;
  background-image: url(${leftSheet});
  background-size: cover;
  filter: sepia(100%) hue-rotate(30deg) saturate(700%);
  display: flex;
  align-items: center;
  justify-content: center;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  p {
    font-size: 30px;
    padding: 0 20px 20px 20px;
    text-align: center;
    line-height: 1.3;
  }
`;

const Text = styled.p`
  font-size: 30px;
  padding: 0 20px 20px 20px;
  text-align: center;
  line-height: 1.3;
`;

function Order() {
  const dispatch = useDispatch();
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { sashimi } = useSelector((state) => state.sushi);

  useEffect(() => {
    if (sashimi.id.length === 0) {
      const randomIndex = getRandomInt(0, MENUS.length - 1);
      const sashimi = MENUS[randomIndex];
      const wasabi = getRandomInt(0, 10) * 10;

      dispatch(updateOrder({ sashimi, wasabi }));
    }
  }, [sashimi.id]);

  return (
    <Wrapper>
      <Text>{`${sashimiOrder.name} 초밥 와사비 ${wasabiOrder}% 로 주세요`}</Text>
    </Wrapper>
  );
}

export default Order;
