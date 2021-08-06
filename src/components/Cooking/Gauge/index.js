import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import GaugeWasabi from "../GaugeWasabi";
import GaugeGuide from "../GaugeGuide";

const Bar = styled.div`
  width: 400px;
  height: 20px;
  background: linear-gradient(to right, red 0%, red ${(props) => props.percentage}%, white ${(props) => props.percentage}%, white 100%);
  border-radius: 80px;
`;

const Percentage = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.big};
`;

const GaugeContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
  }
`;

const WasabiContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  height: auto;
`;

function Gauge({
  percentage,
  updatePercentage,
  wasabiOrder,
  rice,
}) {
  return (
    <GaugeContainer>
      <Percentage>
        {`${percentage}%`}
      </Percentage>
      <Bar percentage={percentage} />
      <WasabiContainer>
        <GaugeWasabi
          handleClick={updatePercentage}
        />
        {rice.id && wasabiOrder !== 0
          && <GaugeGuide text="←클릭!" />
        }
      </WasabiContainer>
    </GaugeContainer>
  );
}

Gauge.propTypes = {
  percentage: PropTypes.number.isRequired,
  updatePercentage: PropTypes.func.isRequired,
  wasabiOrder: PropTypes.number.isRequired,
  rice: PropTypes.object.isRequired,
};

export default React.memo(Gauge);
