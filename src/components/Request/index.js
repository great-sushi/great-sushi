import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  border: 5px solid black;
  width: 100%;
  height: 60%;
`;

function Request() {
  const request = useSelector((state) => state.fishing.request);

  return (
    <Wrapper>
      <p>{`문어 ${request.octopus} 개`}</p>
      <p>{`연어 ${request.salmon} 개`}</p>
      <p>{`참치 ${request.tuna} 개`}</p>
      <p>{`장어 ${request.eel} 개`}</p>
      <p>{`새우 ${request.shrimp} 개`}</p>
    </Wrapper>
  );
}

export default Request;
