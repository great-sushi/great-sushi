import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import plate from "../../asset/plate.png";
import riceImage from "../../asset/rice.png";
import salmonImage from "../../asset/salmon.png";
import tunaImage from "../../asset/tuna.png";
import wasabiImage from "../../asset/wasabi.png";
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
  width: 100%;
  position: absolute;
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
  left: 60%;
  bottom: 50%;
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
    link: tunaImage,
  },
  {
    id: "salmon",
    kind: "sashimi",
    link: salmonImage,
  },
  {
    id: "rice",
    kind: "rice",
    link: riceImage,
  },
  {
    id: "wasabi",
    kind: "wasabi",
    link: wasabiImage,
  },
];

const Ingredients = ({ ingredient }) => {
  const [, drag, preview] = useDrag({
    type: "SushiIngredients",
    item: {
      id: ingredient.id,
      kind: ingredient.kind,
      link: ingredient.link,
    },
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

let count = 0;

const SASHIMIS = [
  {
    name: "tuna",
    link: tunaImage,
  },
  {
    name: "salmon",
    link: salmonImage,
  },
];

const randomWasabiCount = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};

const randomSashimi = () => {
  const randomIndex = Math.floor(Math.random() * SASHIMIS.length);
  return SASHIMIS[randomIndex];
};

const platePosition = {
  x: window.innerWidth,
  y: window.innerHeight / 2,
  speed: 1,
  dx: 5,
};

function Table() {
  const dispatch = useDispatch();
  const { rice, sashimi } = useSelector(state => state.sushi);
  const ref = useRef(null);

  useEffect(() => {
    const canvassss = ref.current;
    const ctx = canvassss.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    const image = new Image();
    const riceImages = new Image();
    const wasabiImages = new Image();
    const salmonImages = new Image();

    image.src = plate;
    riceImages.src = riceImage;
    wasabiImages.src = wasabiImage;
    salmonImages.src = salmonImage;


    image.onload = () => {
      ctx.drawImage(image, platePosition.x + 20, platePosition.y - 90, 350, 150);
    }

    const update = () => {
      ctx.clearRect(0, 0, canvassss.width, canvassss.height);

      ctx.drawImage(image, platePosition.x, platePosition.y, 400, 150);
      ctx.drawImage(riceImages, platePosition.x + 20, platePosition.y - 30, 350, 150);
      ctx.drawImage(salmonImages, platePosition.x + 20, platePosition.y - 100, 350, 150);

      requestAnimationFrame(update);

      platePosition.x -= platePosition.speed;

      if (platePosition.x + 400 === 0) {
        platePosition.x = ctx.canvas.width;

        const sashimi = randomSashimi();
        const wasabi = randomWasabiCount(0, 3);

        dispatch({ type: "ADD_ORDER", sashimi, wasabi });
        dispatch({ type: RESET_PLATE });
      }
    };

    update();
  }, []);

  const [, drop] = useDrop({
    accept: "SushiIngredients",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();

      if (!rice.id && item.id === "rice") {
        count = 0;
        dispatch({ type: ADD_RICE, item: { ...item, offset } });
      }

      if (rice.id && item.id !== "rice") {
        if (item.id === "wasabi") {
          count++;

          if (count < 4) {
            dispatch({ type: ADD_WASABI, item: { ...item, count, offset } });
          }
        } else {
          if (sashimi.id) return;
          dispatch({ type: ADD_SASHIMI, item: { ...item, offset }  });
        }
      }
    }
  });

  return (
    <Wrapper ref={drop}>
      <canvas ref={ref}></canvas>
      <IngredientsContainer>
        {renderIngredientList()}
      </IngredientsContainer>
    </Wrapper>
  );
}

export default Table;
