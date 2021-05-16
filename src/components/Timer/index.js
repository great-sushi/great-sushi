import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

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
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const isCompleted = useSelector((state) => state.fishing.isCompleted);

  useEffect(() => {
    if (modal.isVisible) {
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

    if (seconds === 0) {
      if (isCompleted) {
        dispatch({ type: "SHOW_MODAL", content: {
          isVisible: true,
          contentText: "성공하셨습니다! 그럼 개점해볼까요?",
          firstPath: "/",
          secondPath: "/game",
          firstLinkButtonText: "나가기",
          secondLinkButtonText: "개점",
        }});
      } else {
        dispatch({ type: "SHOW_MODAL", content: {
          isVisible: true,
          contentText: "실패",
          firstPath: "/",
          secondPath: "/fishing",
          firstLinkButtonText: "나가기",
          secondLinkButtonText: "재도전",
        }});
      }
    } else {
      if (isCompleted) {
        dispatch({ type: "SHOW_MODAL", content: {
          isVisible: true,
          contentText: "성공하셨습니다! 그럼 개점해볼까요?",
          firstPath: "/",
          secondPath: "/game",
          firstLinkButtonText: "나가기",
          secondLinkButtonText: "개점",
        }});
      }
    }

    return () => clearInterval(intervalId);
  }, [modal.isVisible, seconds]);

  return (
    <Wrapper>
      <h1>남은 시간</h1>
      <p>{seconds === 60 ? "1:00" : seconds < 10 ? `0:0${seconds}` : `0:${seconds}`}</p>
    </Wrapper>
  );
}

export default Timer;
