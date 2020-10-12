import React from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  AutoSizerContainer,
  EmptyStateText,
  EmptyStateContainer,
} from "../../styles/desktopAndTabletStyles.js";
import { PatternRenderer } from "../shared/PatternRenderer.js";
import { getRowHeight } from "../../helpers.js";

export const PatternsContainer = (props) => {
  const {
    patterns,
    toggleSavedPattern,
    isPatternSaved,
    isDesktopOrTablet,
  } = props;
  const rowHeight = getRowHeight(patterns, isDesktopOrTablet);

  return patterns.length > 0 ? (
    <AutoSizerContainer>
      <AutoSizer>
        {({ height, width }) => {
          const columnWidth = width / 3;
          return (
            <Grid
              itemData={{
                isMobile: false,
                patterns,
                toggleSavedPattern,
                isPatternSaved,
              }}
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
  );
};