import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "../Table";
import Timer from "../Timer";
import Order from "../Order";
import Evaluation from "../Evaluation";
import Revenue from "../Revenue";
import Modal from "../Modal";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function Game() {
  const dispatch = useDispatch();
  const { sashimiOrder } = useSelector((state) => state.order);
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch({ type: "SHOW_MODAL", content: {
      isVisible: true,
      contentText: "1분 안에 10,000원을 벌어야 합니다. 주문대로 만들지 않으면 큰일이 날 수도 있어요. 마우스로 재료를 드래그 해서 접시에 올려주세요. 초밥 만들기 순서를 지키셔야합니다. 밥, (와사비), 회. 그럼 개점해볼까요?",
      firstPath: "/",
      secondPath: "/game",
      firstLinkButtonText: "나가기",
      secondLinkButtonText: "시작",
    }});
  }, []);

  return (
    <Wrapper>
      {modal.isVisible
      && <Modal />}
      <Timer />
      <Revenue />
      <Order />
      {sashimiOrder.name.length && <Evaluation />}
      <Table />
    </Wrapper>
  );
}

export default Game;
