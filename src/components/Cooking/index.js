import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";
import Timer from "../Shared/Timer";
import Order from "./Order";
import Evaluation from "./Evaluation";
import Revenue from "./Revenue";
import Modal from "../Shared/Modal";
import { useSelector, useDispatch } from "react-redux";
import Restaurant from "./Restaurant";
import Option from "../Shared/Option";
import { showModal } from "../../actions/modal";
import {
  COOKING_GUIDE_TEXT,
  EXIT,
  START,
} from "../../constants";

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

  useEffect(() => {
    dispatch(showModal({
      isVisible: true,
      contentText: COOKING_GUIDE_TEXT,
      firstPath: "/",
      secondPath: "/cooking",
      firstLinkButtonText: EXIT,
      secondLinkButtonText: START,
      game: "sushi",
    }));
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
