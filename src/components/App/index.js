import React, { useState, useEffect } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { IMAGES } from "../../constants/imageSetting";
import GlobalStyles from "../../styles";
import GlobalFonts from "../../styles/fonts";
import theme from "../../styles/theme";
import Cooking from "../Cooking";
import Fishing from "../Fishing";
import Welcome from "../Welcome";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
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

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GlobalFonts />
        {isLoading
          ? <div>loading...</div>
          : (
            <Switch>
              <DndProvider backend={HTML5Backend}>
                <Route exact path="/" component={Welcome} />
                <Route path="/fishing" component={Fishing} />
                <Route path="/cooking" component={Cooking} />
              </DndProvider>
            </Switch>
          )
        }
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;
