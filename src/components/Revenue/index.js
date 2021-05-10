import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  right: 30px;
  top: 160px;
  width: 200px;
  height: 100px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  p {
    font-size: 40px;
  }
`;

function Revenue() {
  return (
    <Wrapper>
      <h1>수익금</h1>
      <p>0</p>
    </Wrapper>
  );
}

export default Revenue;
