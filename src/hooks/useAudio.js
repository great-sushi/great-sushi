import { useEffect, useState, useRef } from "react";

import coughing from "../assets/audio/coughing.mp3";
import countdown from "../assets/audio/countdown.mp3"
import drop from "../assets/audio/drop.mp3";
import splash from "../assets/audio/splash.mp3";

const gameAudio = {
  countdown,
  drop,
  splash,
  coughing,
};

function useAudio(name) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef();

  useEffect(() => {
    audio.current = new Audio(gameAudio[name]);
  }, [name]);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlaying]);

  const playAudio = () => {
    setIsPlaying(true);
  };

  const repeatAudio = () => {
    audio.current.play();
  };

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  const restartAudio = () => {
    audio.current.currentTime = 0;
  };

  return [isPlaying, { playAudio, toggleAudio, restartAudio, repeatAudio }];
}

export default useAudio;
