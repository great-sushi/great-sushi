import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import sushi from "../../assets/image/sushi.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.biggest};
  padding: 2rem;
`;

const SushiImage = styled.img`
  width: 200px;
  height: 100px;
  transform: rotate(-20deg);
`;

const Button = styled(Link)`
  margin: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid black;
  border-radius: 0.5rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

function Welcome() {
  return (
    <Wrapper>
      <SushiImage src={sushi} alt="sushi" />
      <Title>위대한 초밥</Title>
      <Button to="/fishing">
        게임시작
      </Button>
    </Wrapper>
  );
}

export default Welcome;
