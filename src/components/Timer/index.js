import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import styled, { keyframes } from "styled-components";
import useAudio from "../../hook/useAudio";
import { showModal } from "../../actions/modal";

const pulse = keyframes`
  from {
    transform: scale(2);
  }
  to {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  width: 200px;
  height: 100px;
  background-color: white;
  border: 5px solid black;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  &.danger {
    background-color: #e84118;
  }

  h1 {
    font-family: RixYeoljeongdo_Regular;
  }

  p {
    font-size: 40px;
    font-family: RixYeoljeongdo_Regular;
  }

  .pulse {
    animation: ${pulse} 1s ease-out infinite;
  }
`;

function Timer() {
  const [seconds, setSeconds] = useState(60);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const isCompleted = useSelector((state) => state.fishing.isCompleted);
  const [isPlaying, { playAudio, toggleAudio, restartAudio }] = useAudio("countdown");
  const location = useLocation();

  useEffect(() => {
    if (modal.isVisible) {
      if (isPlaying) {
        toggleAudio();
      }
      restartAudio();
      setSeconds(60);
      return;
    };

    const intervalId = setInterval(() => {
      if (seconds === 0) {
        clearInterval(intervalId);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    if (seconds < 6) {
      playAudio();
    }

    if (seconds === 0) {
      toggleAudio();
      if (isCompleted) {
        dispatch(showModal({
          isVisible: true,
          contentText: "성공하셨습니다! 그럼 개점해볼까요?",
          firstPath: "/",
          secondPath: "/cooking",
          firstLinkButtonText: "나가기",
          secondLinkButtonText: "개점",
        }));
      } else {
        dispatch(showModal({
          isVisible: true,
          contentText: "실패하셨습니다!",
          firstPath: "/",
          secondPath: location.pathname,
          firstLinkButtonText: "나가기",
          secondLinkButtonText: "재도전",
        }));

        if (location.pathname === "/cooking") {
          dispatch({ type: "ADD_WASABI_SIZE", size: 0 });
        }
      }
    } else {
      if (isCompleted) {
        if (seconds < 6) {
          toggleAudio();
        }

        dispatch(showModal({
          isVisible: true,
          contentText: "성공하셨습니다! 그럼 개점해볼까요?",
          firstPath: "/",
          secondPath: "/cooking",
          firstLinkButtonText: "나가기",
          secondLinkButtonText: "개점",
        }));
      }
    }

    return () => clearInterval(intervalId);
  }, [modal.isVisible, seconds]);

  return (
    <Wrapper className={seconds < 6 ? "danger" : ""}>
      <h1>남은 시간</h1>
      <p className={seconds < 6 ? "pulse" : ""}>{seconds === 60 ? "1:00" : seconds < 10 ? `0:0${seconds}` : `0:${seconds}`}</p>
    </Wrapper>
  );
}

export default Timer;
