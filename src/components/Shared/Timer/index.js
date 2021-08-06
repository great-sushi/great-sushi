import React from "react";

import styled, { keyframes } from "styled-components";
import useTimer from "../../../hooks/useTimer";

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

  &.danger {
    background-color: ${({ theme }) => theme.color.red};
  }
`;

const pulse = keyframes`
  from {
    transform: scale(2);
  }
  to {
    transform: scale(1);
  }
`;

const TimerText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.bigger};

  &.pulse {
    animation: ${pulse} 1s ease-out infinite;
  }
`;

function Timer() {
  const seconds = useTimer();

  return (
    <Wrapper className={seconds < 6 ? "danger" : ""}>
      <h1>남은 시간</h1>
      <TimerText className={seconds < 6 ? "pulse" : ""}>
        {seconds === 60 ? "1:00" : seconds < 10 ? `0:0${seconds}` : `0:${seconds}`}
      </TimerText>
    </Wrapper>
  );
}

export default Timer;
