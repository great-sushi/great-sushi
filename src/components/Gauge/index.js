import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  width: 400px;
  height: 20px;
  background: linear-gradient(to right, red 0%, red ${(props) => props.percentage}%, white ${(props) => props.percentage}%, white 100%);
  border-radius: 80px;
`;

function Gauge({ percentage }) {
  return (
    <>
      <h1>{`${percentage}%`}</h1>
      <Bar percentage={percentage} />
    </>
  );
}

export default Gauge;
