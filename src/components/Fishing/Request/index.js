import React from "react";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";

const Wrapper = styled.div`
  border: 5px solid black;
  width: 200px;
  height: auto;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.big};
    padding: 10px;
  }
`;

const Content = styled.div`
  div {
    padding: 8px;
    display: flex;
    align-items: center;
  }

  img {
    width: 70px;
    height: 40px;
  }

  p {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.small};
    padding: 5px;
  }
`;

function Request() {
  const renderCaughtFishCount = useRequest();

  return (
    <Wrapper>
      <h1>요청서</h1>
      <Content>
        {renderCaughtFishCount()}
      </Content>
    </Wrapper>
  );
}

export default Request;
