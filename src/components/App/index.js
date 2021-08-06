import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import useCacheImage from "../../hooks/useCacheImage";
import GlobalStyles from "../../styles";
import GlobalFonts from "../../styles/fonts";
import theme from "../../styles/theme";
import Cooking from "../Cooking";
import Fishing from "../Fishing";
import Welcome from "../Welcome";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const isLoading = useCacheImage();

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
