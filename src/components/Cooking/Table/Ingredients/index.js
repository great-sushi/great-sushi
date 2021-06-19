import React from "react";
import styled from "styled-components";
import { useDrag, DragPreviewImage } from "react-dnd";

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
`;

const Image = styled.img`
  width: 100%;
  padding: 8px;
`;

const Ingredients = ({ ingredient }) => {
  const [, drag, preview] = useDrag({
    type: "SushiIngredients",
    item: {
      id: ingredient.id,
      kind: ingredient.kind,
      link: ingredient.link,
      price: ingredient.price,
    },
  });

  return (
    <Item>
      <DragPreviewImage
        connect={preview}
        src={ingredient.link}
      />
      <Image
        className={ingredient.kind}
        ref={drag}
        src={ingredient.link}
        alt={ingredient.id}
      />
    </Item>
  );
};

export default Ingredients;
