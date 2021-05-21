import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ADD_ORDER } from "../../constants";
import leftSheet from "../../assets/image/sheet_left.png";

const Wrapper = styled.div`
  position: absolute;
  border-radius: 8px;
  left: 24%;
  top: 5%;
  width: 300px;
  height: 200px;
  background-image: url(${leftSheet});
  background-size: cover;
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
    font-family: RixYeoljeongdo_Regular;
    padding: 0 20px 20px 20px;
    text-align: center;
    line-height: 1.3;
  }

  img {
    width: 40%
  }
`;

const SASHIMIS = [
  {
    id: "tuna",
    name: "참치",
  },
  {
    id: "salmon",
    name: "연어",
  },
  {
    id: "octopus",
    name: "문어",
  },
  {
    id: "eel",
    name: "장어",
  },
  {
    id: "shrimp",
    name: "새우",
  },
  {
    id: "egg",
    name: "계란",
  },
];

const randomWasabiSize = () => {
  return Math.floor(Math.random() * 11) * 10;
};

const randomSashimi = () => {
  const randomIndex = Math.floor(Math.random() * SASHIMIS.length);
  return SASHIMIS[randomIndex];
};

function Order() {
  const dispatch = useDispatch();
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { sashimi } = useSelector((state) => state.sushi);

  useEffect(() => {
    if (sashimi.id.length === 0) {
      const sashimi = randomSashimi();
      const wasabi = randomWasabiSize();

      dispatch({ type: ADD_ORDER, sashimi, wasabi });
    }
  }, [sashimi.id]);

  return (
    <Wrapper>
      <p>{`${sashimiOrder.name} 초밥 와사비 ${wasabiOrder}% 로 주세요`}</p>
    </Wrapper>
  );
}

export default Order;
