import React from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import { FixedSizeList as List } from "react-window";

import { Button, ButtonsRow } from "../../styles/mobileStyles.js";

import { PatternRenderer } from "../shared/PatternRenderer.js";

export const Patterns = (props) => {
  return (
    <>
      <ButtonsRow>
        <Button
          style={{ marginRight: "16px", flex: "3" }}
          onClick={props.createPatterns}
          disabled={!props.allChoicesMade}
        >
          MAKE
        </Button>
        <Button
          style={{ marginRight: "16px", flex: "1" }}
          onClick={props.reset}
          disabled={!props.anyChoicesMade}
        >
          <FaTimes style={{ position: "relative", top: "2px" }} />
        </Button>
        <Button style={{ flex: "1" }} onClick={props.random}>
          <FaRandom style={{ position: "relative", top: "2px" }} />
        </Button>
      </ButtonsRow>
      <List
        itemData={{
          isMobile: true,
          patterns: props.patterns,
          toggleSavedPattern: props.toggleSavedPattern,
          isPatternSaved: props.isPatternSaved,
        }}
        height={500}
        itemCount={props.patterns.length}
        itemSize={100}
        width={"100%"}
      >
        {PatternRenderer}
      </List>
    </>
  );
};
