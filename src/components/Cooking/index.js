import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "../Table";
import Timer from "../Timer";
import Order from "../Order";
import Evaluation from "../Evaluation";
import Revenue from "../Revenue";
import Modal from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import Restaurant from "../Restaurant";
import Option from "../Option";
import useAudio from "../../hook/useAudio";
import { showModal } from "../../actions/modal";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Side = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  right: 130px;
  top: 40px;
`;

function Cooking() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { sashimi } = useSelector((state) => state.sushi);
  const [, { playAudio }] = useAudio("bgm");

  useEffect(() => {
    dispatch(showModal({
      isVisible: true,
      contentText: "1분 안에 10,000원 이상을 벌어야 합니다. 마우스로 재료를 순서대로 드래그 해서 접시에 올려주세요. 주문대로 만들지 않으면 돈을 잃게 됩니다. 그럼 개점해볼까요?",
      firstPath: "/",
      secondPath: "/cooking",
      firstLinkButtonText: "나가기",
      secondLinkButtonText: "시작",
      game: "sushi",
    }));

    playAudio();
  }, []);

  return (
    <Wrapper>
      <Option />
      <Restaurant />
      {modal.isVisible
      && <Modal />}
      {!sashimi.id && <Order />}
      {sashimi.id && <Evaluation />}
      <Side>
        <Timer />
        <Revenue />
      </Side>
      <Table />
    </Wrapper>
  );
}

export default Cooking;
