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
  const { patterns, ...props } = useStripes();

  return (
    <Container>
      <Menu {...props} />
      {patterns.length > 0 ? (
        <AutoSizerContainer>
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                key={Math.random()}
                itemData={patterns}
                columnCount={patterns[0].length}
                rowCount={patterns.length}
                columnWidth={width / 3}
                height={height}
                rowHeight={200}
                width={width}
              >
                {PatternRenderer}
              </Grid>
            )}
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
