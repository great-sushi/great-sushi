import React from "react";
import styled, { keyframes } from "styled-components";
import wasabiImage from "../../../assets/image/wasabi.png";

const Bar = styled.div`
  width: 400px;
  height: 20px;
  background: linear-gradient(to right, red 0%, red ${(props) => props.percentage}%, white ${(props) => props.percentage}%, white 100%);
  border-radius: 80px;
`;

const Percentage = styled.h1`
  font-size: 30px;
  font-family: RixYeoljeongdo_Regular;
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

const Wasabi = styled.img`
width: 80%;
  padding: 8px;
  cursor: pointer;
`;

const pulse = keyframes`
  from {
    transform: scale(1.5);
  }
  to {
    transform: scale(1);
  }
`;

const Guide = styled.div`
  width: 50%;
  height: 100%;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }
`;

const Text = styled.p`
  font-family: "RixYeoljeongdo_Regular";
  font-size: 30px;
  padding: 10px;

  &.pulse {
    animation: ${pulse} 0.5s ease-out infinite;
  }
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
  border: 1px solid black;
`;

function Gauge({
  percentage,
  updatePercentage,
  wasabiOrder,
  rice
}) {
  return (
    <GaugeContainer>
      <Percentage>
        {`${percentage}%`}
      </Percentage>
      <Bar percentage={percentage} />
      <WasabiContainer>
        <Item>
          <Wasabi
            className="wasabi"
            src={wasabiImage}
            alt="wasabi"
            onClick={updatePercentage}
            draggable="false"
          />
        </Item>
        {rice.id && wasabiOrder !== 0
        && (
          <Guide>
            <Text className="pulse">
              ←클릭!
            </Text>
          </Guide>
        )}
      </WasabiContainer>
    </GaugeContainer>
  );
}

export default React.memo(Gauge);
