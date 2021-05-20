import { useEffect, useState } from "react";
import Bgm from "../asset/bgm.mp3";
import Countdown from "../asset/countdown.mp3"
import Drop from "../asset/drop.mp3";
import Splash from "../asset/splash.mp3";
import Coughing from "../asset/coughing.mp3";

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
  }, [isPlaying, audio]);

  const playAudio = () => {
    audio.play();
  };

  const toggleAudio = () => {
    setIsPlaying(prev => !prev);
  }

  const restartAudio = () => {
    audio.currentTime = 0;
  }

  return [isPlaying, { playAudio, toggleAudio, restartAudio }];
}

export default useAudio;
