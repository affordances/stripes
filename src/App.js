import React from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./index.css";
import {
  Stripe,
  Pattern,
  PatternAndLabel,
  PatternLabel,
  PatternContainer,
  Container,
  AutoSizerContainer,
  EmptyStateText,
  EmptyStateContainer,
  Title,
} from "./styles.js";
import { useLocalStorage, useStripes } from "./hooks.js";
import { Menu } from "./Menu.js";

const PatternRenderer = (props) => {
  const { columnIndex, data, rowIndex, style, ...otherProps } = props;
  const currentPattern = data.patterns[rowIndex][columnIndex];
  return currentPattern ? (
    <PatternContainer
      style={style}
      key={rowIndex}
      onClick={() => data.onClick(currentPattern)}
    >
      <PatternAndLabel {...otherProps}>
        <PatternLabel>{currentPattern.label}</PatternLabel>
        <Pattern>
          {currentPattern.pattern.flatMap(({ count, color }, i) =>
            new Array(count)
              .fill(0)
              .map((_, j) => <Stripe color={color.value} key={i + "," + j} />)
          )}
        </Pattern>
      </PatternAndLabel>
    </PatternContainer>
  ) : null;
};

const App = () => {
  const { patterns, magnitude, ...props } = useStripes();
  const {
    savedPatterns,
    toggleSavedPattern,
    clearSavedPatterns,
  } = useLocalStorage();
  console.log(savedPatterns);
  const patternHeight = patterns.length
    ? patterns[0][0].pattern.reduce((acc, p) => acc + p.count, 0)
    : 0;
  const rowHeight = patternHeight > 0 ? patternHeight * 10 + 47 : 0;

  return (
    <Container>
      <Title>MATHIEU'S ATHLETIC STRIPE PATTERN GENERATOR</Title>
      <Menu magnitude={magnitude} {...props} />
      {patterns.length > 0 ? (
        <AutoSizerContainer>
          <AutoSizer>
            {({ height, width }) => {
              const columnWidth = width / 3;
              return (
                <Grid
                  itemData={{ patterns, onClick: toggleSavedPattern }}
                  columnCount={patterns[0].length}
                  rowCount={patterns.length}
                  columnWidth={columnWidth}
                  height={height}
                  rowHeight={rowHeight}
                  width={width}
                >
                  {PatternRenderer}
                </Grid>
              );
            }}
          </AutoSizer>
        </AutoSizerContainer>
      ) : (
        <EmptyStateContainer>
          <EmptyStateText>Make some patterns!</EmptyStateText>
        </EmptyStateContainer>
      )}
    </Container>
  );
};

export default App;
