import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  height: 80%;
  border: 10px solid black;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50%;
  border: 5px solid black;

  p {
    font-size: 20px;
  }
`;

const Revenue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50%;
  border: 5px solid black;

  p {
    font-size: 20px;
  }
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

function Result() {
  const { money } = useSelector((state) => state.revenue);
  const [message, setMessge] = useState("");

  useEffect(() => {
    if (money > 9500) {
      setMessge("성공");
    } else {
      setMessge("실패");
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <Content>
          <Message>
            <p>{message}</p>
          </Message>
          <Revenue>
            <p>{money}</p>
          </Revenue>
        </Content>
        <Button to="/game">
          다시하기
        </Button>
      </Container>
    </Wrapper>
  );
}

export default Result;
