import React from "react";
import styled from "styled-components";
import audioOffImage from "../../asset/audio_off.png";
import audioOnImage from "../../asset/audio_on.png";
import useAudio from "../../hook/useAudio";

const Wrapper = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  top: 0;
`;

function Option() {
  const [isPlaying, { toggleAudio }] = useAudio("bgm");

  const handleClick = () => {
    toggleAudio();
  };

  return (
    <Wrapper>
      <img
        src={isPlaying ? audioOnImage : audioOffImage}
        alt="audio"
        onClick={handleClick}
      />
    </Wrapper>
  );
}

export default Option;
