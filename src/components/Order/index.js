import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ADD_ORDER } from "../../constants";
import salmon from "../../asset/salmon.png";
import tuna from "../../asset/tuna.png";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  left: 30px;
  top: 40px;
  width: 200px;
  height: 100px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  p {
    font-size: 20px;
  }

  img {
    width: 40%
  }
`;

const SASHIMIS = [
  {
    name: "tuna",
    link: tuna,
  },
  {
    name: "salmon",
    link: salmon,
  },
];

const randomWasabiCount = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
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
      const wasabi = randomWasabiCount(0, 3);

      dispatch({ type: ADD_ORDER, sashimi, wasabi });
    }
  }, [sashimi.id]);

  return (
    <Wrapper>
      <img
        src={sashimiOrder.link}
        alt={sashimiOrder.name}
      />
      <p>{`와사비 ${wasabiOrder}`}</p>
    </Wrapper>
  );
}

export default Order;
