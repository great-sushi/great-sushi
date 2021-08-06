import { useDispatch } from "react-redux";
import {
  updateWasabi,
  updateWasabiSize,
} from "../actions/cooking";
import wasabiImage from "../assets/image/wasabi.png";

function usePercentage(rice, wasabi) {
  const dispatch = useDispatch();
  const updatePercentage = () => {
    if (!rice.id) return;

    if (wasabi.size < 100) {
      if (wasabi.size === 0) {
        dispatch(updateWasabi({
          id: "wasabi",
          kind: "wasabi",
          link: wasabiImage,
          size: 0,
        }));
      }

      dispatch(updateWasabiSize());
    }
  };

  return updatePercentage;
}

export default usePercentage;
