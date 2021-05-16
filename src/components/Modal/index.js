import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Edge = styled.div`
  width: 600px;
  height: 500px;
  background: #e8d4ca;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  font-family: "RixYeoljeongdo_Regular";
  width: 500px;
  height: 400px;
  border: 1px solid black;
`;

const LinkButton = styled(Link)`
  width: 90px;
  height: auto;
  padding: ${({ theme }) => theme.padding.small};
  border: 1px solid ${({ theme }) => theme.color.white};
  display: inline-block;
  font-size: 0.8rem;
  text-align: center;
  color: ${({ theme }) => theme.color.white};

  &:hover {
    background: red;
    border-color: red;
    transition: 0.3s all;
  }
`;

function Modal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch({ type: "HIDE_MODAL"});
  };

  return createPortal(
    <Wrapper>
      <Edge>
        <Content>
          <p>
            {modal.contentText}
          </p>
          <LinkButton
            to={modal.firstPath}
            onClick={closeModal}
          >
            {modal.firstLinkButtonText}
          </LinkButton>
          <LinkButton
            to={modal.secondPath}
            onClick={closeModal}
          >
            {modal.secondLinkButtonText}
          </LinkButton>
        </Content>
      </Edge>
    </Wrapper>,
    document.getElementById("portal")
  );
}

export default Modal;
