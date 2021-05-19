import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "../Table";
import Timer from "../Timer";
import Order from "../Order";
import Evaluation from "../Evaluation";
import Revenue from "../Revenue";
import Modal from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import Customer from "../Customer";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function Game() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { sashimi } = useSelector((state) => state.sushi);

  useEffect(() => {
    dispatch({ type: "SHOW_MODAL", content: {
      isVisible: true,
      contentText: "1분 안에 10,000원 이상을 벌어야 합니다. 마우스로 재료를 순서대로 드래그 해서 접시에 올려주세요. 주문대로 만들지 않으면 돈을 잃게 됩니다. 그럼 개점해볼까요?",
      firstPath: "/",
      secondPath: "/game",
      firstLinkButtonText: "나가기",
      secondLinkButtonText: "시작",
      game: "sushi",
    }});
  }, []);

  return (
    <Wrapper>
      <Customer />
      {modal.isVisible
      && <Modal />}
      {/* <Timer /> */}
      {!sashimi.id && <Order />}
      {sashimi.id && <Evaluation />}
      <Revenue />
      <Table />
    </Wrapper>
  );
}

export default Game;
