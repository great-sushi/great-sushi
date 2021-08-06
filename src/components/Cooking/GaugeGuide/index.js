import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  width: 50%;
  height: 100%;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
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

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.big};
  padding: 10px;
  animation: ${pulse} 0.5s ease-out infinite;
`;

function GaugeGuide({ text }) {
  return (
    <Wrapper>
      <GuideText>
        {text}
      </GuideText>
    </Wrapper>
  );
}

GaugeGuide.propTypes = {
  text: PropTypes.string.isRequired,
};

export default GaugeGuide;
