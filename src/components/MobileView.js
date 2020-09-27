import React from "react";

import {
  Button,
  PatternCountAndButtonsRow,
  Container,
  InnerContainer,
  ButtonsAndPatternsContainer,
  ButtonsGroup,
  Title,
  PatternCount,
} from "../styles.js";
import { Menu } from "./Menu.js";
// import { SavedPatternsModal } from "./SavedPatternsModal.js";
import { PatternsContainer } from "./PatternsContainer.js";

export const MobileView = (props) => {
  //   const [modalIsOpen, setModalIsOpen] = useState(false);
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
      {/* <SavedPatternsModal
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
        clearSavedPatterns={clearSavedPatterns}
        savedPatterns={savedPatterns}
        toggleSavedPattern={toggleSavedPattern}
        isPatternSaved={isPatternSaved}
      /> */}
      <Title>Mathieu's Athletic Stripe Pattern Generator</Title>
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
