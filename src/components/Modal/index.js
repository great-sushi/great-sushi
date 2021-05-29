import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import octopus from "../../assets/image/octopus_fishing.png";
import salmon from "../../assets/image/salmon_fishing.png";
import tuna from "../../assets/image/tuna_fishing.png";
import eel from "../../assets/image/eel_fishing.png";
import shrimp from "../../assets/image/shrimp_fishing.png";
import octopusSashimi from "../../assets/image/octopus.png";
import salmonSashimi from "../../assets/image/salmon.png";
import tunaSashimi from "../../assets/image/tuna.png";
import eelSashimi from "../../assets/image/eel.png";
import shrimpSashimi from "../../assets/image/shrimp.png";
import egg from "../../assets/image/egg.png";
import { hideModal } from "../../actions/modal";
import { clearPlate } from "../../actions/cooking";

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
  font-family: "RixYeoljeongdo_Regular";
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
  align-items: center;
  justify-content: center;

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

function Modal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(hideModal());
    dispatch(clearPlate());
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
            (<Request>
              <div>
                <img src={octopus} alt="octopus" />
                <span>문어</span>
              </div>
              <div>
                <img src={salmon} alt="salmon" />
                <span>연어</span>
              </div>
              <div>
                <img src={tuna} alt="tuna" />
                <span>참치</span>
              </div>
              <div>
                <img src={eel} alt="eel" />
                <span>장어</span>
              </div>
              <div>
                <img src={shrimp} alt="shrimp" />
                <span>새우</span>
              </div>
            </Request>)
          }
          {modal.game === "sushi"
          &&
          <>
          <Menu>
            <div>
              <img src={octopusSashimi} alt="octopus" />
              <span>문어</span>
              <span>600원</span>
            </div>
            <div>
              <img src={salmonSashimi} alt="salmon" />
              <span>연어</span>
              <span>800원</span>
            </div>
            <div>
              <img src={tunaSashimi} alt="tuna" />
              <span>참치</span>
              <span>1,000원</span>
            </div>
          </Menu>
          <Menu>
            <div>
              <img src={eelSashimi} alt="eel" />
              <span>장어</span>
              <span>1,200원</span>
            </div>
            <div>
              <img src={shrimpSashimi} alt="shrimp" />
              <span>새우</span>
              <span>700원</span>
            </div>
            <div>
              <img src={egg} alt="egg" />
              <span>계란</span>
              <span>500원</span>
            </div>
          </Menu>
          </>
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
