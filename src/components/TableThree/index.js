import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import plate from "../../asset/plate.png";
import salmonImage from "../../asset/salmon.png";
import tunaImage from "../../asset/tuna.png";
import wasabiImage from "../../asset/wasabi.png";
import riceImage from "../../asset/rice.png";
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
  transform: translateX(-50%);
  left: 50%;
  bottom: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  animation-name: slidein;
  animation-duration: 5s;

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

  .slidein {
    -moz-animation-duration: 3s;
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    -moz-animation-name: slidein;
    -webkit-animation-name: slidein;
    animation-name: slidein;
    -moz-animation-iteration-count: 3;
    -webkit-animation-iteration-count: 3;
    animation-iteration-count: 3;
    -moz-animation-direction: alternate;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }

  @keyframes slidein {
    from {
      margin-left: 100%;
    }

    to {
      margin-left: 0%;
    }
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
  const handleDragStart = (e) => {
    e.dataTransfer.setData("drag_start", e.target.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("over");
  };

  return (
    <Item key={ingredient.id}>
      <img
        id={ingredient.id}
        className={ingredient.kind || ingredient.id}
        src={ingredient.link}
        alt={ingredient.id}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        draggable="true"
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

const platePosition = {
  x: window.innerWidth,
  y: window.innerHeight / 2,
  speed: 1,
  dx: 5,
};

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
  const [ dropZone, setDropZone ] = useState(window.innerWidth);

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
    // wasabiImages.src = wasabiImage;
    // salmonImages.src = salmonImage;
    setDropZone(platePosition.x);

    image.onload = () => {
      ctx.drawImage(image, platePosition.x + 20, platePosition.y - 90, 350, 150);
    }

    const update = () => {
      ctx.clearRect(0, 0, canvassss.width, canvassss.height);

      ctx.drawImage(image, platePosition.x, platePosition.y, 400, 150);

      if (rice.offset.x > platePosition.x) {
        ctx.drawImage(riceImages, platePosition.x + 20, platePosition.y - 30, 350, 150);
        platePosition.x += platePosition.speed;
      }

      if (sashimi.id) {
        ctx.drawImage(salmonImages, platePosition.x + 20, platePosition.y - 30, 350, 150);
      }

      const rf = requestAnimationFrame(update);
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
  }, [rice.id, sashimi.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: RESET_PLATE });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [sashimi.id]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const dragStart = e.dataTransfer.getData("drag_start");
    console.log(dropZone);
    if (dropZone - e.clientX > 200 && e.clientX - dropZone < 200) {
      dispatch({ type: ADD_RICE, item: { id: dragStart, kind: dragStart, offset: {x: e.clientX, y: e.clientY}}});
    }
  };

  return (
    <div>
      <canvas id="canvas" ref={ref} onDragOver={handleDragOver} onDrop={handleDrop}></canvas>
      <IngredientsContainer>
        {renderIngredientList()}
      </IngredientsContainer>
    </div>
  );
}

export default Table;
