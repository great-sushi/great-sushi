import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "./Box";
import Timer from "../Timer";
import Net from "./Net";
import Request from "../Request";
import Modal from "../Modal";
import useAudio from "../../hook/useAudio";
import Option from "../Option";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background-color: skyblue;
`;

const Menu = styled.div`
  width: 20%;
  height: 70%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

function Fishing() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const [, { playAudio }] = useAudio("bgm", { loop: true });

  useEffect(() => {
    if (!modal.isVisible) {
      dispatch({ type: "SHOW_MODAL", content: {
        isVisible: true,
        contentText: "1분 안에 요청서에 맞게 마우스로 클릭하여 문어, 참치, 연어, 장어, 새우를 잡아주세요. 실패하면 가게 영업을 할 수 없습니다.",
        firstPath: "/",
        secondPath: "/fishing",
        firstLinkButtonText: "나가기",
        secondLinkButtonText: "시작",
        game: "fishing",
      }});

      playAudio("bgm");
    }
  }, []);

  return (
    <>
    <Option />
      <Wrapper>
        {modal.isVisible
        && <Modal />}
        <Box />
        <Menu>
          <Timer />
          <Request />
          <Net />
        </Menu>
      </Wrapper>
    </>
  );
}

export default Fishing;
