import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { showModal } from "../../actions/modal";
import {
  COOKING_GUIDE_TEXT,
  EXIT,
  START,
} from "../../constants/modal";
import Modal from "../Shared/Modal";
import Option from "../Shared/Option";
import Timer from "../Shared/Timer";
import Evaluation from "./Evaluation";
import Order from "./Order";
import Restaurant from "./Restaurant";
import Revenue from "./Revenue";
import Table from "./Table";

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
      {modal.isVisible && <Modal />}
      {sashimi.id && <Evaluation />}
      {!sashimi.id && <Order />}
      <Side>
        <Timer />
        <Revenue />
      </Side>
      <Table />
    </Wrapper>
  );
}

export default Cooking;
