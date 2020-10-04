import React from "react";
import { FaRandom } from "react-icons/fa";
import { FixedSizeList as List } from "react-window";

import { Button } from "../../styles/mobileStyles.js";

import { PatternRenderer } from "../shared/PatternRenderer.js";

export const Patterns = (props) => {
  return (
    <>
      <Button onClick={props.random}>
        <FaRandom style={{ position: "relative", top: "2px" }} />
      </Button>
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
