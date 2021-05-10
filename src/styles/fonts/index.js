import { createGlobalStyle } from "styled-components";
import RixYeoljeongdo from "./RixYeoljeongdo_Regular.woff";

const globalFonts = createGlobalStyle`
  @font-face {
    font-family: "RixYeoljeongdo_Regular";
    src: url(${RixYeoljeongdo}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

export default globalFonts;
