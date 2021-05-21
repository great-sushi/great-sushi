import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import plate from "../../assets/image/plate.png";
import rice from "../../assets/image/rice.png";
import salmon from "../../assets/image/salmon.png";
import tuna from "../../assets/image/tuna.png";
import octopus from "../../assets/image/octopus.png";
import eel from "../../assets/image/eel.png";
import egg from "../../assets/image/egg.png";
import shrimp from "../../assets/image/shrimp.png";
import wasabiImage from "../../assets/image/wasabi.png";
import { useDrag, DragPreviewImage, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_RICE,
  ADD_SASHIMI,
  ADD_WASABI,
  RESET_PLATE,
} from "../../constants";
import RailZone from "../RailZone";
import Gauge from "../Gauge";
import useAudio from "../../hook/useAudio";

const CookingTable = styled.div`
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #af8264;
`;

const IngredientsContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: #576574;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  max-width: max-content;
`;

const Item = styled.div`
  width: 120px;
  cursor: grab;
  background-color: white;
  border-radius: 10px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    cursor: grabbing;
  }

  img {
    width: 100%;
    padding: 8px;
  }

  .wasabi {
    width: 80%;
    cursor: pointer;
  }
`;

const Plate = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  img {
    width: 400px;
    height: 200px;
    filter: brightness(0.8);
  }
`;

const SushiContainer = styled.div`
  width: 350px;
  height: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 29vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  .rice {
    z-index: 3;
    position: absolute;
    bottom: 60px;
  }

  .wasabi {
    z-index: 3;
    position: absolute;
    bottom: 150px;
    width: ${(props) => props.percentage * 1.5}px;
  }

  .sashimi {
    z-index: 4;
    position: absolute;
    bottom: 140px;
  }
`;

const pulse = keyframes`
  from {
    transform: scale(1.5);
  }
  to {
    transform: scale(1);
  }
`;

const Guide = styled.div`
  width: 50%;
  height: 100%;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  p {
    font-family: "RixYeoljeongdo_Regular";
    font-size: 30px;
    padding: 10px;
  }

  .pulse {
    animation: ${pulse} 0.5s ease-out infinite;
  }
`;

const IngredientsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;;
  flex-direction: column;
`;

const GaugeContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
  }
`;

const WasabiContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  height: auto;
`;

const ingredientList = [
  {
    id: "tuna",
    kind: "sashimi",
    link: tuna,
    price: 1000,
  },
  {
    id: "salmon",
    kind: "sashimi",
    link: salmon,
    price: 800,
  },
  {
    id: "octopus",
    kind: "sashimi",
    link: octopus,
    price: 600,
  },
  {
    id: "shrimp",
    kind: "sashimi",
    link: shrimp,
    price: 700,
  },
  {
    id: "eel",
    kind: "sashimi",
    link: eel,
    price: 1200,
  },
  {
    id: "egg",
    kind: "sashimi",
    link: egg,
    price: 500,
  },
  {
    id: "rice",
    kind: "rice",
    link: rice,
    price: null,
  },
];

const Ingredients = ({ ingredient }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "SushiIngredients",
    item: {
      id: ingredient.id,
      kind: ingredient.kind,
      link: ingredient.link,
      price: ingredient.price,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  });

  return (
    <Item key={ingredient.id}>
      <DragPreviewImage
        connect={preview}
        src={ingredient.link}
      />
      <img
        className={ingredient.kind}
        ref={drag}
        src={ingredient.link}
        alt={ingredient.id}
      />
    </Item>
  );
};

const renderIngredientList = () => {
  return ingredientList.map(ingredient => (
    <Ingredients
      key={ingredient.id}
      ingredient={ingredient}
    />
  ));
};

const StackedRice = ({ rice }) => {
  return (
    <img
      key={rice.id}
      className={rice.kind}
      src={rice.link}
      alt={rice.id}
    />
  );
}

const StackedSashimi = ({ sashimi }) => {
  return (
    <img
      key={sashimi.id}
      className={sashimi.kind}
      src={sashimi.link}
      alt={sashimi.id}
    />
  );
};

const StackedWasabi = ({ wasabi }) => {
  return (
    <img
      key={wasabi.count}
      className={wasabi.id}
      src={wasabi.link}
      alt={wasabi.id}
    />
  );
};

function Table() {
  const dispatch = useDispatch();
  const { rice, sashimi, wasabi } = useSelector(state => state.sushi);
  const wasabiOrder = useSelector(state => state.order.wasabiOrder);
  const [percentage, setPercentage] = useState(0);
  const [, { playAudio }] = useAudio("drop");

  const [, drop] = useDrop({
    accept: "SushiIngredients",
    drop: (item) => {
      playAudio();

      if (!rice.id && item.id === "rice") {
        dispatch({ type: ADD_RICE, item });
      }

      if (rice.id && item.id !== "rice") {
        if (sashimi.id) return;
        dispatch({ type: ADD_SASHIMI, item });
      }
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (sashimi.id) {
        dispatch({ type: RESET_PLATE });
        setPercentage(0);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [sashimi.id]);

  const updatePercentage = () => {
    if (!rice.id) return;

    if (percentage < 100) {
      if (percentage === 0) {
        dispatch({
          type: ADD_WASABI,
          item: { id: "wasabi", kink: "wasabi", link: wasabiImage }
        });
      }

      setPercentage((prev) => prev + 10);
    }
  }

  useEffect(() => {
    dispatch({ type: "ADD_WASABI_SIZE", size: percentage });
  }, [percentage]);

  return (
    <CookingTable>
      <RailZone />
      <SushiContainer ref={drop} percentage={percentage} >
        <StackedRice rice={rice} />
        <StackedSashimi sashimi={sashimi} />
        <StackedWasabi wasabi={wasabi} />
        <Plate>
          <img src={plate} alt="plate" draggable="false" />
        </Plate>
      </SushiContainer>
      <IngredientsWrapper>
        <GaugeContainer>
          <Gauge percentage={percentage} />
          <WasabiContainer>
            <Item className="wasabi-item">
              <img
                className="wasabi"
                src={wasabiImage}
                alt="wasabi"
                onClick={updatePercentage}
                draggable="false"
              />
            </Item>
            {rice.id && wasabiOrder !== 0
            && (
              <Guide>
                <p className="pulse">←클릭!</p>
              </Guide>
            )}
          </WasabiContainer>
        </GaugeContainer>
        <IngredientsContainer>
          {renderIngredientList()}
        </IngredientsContainer>
      </IngredientsWrapper>
    </CookingTable>
  );
}

export default Table;
