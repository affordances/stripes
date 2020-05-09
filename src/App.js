import React, { memo } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./index.css";
import {
  Stripe,
  Pattern,
  PatternContainer,
  PatternLabel,
  Container,
} from "./styles.js";
import { useStripes } from "./hooks.js";
import { Menu } from "./Menu.tsx";

const PatternRenderer = memo((props) => {
  const { columnIndex, data, rowIndex, ...otherProps } = props;
  const currentPattern = data[rowIndex][columnIndex];

  return currentPattern ? (
    <PatternContainer {...otherProps}>
      <PatternLabel>{currentPattern.label}</PatternLabel>
      <Pattern>
        {currentPattern.pattern.flatMap(({ count, color }) =>
          new Array(count).fill(<Stripe color={color.value} />)
        )}
      </Pattern>
    </PatternContainer>
  ) : null;
});

const App = () => {
  const { patterns } = useStripes();

  console.log(patterns);

  return (
    <Container>
      <Menu />
      {patterns.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              itemData={patterns}
              columnCount={patterns[0].length}
              rowCount={patterns.length}
              columnWidth={280}
              height={height}
              rowHeight={200}
              width={width}
            >
              {PatternRenderer}
            </Grid>
          )}
        </AutoSizer>
      )}
    </Container>
  );
};

export default App;
