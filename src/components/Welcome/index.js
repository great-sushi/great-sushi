import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import sushi from "../../assets/image/sushi.png";
import useAudio from "../../hook/useAudio";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 100px;
  font-family: "RixYeoljeongdo_Regular";
  padding: 2rem;
`;

const Image = styled.img`
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
`;

function Welcome() {
  const [isPlaying, { toggleAudio, restartAudio }] = useAudio("bgm");

  useEffect(() => {
    if (isPlaying) {
      toggleAudio();
    }

    restartAudio();
  }, []);

  return (
    <Wrapper>
      <Image src={sushi} alt="sushi" />
      <Title>위대한 초밥</Title>
      <Button to="/fishing">
        게임시작
      </Button>
    </Wrapper>
  );
}

export default Welcome;
