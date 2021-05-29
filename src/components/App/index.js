import React from "react";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalFonts from "../../styles/fonts";
import GlobalStyles from "../../styles";
import theme from "../../styles/theme";
import Welcome from "../Welcome";
import Cooking from "../Cooking";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
          <DndProvider backend={HTML5Backend}>
            <Route exact path="/" component={Welcome} />
            <Route path="/fishing" component={Fishing} />
            <Route path="/cooking" component={Cooking} />
          </DndProvider>
        </Switch>
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;
