import React, { memo } from "react";
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
import { useStripes } from "./hooks.js";
import { Menu } from "./Menu.js";

const PatternRenderer = memo((props) => {
  const { columnIndex, data, rowIndex, style, ...otherProps } = props;
  const currentPattern = data[rowIndex][columnIndex];

  return currentPattern ? (
    <PatternContainer style={style}>
      <PatternAndLabel {...otherProps}>
        <PatternLabel>{currentPattern.label}</PatternLabel>
        <Pattern>
          {currentPattern.pattern.flatMap(({ count, color }) =>
            new Array(count).fill(<Stripe color={color.value} />)
          )}
        </Pattern>
      </PatternAndLabel>
    </PatternContainer>
  ) : null;
});

const App = () => {
  const { patterns, magnitude, ...props } = useStripes();

  const rowHeight = magnitude ? magnitude * 10 + 47 : 0;

  return (
    <Container>
      <Title>MATHIEU'S ATHLETIC PATTERN STRIPE GENERATOR</Title>
      <Menu magnitude={magnitude} {...props} />
      {patterns.length > 0 ? (
        <AutoSizerContainer>
          <AutoSizer>
            {({ height, width }) => {
              const columnWidth = width / 3;
              return (
                <Grid
                  key={Math.random()}
                  itemData={patterns}
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
