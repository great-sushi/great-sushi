import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  right: 130px;
  top: 40px;
  width: 200px;
  height: 100px;
  background-color: white;

  p {
    font-size: 40px;
  }
`;

function Timer() {
  const [seconds, setSeconds] = useState(60);
  const history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        clearInterval(intervalId);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    if (seconds === 0) {
      history.push("/result");
    }

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <Wrapper>
      <h1>남은 시간</h1>
      <p>{seconds === 60 ? "1:00" : seconds < 10 ? `0:0${seconds}` : `0:${seconds}`}</p>
    </Wrapper>
  );
}

export default Timer;
