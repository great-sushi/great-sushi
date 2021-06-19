import React, { useEffect, useState } from "react";

import produce from "immer";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { completeRequest } from "../../../actions/fishing";
import { FISHES } from "../../../constants/imageSetting";
import useAudio from "../../../hooks/useAudio";

const Wrapper = styled.div`
  border: 5px solid black;
  width: 200px;
  height: auto;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.big};
    padding: 10px;
  }
`;

const Content = styled.div`
  div {
    padding: 8px;
    display: flex;
    align-items: center;
  }

  img {
    width: 70px;
    height: 40px;
  }

  p {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.small};
    padding: 5px;
  }
`;

function Request() {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.fishing.request);
  const fish = useSelector((state) => state.fishing.fish);
  const [, { repeatAudio }] = useAudio("splash");
  const [fishCount, setFishCount] = useState({
    octopus: 0,
    salmon: 0,
    tuna: 0,
    eel: 0,
    shrimp: 0,
  });

  const renderCaughtFishCount = () => {
    return FISHES.map((fish) => (
      <div key={fish.id}>
        <img src={fish.link} alt={fish.id} />
        <p>{`${fish.name} ${fishCount[fish.id]} / ${request[fish.id]} 개`}</p>
      </div>
    ));
  };

  useEffect(() => {
    if (fish.length === 0) {
      setFishCount({
        octopus: 0,
        salmon: 0,
        tuna: 0,
        eel: 0,
        shrimp: 0,
      });
      return;
    }

    switch (fish[fish.length - 1].name) {
      case "octopus":
        setFishCount(
          produce((draft) => {
            draft.octopus += 1;
          })
        );
        break;
      case "salmon":
        setFishCount(
          produce((draft) => {
            draft.salmon += 1;
          })
        );
        break;
      case "tuna":
        setFishCount(
          produce((draft) => {
            draft.tuna += 1;
          })
        );
        break;
      case "eel":
        setFishCount(
          produce((draft) => {
            draft.eel += 1;
          })
        );
        break;
      case "shrimp":
        setFishCount(
          produce((draft) => {
            draft.shrimp += 1;
          })
        );
        break;
      default:
        setFishCount({
          octopus: 0,
          salmon: 0,
          tuna: 0,
          eel: 0,
          shrimp: 0,
        });
        break;
    }

    repeatAudio();
  }, [fish.length]);

  useEffect(() => {
    if (fishCount.octopus >= request.octopus
      && fishCount.salmon >= request.salmon
      && fishCount.tuna >= request.tuna
      && fishCount.eel >= request.eel
      && fishCount.shrimp >= request.shrimp
      ) {
        dispatch(completeRequest());
      }
  }, [fishCount]);

  return (
    <Wrapper>
      <h1>요청서</h1>
      <Content>
        {renderCaughtFishCount()}
      </Content>
    </Wrapper>
  );
}

export default Request;
