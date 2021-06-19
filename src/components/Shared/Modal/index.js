import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { hideModal } from "../../../actions/modal";
import { FISHES, MENUS } from "../../../constants/imageSetting";

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

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
  }

  img {
    width: 80px;
    height: 40px;
  }
`;

const Edge = styled.div`
  width: 600px;
  height: 500px;
  background: #ffff;
  border: 8px solid black;
  border-radius: 8px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 500px;
  height: 400px;
  border: 5px solid black;
  border-radius: 8px;
  background-color: #74b9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    width: 80%;
    padding: 10px;
    font-size: 20px;
    text-align: center;
    line-height: 1.3;
  }
`;

const LinkButton = styled(Link)`
  width: 110px;
  height: auto;
  padding: ${({ theme }) => theme.padding.small};
  border: 3px solid ${({ theme }) => theme.color.white};
  display: inline-block;
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  margin: 5px;

  &:hover {
    background: #3742fa;
    border-color: #3742fa;
    transition: 0.3s all;
  }
`;

const LinkButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Request = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px 0;
  }

  img {
    margin: 5px;
  }
`;

const Menu = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;

  div {
    flex: 1 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 8px 0;
  }

  img {
    margin: 5px;
  }
`;

const renderFishKind = () => {
  return FISHES.map((fish) => (
    <div key={fish.id}>
      <img src={fish.link} alt={fish.id} />
      <span>{fish.name}</span>
    </div>
  ));
};

const renderSushiMenu = () => {
  return MENUS.map((sushi) => (
    <div key={sushi.id}>
      <img src={sushi.link} alt={sushi.id} />
      <span>{sushi.name}</span>
      <span>{`${sushi.price}원`}</span>
    </div>
  ));
};

function Modal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(hideModal());
  };

  return createPortal(
    <Wrapper>
      <Edge>
        <Content>
          <p>
            {modal.contentText}
          </p>
          {modal.game === "fishing"
          &&
            <Request>
              {renderFishKind()}
            </Request>
          }
          {modal.game === "sushi"
          &&
            <Menu>
              {renderSushiMenu()}
            </Menu>
          }
          <LinkButtonWrapper>
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
          </LinkButtonWrapper>
        </Content>
      </Edge>
    </Wrapper>,
    document.getElementById("portal")
  );
}

export default Modal;
