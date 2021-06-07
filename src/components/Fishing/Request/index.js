import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import octopus from "../../../assets/image/octopus_fishing.png";
import salmon from "../../../assets/image/salmon_fishing.png";
import tuna from "../../../assets/image/tuna_fishing.png";
import eel from "../../../assets/image/eel_fishing.png";
import shrimp from "../../../assets/image/shrimp_fishing.png";
import useAudio from "../../../hooks/useAudio";
import { completeRequest } from "../../../actions/fishing";
import produce from "immer";

const Wrapper = styled.div`
  border: 5px solid black;
  width: 200px;
  height: auto;
  background-color: white;
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
    font-family: "RixYeoljeongdo_Regular";
    font-size: 30px;
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
    font-family: "RixYeoljeongdo_Regular";
    font-size: 15px;
    padding: 5px;
  }
`;

const fishList = [
  {
    id: "tuna",
    link: tuna,
    name: "참치",
  },
  {
    id: "salmon",
    link: salmon,
    name: "연어",
  },
  {
    id: "octopus",
    link: octopus,
    name: "문어",
  },
  {
    id: "shrimp",
    link: shrimp,
    name: "새우",
  },
  {
    id: "eel",
    link: eel,
    name: "장어",
  },
];

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
    return fishList.map((fish) => (
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
    };

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
