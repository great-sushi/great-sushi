import React, { useEffect, useState } from "react";
import FishingGameBgm from "../asset/fishingGameBgm.mp3";
import SushiGameBgm from "../asset/sushiGameBgm.mp3";
import Countdown from "../asset/countdown.mp3"
import Drop from "../asset/drop.mp3";
import Splash from "../asset/splash.mp3";
import Coughing from "../asset/coughing.mp3";

const fishingGameBgm = new Audio(FishingGameBgm);
const sushiGameBgm = new Audio(SushiGameBgm);
const countdown = new Audio(Countdown);
const drop = new Audio(Drop);
const splash = new Audio(Splash);
const coughing = new Audio(Coughing);

const gameAudio = {
  fishingGameBgm,
  sushiGameBgm,
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

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const playAudio = (name) => {
    setIsPlaying(true);
  };

  const toggleAudio = () => {
    setIsPlaying(prev => !prev);
  }

  return [isPlaying, { playAudio, toggleAudio }];
}

export default useAudio;
