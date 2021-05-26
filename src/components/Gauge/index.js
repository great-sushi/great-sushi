import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

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

function Gauge({ percentage }) {
  return (
    <Wrapper>
      <Percentage>{`${percentage}%`}</Percentage>
      <Bar percentage={percentage} />
    </Wrapper>
  );
}

export default Gauge;
