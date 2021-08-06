import { useState, useEffect } from "react";
import { IMAGES } from "../constants/imageSetting";

function useCacheImage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cacheImages = async (srcs) => {
      const promises = srcs.map((src) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve();
          image.onerror = () => reject();
          image.src = src;
        });
      });

      await Promise.all(promises);

      setIsLoading(false);
    };

    cacheImages(IMAGES);
  }, []);

  return isLoading;
}

export default useCacheImage;
