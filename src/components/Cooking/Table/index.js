import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import RailZone from "../RailZone";
import Gauge from "../Gauge";
import {
  clearPlate,
  updateWasabi,
} from "../../../actions/cooking";
import wasabiImage from "../../../assets/image/wasabi.png";
import Ingredients from "./Ingredients";
import DropZone from "./DropZone";
import { INGREDIENTS } from "../../../constants/imageSetting";

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
  const dispatch = useDispatch();
  const { rice, sashimi, wasabi } = useSelector(state => state.sushi);
  const wasabiOrder = useSelector(state => state.order.wasabiOrder);
  const modal = useSelector(state => state.modal);
  const [percentage, setPercentage] = useState(0);

  const updatePercentage = () => {
    if (!rice.id) return;

    if (percentage < 100) {
      if (percentage === 0) {
        dispatch(updateWasabi({
          id: "wasabi",
          kind: "wasabi",
          link: wasabiImage,
        }));
      }

      setPercentage((prev) => prev + 10);
    }
  };

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (sashimi.id) {
        dispatch(clearPlate());
        setPercentage(0);
      }
    }, 800);

    return () => clearTimeout(timeoutID);
  }, [sashimi.id]);

  useEffect(() => {
    dispatch(clearPlate());
  }, [modal.isVisible]);

  return (
    <CookingTable>
      <RailZone />
      <DropZone
        percentage={percentage}
        rice={rice}
        sashimi={sashimi}
        wasabi={wasabi}
      />
      <IngredientsWrapper>
        <Gauge
          percentage={percentage}
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
