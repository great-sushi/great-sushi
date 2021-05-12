import React, { useEffect } from "react";
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
  left: 50%;
  transform: translateX(-50%);
  bottom: 60%;
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

function Table() {
  const dispatch = useDispatch();
  const { rice, sashimi, wasabis } = useSelector(state => state.sushi);

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
    }, 500);

    return () => clearTimeout(timeout);
  }, [sashimi.id]);

  return (
    <CookingTable>
      <SushiContainer ref={drop} >
        <StackedRice rice={rice} />
        <StackedSashimi sashimi={sashimi} />
        <StackedWasabi wasabis={wasabis} />
        <Plate>
          <img src={plate} alt="plate" />
        </Plate>
      </SushiContainer>
      <IngredientsContainer>
        {renderIngredientList()}
      </IngredientsContainer>
    </CookingTable>
  );
}

export default Table;
