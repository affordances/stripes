import React, { useState } from "react";

import {
  Button,
  PatternCountAndButtonsRow,
  Container,
  InnerContainer,
  ButtonsAndPatternsContainer,
  ButtonsGroup,
  Title,
  PatternCount,
} from "../../styles/desktopAndTabletStyles.js";
import { Menu } from "./Menu.js";
import { SavedPatternsModal } from "./SavedPatternsModal.js";
import { PatternsContainer } from "./PatternsContainer.js";

export const DesktopAndTabletView = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    isDesktopOrTablet,
    ...otherProps
  } = props;

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Container>
      <SavedPatternsModal
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
        clearSavedPatterns={clearSavedPatterns}
        savedPatterns={savedPatterns}
        toggleSavedPattern={toggleSavedPattern}
        isPatternSaved={isPatternSaved}
      />
      <Title>MATHIEU'S ATHLETIC STRIPE PATTERN GENERATOR</Title>
      <InnerContainer>
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
            isDesktopOrTablet={isDesktopOrTablet}
            patterns={patterns}
            toggleSavedPattern={toggleSavedPattern}
            isPatternSaved={isPatternSaved}
          />
        </ButtonsAndPatternsContainer>
      </InnerContainer>
    </Container>
  );
};
