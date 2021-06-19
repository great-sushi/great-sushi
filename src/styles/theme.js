const calcRem = (size) => `${size / 16}rem`;

const color = {
  red: "#e84118",
  blue: "#3742fa",
  brown: "#af8264",
  white: "#ffffff",
  grey: "#576574",
  lightgrey: "#c8d6e5",
};

const fontSize = {
  small: calcRem(14),
  middle: calcRem(20),
  big: calcRem(32),
  bigger: calcRem(40),
  biggest: calcRem(100),
};

const margin = {
  small: calcRem(8),
  base: calcRem(16),
  middle: calcRem(24),
  big: calcRem(32),
  bigger: calcRem(40),
  biggest: calcRem(48),
};

const padding = {
  small: calcRem(8),
  base: calcRem(16),
  middle: calcRem(24),
  big: calcRem(32),
  bigger: calcRem(40),
  biggest: calcRem(48),
};

const theme = {
  color,
  fontSize,
  margin,
  padding,
};

export default theme;
