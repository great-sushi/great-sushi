import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAudio from "../hooks/useAudio";
import produce from "immer";
import { FISHES } from "../constants/imageSetting";
import { completeRequest } from "../actions/fishing";

function useRequest() {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.fishing.request);
  const fish = useSelector((state) => state.fishing.fish);
  const [, { repeatAudio }] = useAudio("splash");
  const [fishCount, setFishCount] = useState({
    octopus: 0,
    salmon: 0,
    tuna: 0,
    eel: 0,
    shrimp: 0,
  });

  const renderCaughtFishCount = () => {
    return FISHES.map((fish) => (
      <div key={fish.id}>
        <img src={fish.link} alt={fish.id} />
        <p>{`${fish.name} ${fishCount[fish.id]} / ${request[fish.id]} 개`}</p>
      </div>
    ));
  };

  useEffect(() => {
    if (fish.length === 0) {
      setFishCount({
        octopus: 0,
        salmon: 0,
        tuna: 0,
        eel: 0,
        shrimp: 0,
      });
      return;
    }

    switch (fish[fish.length - 1].name) {
      case "octopus":
        setFishCount(
          produce((draft) => {
            draft.octopus += 1;
          })
        );
        break;
      case "salmon":
        setFishCount(
          produce((draft) => {
            draft.salmon += 1;
          })
        );
        break;
      case "tuna":
        setFishCount(
          produce((draft) => {
            draft.tuna += 1;
          })
        );
        break;
      case "eel":
        setFishCount(
          produce((draft) => {
            draft.eel += 1;
          })
        );
        break;
      case "shrimp":
        setFishCount(
          produce((draft) => {
            draft.shrimp += 1;
          })
        );
        break;
      default:
        setFishCount({
          octopus: 0,
          salmon: 0,
          tuna: 0,
          eel: 0,
          shrimp: 0,
        });
        break;
    }

    repeatAudio();
  }, [fish.length]);

  useEffect(() => {
    if (fishCount.octopus >= request.octopus
      && fishCount.salmon >= request.salmon
      && fishCount.tuna >= request.tuna
      && fishCount.eel >= request.eel
      && fishCount.shrimp >= request.shrimp
      ) {
        dispatch(completeRequest());
      }
  }, [fishCount]);

  return renderCaughtFishCount;
}

export default useRequest;
