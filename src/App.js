import React, { useState } from "react";

import "./index.css";
import {
  Button,
  PatternCountAndButtonsRow,
  Container,
  InnerContainer,
  ButtonsAndPatternsContainer,
  ButtonsGroup,
  Title,
  PatternCount,
} from "./styles.js";
import { useLocalStorage, useStripes } from "./hooks.js";
import { Menu } from "./components/Menu.js";
import { SavedPatternsModal } from "./components/SavedPatternsModal.js";
import { PatternsContainer } from "./components/PatternsContainer.js";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    patterns,
    magnitude,
    pickedColors,
    random,
    stripeCountValue,
    patternCount,
    ...props
  } = useStripes();
  const useLocalStorageProps = useLocalStorage();
  const { toggleSavedPattern, isPatternSaved } = useLocalStorageProps;

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Container>
      <SavedPatternsModal
        toggleModal={toggleModal}
        modalIsOpen={modalIsOpen}
        {...useLocalStorageProps}
      />
      <Title>Mathieu's Athletic Stripe Pattern Generator</Title>
      <InnerContainer>
        <Menu
          magnitude={magnitude}
          stripeCountValue={stripeCountValue}
          pickedColors={pickedColors}
          {...props}
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
      </InnerContainer>
    </Container>
  );
};

export default App;
