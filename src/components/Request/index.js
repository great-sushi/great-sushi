import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import octopus from "../../asset/octopus_fishing.png";
import salmon from "../../asset/salmon_fishing.png";
import tuna from "../../asset/tuna_fishing.png";
import eel from "../../asset/eel_fishing.png";
import shrimp from "../../asset/shrimp_fishing.png";

const Wrapper = styled.div`
  border: 5px solid black;
  width: 100%;
  height: 60%;

  img {
    width: 40px;
    height: 40px;
  }
`;

function Request() {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.fishing.request);
  const fish = useSelector((state) => state.fishing.fish);
  const [octopusCount, setOctopusCount] = useState(0);
  const [salmonCount, setSalmonCount] = useState(0);
  const [tunaCount, setTunaCount] = useState(0);
  const [eelCount, setEelCount] = useState(0);
  const [shrimpCount, setShrimpCount] = useState(0);

  useEffect(() => {
    if (fish.length === 0) {
      setOctopusCount(0);
      setSalmonCount(0);
      setTunaCount(0);
      setEelCount(0);
      setShrimpCount(0);
      return;
    };

    switch (fish[fish.length -1].name) {
      case "octopus":
        setOctopusCount((prev) => prev + 1);
        break;
      case "salmon":
        setSalmonCount((prev) => prev + 1);
        break;
      case "tuna":
        setTunaCount((prev) => prev + 1);
        break;
      case "eel":
        setEelCount((prev) => prev + 1);
        break;
      case "shrimp":
        setShrimpCount((prev) => prev + 1);
        break;
      default:
        break;
    }
  }, [fish]);

  useEffect(() => {
    if (octopusCount >= request.octopus
      && salmonCount >= request.salmon
      && tunaCount >= request.tuna
      && eelCount >= request.eel
      && shrimpCount >= request.shrimp
    ) {
      dispatch({ type: "COMPLETE_REQUEST" });
    }
  }, [octopusCount, salmonCount, tunaCount, eelCount, shrimpCount]);

  return (
    <Wrapper>
      <div>
        <img src={octopus} alt="octopus" />
        <p>{`문어 ${octopusCount} / ${request.octopus} 개`}</p>
      </div>
      <div>
        <img src={salmon} alt="salmon" />
        <p>{`연어 ${salmonCount} / ${request.salmon} 개`}</p>
      </div>
      <div>
        <img src={tuna} alt="tuna" />
        <p>{`참치 ${tunaCount} / ${request.tuna} 개`}</p>
      </div>
      <div>
        <img src={eel} alt="eel" />
        <p>{`장어 ${eelCount} / ${request.eel} 개`}</p>
      </div>
      <div>
        <img src={shrimp} alt="shrimp" />
        <p>{`새우 ${shrimpCount} / ${request.shrimp} 개`}</p>
      </div>
    </Wrapper>
  );
}

export default Request;
