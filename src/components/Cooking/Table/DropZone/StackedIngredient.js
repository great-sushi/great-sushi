import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const IngredientImage = styled.img`
  &.rice {
    z-index: 3;
    position: absolute;
    bottom: 60px;
  }

  &.wasabi {
    z-index: 3;
    position: absolute;
    bottom: 150px;
    width: ${(props) => props.percentage * 1.5}px;
  }

  &.sashimi {
    z-index: 4;
    position: absolute;
    bottom: 140px;
  }
`;

function StackedIngredient({ ingredient, percentage }) {
  return (
    <IngredientImage
      key={ingredient.id}
      className={ingredient.kind}
      src={ingredient.link}
      alt={ingredient.id}
      percentage={percentage}
    />
  );
}

StackedIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  percentage: PropTypes.number,
};

export default StackedIngredient;
