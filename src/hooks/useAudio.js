import { useEffect, useState } from "react";

import Bgm from "../assets/audio/bgm.mp3";
import Coughing from "../assets/audio/coughing.mp3";
import Countdown from "../assets/audio/countdown.mp3"
import Drop from "../assets/audio/drop.mp3";
import Splash from "../assets/audio/splash.mp3";

const bgm = new Audio(Bgm);
const countdown = new Audio(Countdown);
const drop = new Audio(Drop);
const splash = new Audio(Splash);
const coughing = new Audio(Coughing);

const gameAudio = {
  bgm,
  countdown,
  drop,
  splash,
  coughing,
};

Object.keys(gameAudio).forEach(key => {
  gameAudio[key].preload = "auto";
});

function useAudio(name, option) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(gameAudio[name]);

  if (option) {
    Object.keys(option).forEach(i => {
      audio[i] = option[i];
    });
  }

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const playAudio = () => {
    setIsPlaying(true);
  };

  const repeatAudio = () => {
    audio.play();
  };

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  const restartAudio = () => {
    audio.currentTime = 0;
  };

  return [isPlaying, { playAudio, toggleAudio, restartAudio, repeatAudio }];
}

export default useAudio;
