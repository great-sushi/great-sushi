import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import { INGREDIENTS } from "../../../constants/imageSetting";
import useClearPlate from "../../../hooks/useClearPlate";
import usePercentage from "../../../hooks/usePercentage";
import Gauge from "../Gauge";
import RailZone from "../RailZone";
import DropZone from "./DropZone";
import Ingredients from "./Ingredients";

const CookingTable = styled.div`
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.brown};
`;

const IngredientsContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grey};
  display: flex;
  justify-content: center;
  padding: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  max-width: max-content;
`;

const IngredientsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;;
  flex-direction: column;
`;

const renderIngredientList = () => {
  return INGREDIENTS.map(ingredient => (
    <Ingredients
      key={ingredient.id}
      ingredient={ingredient}
    />
  ));
};

function Table() {
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);
  const wasabiOrder = useSelector((state) => state.order.wasabiOrder);
  const modal = useSelector((state) => state.modal);
  const updatePercentage = usePercentage(rice, wasabi);
  useClearPlate(sashimi, modal);

  return (
    <CookingTable>
      <RailZone />
      <DropZone
        percentage={wasabi.size}
        rice={rice}
        sashimi={sashimi}
        wasabi={wasabi}
      />
      <IngredientsWrapper>
        <Gauge
          percentage={wasabi.size}
          updatePercentage={updatePercentage}
          wasabiOrder={wasabiOrder}
          rice={rice}
        />
        <IngredientsContainer>
          {renderIngredientList()}
        </IngredientsContainer>
      </IngredientsWrapper>
    </CookingTable>
  );
}

export default Table;
