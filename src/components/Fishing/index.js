import React from "react";
import styled from "styled-components";
import Box from "./Box";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

function Fishing() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default Fishing;
