import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import audioOffImage from "../../assets/image/audio_off.png";
import audioOnImage from "../../assets/image/audio_on.png";
import useAudio from "../../hook/useAudio";
import bgm from "../../assets/audio/bgm.mp3";

const Wrapper = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  top: 0;
`;

function Option() {
  const [isMuted, setIsMuted] = useState(false);
  const toggleBgm = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  return (
    <Wrapper>
      {bgm &&
      <>
        <audio loop autoPlay={true} muted={isMuted}>
          <source src={bgm} type="audio/mpeg" />
        </audio>
        <img
          src={isMuted ? audioOnImage : audioOffImage}
          alt="audio"
          onClick={toggleBgm}
        />
      </>
      }
    </Wrapper>
  );
}

export default Option;
