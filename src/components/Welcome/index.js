import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import sushi from "../../assets/image/sushi.png";
import useAudio from "../../hook/useAudio";


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }
`;

const Title = styled.div`
  font-size: 100px;
  font-family: "RixYeoljeongdo_Regular";
  padding: 2rem;
`;

const SushiImage = styled.img`
  width: 200px;
  height: 100px;
  transform: rotate(-20deg);
`;

const Button = styled(Link)`
  margin: 1rem;
  padding: 1rem;
  background-color: #ffff;
  border: 1px solid black;
  border-radius: 0.5rem;
  color: black;
  text-decoration: none;
  font-family: RixYeoljeongdo_Regular;

  cursor: pointer;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingImage = styled.img`
  width: 150px;
  height: 75px;
  animation: ${rotation} 2s infinite linear;
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const srcs = [sushi];

function Welcome() {
  const [isPlaying, { toggleAudio, restartAudio }] = useAudio("bgm");

  const [isLoading, setIsLoading] = useState(true);
  const cacheImages = async (srcs) => {
    const promises = srcs.map((src) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = resolve();
        image.onerror = reject();
      });
    });

    await Promise.all(promises);

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  useEffect(() => {
    cacheImages(srcs);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      toggleAudio();
    }

    restartAudio();
  }, []);

  return (
    <Wrapper>
      {isLoading
       ? <div>loading...</div>
       : (
         <>
          <SushiImage src={srcs[0]} alt="sushi" onLoad={() => console.log("load")}/>
          <Title>위대한 초밥</Title>
          <Button to="/fishing">
            게임시작
          </Button>
         </>
       )
      }
    </Wrapper>
  );
}

export default Welcome;
