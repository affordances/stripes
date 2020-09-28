import React, { useState } from "react";

import { Container, Header, Button } from "../styles/mobileStyles.js";
import { Menu } from "./Menu.js";
// import { SavedPatternsModal } from "./SavedPatternsModal.js";
import { PatternsContainer } from "./PatternsContainer.js";
import "../index.css";

export const MobileView = (props) => {
  const [displaySaved, setDisplaySaved] = useState(false);
  const {
    patterns,
    magnitude,
    pickedColors,
    random,
    stripeCountValue,
    patternCount,
    toggleSavedPattern,
    isPatternSaved,
    savedPatterns,
    clearSavedPatterns,
    ...otherProps
  } = props;

  return (
    <Container>
      <Header>
        <Button ontouchstart="" onClick={() => setDisplaySaved(false)}>
          Home
        </Button>
        <Button ontouchstart="" onClick={() => setDisplaySaved(true)}>
          Saved
        </Button>
      </Header>
      {displaySaved ? (
        <div>saved</div>
      ) : (
        <div>Mathieu's Athletic Stripe Pattern Generator</div>
      )}
      {/* <SavedPatternsModal
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
        clearSavedPatterns={clearSavedPatterns}
        savedPatterns={savedPatterns}
        toggleSavedPattern={toggleSavedPattern}
        isPatternSaved={isPatternSaved}
      /> */}
      {/* <InnerContainer>
        <Menu
          magnitude={magnitude}
          stripeCountValue={stripeCountValue}
          pickedColors={pickedColors}
          {...otherProps}
        />
        <ButtonsAndPatternsContainer>
          <PatternCountAndButtonsRow>
            <PatternCount>Patterns: {patternCount}</PatternCount>
            <ButtonsGroup>
              <Button style={{ margin: "0 16px 16px 0" }} onClick={random}>
                RANDOM Pattern
              </Button>
              <Button style={{ marginBottom: "16px" }} onClick={toggleModal}>
                VIEW Saved
              </Button>
            </ButtonsGroup>
          </PatternCountAndButtonsRow>
          <PatternsContainer
            patterns={patterns}
            toggleSavedPattern={toggleSavedPattern}
            isPatternSaved={isPatternSaved}
          />
        </ButtonsAndPatternsContainer>
      </InnerContainer> */}
    </Container>
  );
};
