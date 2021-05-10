import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import plate from "../../asset/plate.png";
import rice from "../../asset/rice.png";
import salmon from "../../asset/salmon.png";
import tuna from "../../asset/tuna.png";
import wasabi from "../../asset/wasabi.png";
import { useDrag, DragPreviewImage, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_RICE,
  ADD_SASHIMI,
  ADD_WASABI,
  RESET_PLATE,
} from "../../constants";

const CookingTable = styled.div`
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  background-color: #af8264;
`;

const Wrapper = styled.div`

`;

const IngredientsContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 15px;
  border-radius: 8px;
  background-color: grey;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
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
    width: 60%;
  }
`;

const Plate = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  img {
    width: 400px;
    height: 200px;
  }
`;

const SushiContainer = styled.div`
  width: 350px;
  height: 400px;
  position: absolute;
  transform: translateX(-50%);
  bottom: 60%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  .rice {
    z-index: 3;
    position: absolute;
    bottom: 60px;
  }

  .wasabi_1 {
    z-index: 3;
    position: absolute;
    bottom: 150px;
  }

  .wasabi_2 {
    z-index: 3;
    position: absolute;
    bottom: 150px;
    left: 70px;
  }

  .wasabi_3 {
    z-index: 3;
    position: absolute;
    bottom: 150px;
    right: 70px;
  }

  .sashimi {
    z-index: 4;
    position: absolute;
    bottom: 140px;
  }
`;

const ingredientList = [
  {
    id: "tuna",
    kind: "sashimi",
    link: tuna,
  },
  {
    id: "salmon",
    kind: "sashimi",
    link: salmon,
  },
  {
    id: "rice",
    kind: "rice",
    link: rice,
  },
  {
    id: "wasabi",
    kind: "wasabi",
    link: wasabi,
  },
];

const Ingredients = ({ ingredient }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "SushiIngredients",
    item: {
      id: ingredient.id,
      kind: ingredient.kind,
      link: ingredient.link,
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
        className={ingredient.kind || ingredient.id}
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

const StackedWasabi = ({ wasabis }) => {
  return wasabis.map((wasabi) =>
    <img
      key={wasabi.count}
      className={wasabi.id + "_" + wasabi.count}
      src={wasabi.link}
      alt={wasabi.id}
    />
  );
};

let count = 0;

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

function Table() {
  const dispatch = useDispatch();
  const { rice, sashimi, wasabis } = useSelector(state => state.sushi);
  const box = useRef(null);

  useEffect(() => {
    const canvassss = box.current;
    const ctx = canvassss.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    const platePosition = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
      speed: 5,
      dx: 5,
    };

    const image = new Image();
    const riceImage = new Image();
    image.src = plate;
    riceImage.src = rice;
    image.onload = () => {
      ctx.drawImage(image, platePosition.x, platePosition.y, 400, 150);
    };

    // riceImage.onload = () => {
    //   ctx.drawImage(riceImage, platePosition.x, platePosition.y + 200, 400, 150);
    // };

    const setNewPosition = () => {
      platePosition.x -= platePosition.dx;
    };

    const update = () => {
      ctx.clearRect(platePosition.x, platePosition.y, canvassss.width, canvassss.height);
      ctx.drawImage(image, platePosition.x, platePosition.y, 400, 150);
      setNewPosition();
      requestAnimationFrame(update);

      if (platePosition.x + 400 === 0) {
        platePosition.x = ctx.canvas.width;

        const sashimi = randomSashimi();
        const wasabi = randomWasabiCount(0, 3);

        dispatch({ type: "ADD_ORDER", sashimi, wasabi });
      }
    };

    update();
  }, []);

  const [, drop] = useDrop({
    accept: "SushiIngredients",
    drop: (item) => {
      if (!rice.id && item.id === "rice") {
        count = 0;
        dispatch({ type: ADD_RICE, item });
      }

      if (rice.id && item.id !== "rice") {
        if (item.id === "wasabi") {
          count++;

          if (count < 4) {
            dispatch({ type: ADD_WASABI, item: { ...item, count } });
          }
        } else {
          if (sashimi.id) return;
          dispatch({ type: ADD_SASHIMI, item });
        }
      }
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: RESET_PLATE });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [sashimi.id]);

  return (
    <Wrapper>
      <canvas ref={box} />
      <SushiContainer ref={drop} >
        <StackedRice rice={rice} />
        <StackedSashimi sashimi={sashimi} />
        <StackedWasabi wasabis={wasabis} />
        {/* <Plate>
            <img src={plate} alt="plate" />
        </Plate> */}
      </SushiContainer>
      <IngredientsContainer>
        {renderIngredientList()}
      </IngredientsContainer>
    </Wrapper>
  );
}

export default Table;
