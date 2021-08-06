import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import leftSheet from "../../../assets/image/sheet_left.png";
import useOrder from "../../../hooks/useOrder";

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
`;

const OrderText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.big};
  padding: 0 20px 20px 20px;
  text-align: center;
  line-height: 1.3;
`;

function Order() {
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  useOrder();

  return (
    <Wrapper>
      <OrderText>
        {`${sashimiOrder.name} 초밥 와사비 ${wasabiOrder}% 로 주세요`}
      </OrderText>
    </Wrapper>
  );
}

export default Order;
