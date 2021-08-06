import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import wasabiImage from "../../../assets/image/wasabi.png";

const Wrapper = styled.div`
  width: 120px;
  cursor: grab;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

const WasabiImage = styled.img`
  width: 80%;
  padding: 8px;
  cursor: pointer;
`;

function GaugeWasabi({ handleClick }) {
  return (
    <Wrapper>
      <WasabiImage
        className="wasabi"
        src={wasabiImage}
        onClick={handleClick}
        draggable="false"
      />
    </Wrapper>
  );
}

GaugeWasabi.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default GaugeWasabi;
