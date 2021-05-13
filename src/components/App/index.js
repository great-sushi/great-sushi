import React from "react";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalFonts from "../../styles/fonts";
import GlobalStyles from "../../styles";
import theme from "../../styles/theme";
import Welcome from "../Welcome";
import Game from "../Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Result from "../Result";
import Fishing from "../Fishing";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GlobalFonts />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <DndProvider backend={HTML5Backend}>
            <Route path="/game" component={Game} />
            <Route path="/result" component={Result} />
            <Route path="/fishing" component={Fishing} />
          </DndProvider>
        </Switch>
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;
