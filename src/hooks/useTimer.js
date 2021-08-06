import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { showModal } from "../actions/modal";

import {
  FISHING_SUCCESS_TEXT,
  EXIT,
  OPEN,
  FAILURE_TEXT,
  RETRY,
} from "../constants/modal";
import useAudio from "../hooks/useAudio";

function useTimer() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [seconds, setSeconds] = useState(60);

  const modal = useSelector((state) => state.modal);
  const isCompleted = useSelector((state) => state.fishing.isCompleted);
  const [isPlaying, { playAudio, toggleAudio, restartAudio }] = useAudio("countdown");

  useEffect(() => {
    if (modal.isVisible) {
      if (isPlaying) {
        toggleAudio();
      }
      restartAudio();
      setSeconds(60);
      return;
    }

    const intervalId = setInterval(() => {
      if (seconds === 0) {
        clearInterval(intervalId);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    if (seconds === 0) {
      toggleAudio();
      if (isCompleted) {
        dispatch(showModal({
          isVisible: true,
          contentText: FISHING_SUCCESS_TEXT,
          firstPath: "/",
          secondPath: "/cooking",
          firstLinkButtonText: EXIT,
          secondLinkButtonText: OPEN,
        }));
      } else {
        dispatch(showModal({
          isVisible: true,
          contentText: FAILURE_TEXT,
          firstPath: "/",
          secondPath: location.pathname,
          firstLinkButtonText: EXIT,
          secondLinkButtonText: RETRY,
        }));
      }
    } else {
      if (seconds < 6) {
        playAudio();
      }

      if (isCompleted) {
        dispatch(showModal({
          isVisible: true,
          contentText: FISHING_SUCCESS_TEXT,
          firstPath: "/",
          secondPath: "/cooking",
          firstLinkButtonText: EXIT,
          secondLinkButtonText: OPEN,
        }));
      }
    }

    return () => clearInterval(intervalId);
  }, [modal.isVisible, seconds]);

  return seconds;
}

export default useTimer;
