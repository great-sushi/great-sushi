import React from "react";
import styled from "styled-components";
import useRevenue from "../../../hooks/useRevenue";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  width: 200px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.white};
  border: 5px solid black;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.bigger};
`;

function Revenue() {
  const revenue = useRevenue();

  return (
    <Wrapper>
      <h1>수익금</h1>
      <Text>
        {revenue}
      </Text>
    </Wrapper>
  );
}

export default React.memo(Revenue);
