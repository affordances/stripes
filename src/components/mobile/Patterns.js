import React from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Button, ButtonsRow } from "../../styles/mobileStyles.js";
import { AutoSizerContainer } from "../../styles/desktopAndTabletStyles.js";
import { getRowHeight } from "../../helpers.js";

import { PatternRenderer } from "../shared/PatternRenderer.js";

export const Patterns = (props) => {
  const rowHeight = getRowHeight(props.patterns, props.isDesktopOrTablet);

  return (
    <>
      <ButtonsRow style={{ borderBottom: "4px solid black" }}>
        <Button
          style={{
            margin: "0 16px 0 0",
            flex: "3",
          }}
          onClick={props.createPatterns}
          disabled={!props.allChoicesMade}
        >
          MAKE
        </Button>
        <Button
          style={{ margin: "0 16px 0 0", flex: "1" }}
          onClick={props.reset}
          disabled={!props.anyChoicesMade}
        >
          <FaTimes style={{ position: "relative", top: "2px" }} />
        </Button>
        <Button style={{ margin: "0", flex: "1" }} onClick={props.random}>
          <FaRandom style={{ position: "relative", top: "2px" }} />
        </Button>
      </ButtonsRow>
      <AutoSizerContainer style={{ display: "flex", height: "100%" }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <List
                itemData={{
                  isMobile: true,
                  patterns: props.patterns,
                  toggleSavedPattern: props.toggleSavedPattern,
                  isPatternSaved: props.isPatternSaved,
                }}
                height={height}
                itemCount={props.patterns.length}
                itemSize={rowHeight}
                width={width}
              >
                {PatternRenderer}
              </List>
            );
          }}
        </AutoSizer>
      </AutoSizerContainer>
    </>
  );
};
