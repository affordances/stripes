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
} from "./desktopAndTabletStyles.js";
import { Menu } from "./Menu.js";
import { SavedPatternsModal } from "./SavedPatternsModal.js";
import { PatternsContainer } from "./PatternsContainer.js";

export const DesktopAndTabletView = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Container>
      <SavedPatternsModal
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
        {...props}
      />
      <Title>MATHIEU'S ATHLETIC STRIPE PATTERN GENERATOR</Title>
      <InnerContainer>
        <Menu {...props} />
        <ButtonsAndPatternsContainer>
          <PatternCountAndButtonsRow>
            <PatternCount>Patterns: {props.patternCount}</PatternCount>
            <ButtonsGroup>
              <Button
                style={{ margin: "0 16px 16px 0" }}
                onClick={props.random}
              >
                RANDOM Pattern
              </Button>
              <Button style={{ marginBottom: "16px" }} onClick={toggleModal}>
                VIEW Saved
              </Button>
            </ButtonsGroup>
          </PatternCountAndButtonsRow>
          <PatternsContainer
            isDesktopOrTablet={props.isDesktopOrTablet}
            patterns={props.patterns}
            toggleSavedPattern={props.toggleSavedPattern}
            isPatternSaved={props.isPatternSaved}
          />
        </ButtonsAndPatternsContainer>
      </InnerContainer>
    </Container>
  );
};
