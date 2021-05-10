import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import sushi from "../../asset/sushi.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  padding: 1.5rem;
`;

const Title = styled.div`
  font-size: 100px;
  font-family: "RixYeoljeongdo_Regular";
  padding: 2rem;
`;

const Image = styled.img`
  width: 200px;
  height: 100px;
  transform: rotate(-20deg);
`;

const Button = styled(Link)`
  margin: 1rem;
  padding: 1rem;
  background-color: #ffff;
  border: 1px solid black;
  border-radius: 0.5rem;
  color: black;
  text-decoration: none;
`;

function Welcome() {
  return (
    <Wrapper>
      <Image src={sushi} alt="sushi" />
      <Title>위대한 초밥</Title>
      <ButtonWrapper>
        <Button to="/guide">
          게임방법
        </Button>
        <Button to="/game">
          게임시작
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Welcome;
