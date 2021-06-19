import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { showModal } from "../../actions/modal";
import { FISHING_GUIDE_TEXT, EXIT, START } from "../../constants/modal";
import Modal from "../Shared/Modal";
import Option from "../Shared/Option";
import Timer from "../Shared/Timer";
import Net from "./Net";
import Request from "./Request";
import Sea from "./Sea";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightgrey};
`;

const Menu = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

function Fishing() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    if (!modal.isVisible) {
      dispatch(showModal({
        isVisible: true,
        contentText: FISHING_GUIDE_TEXT,
        firstPath: "/",
        secondPath: "/fishing",
        firstLinkButtonText: EXIT,
        secondLinkButtonText: START,
        game: "fishing",
      }));
    }
  }, []);

  return (
    <>
      <Option />
      <Wrapper>
        {modal.isVisible && <Modal />}
        <Sea />
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
