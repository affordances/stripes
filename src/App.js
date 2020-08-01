import React, { useState } from "react";

import "./index.css";
import {
  Button,
  ButtonsRow,
  Container,
  InnerContainer,
  ButtonsAndPatternsContainer,
  Title,
} from "./styles.js";
import { useLocalStorage, useStripes } from "./hooks.js";
import { Menu } from "./components/Menu.js";
import { SavedPatternsModal } from "./components/SavedPatternsModal.js";
import { PatternsContainer } from "./components/PatternsContainer.js";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { patterns, magnitude, random, ...props } = useStripes();
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
        <Menu magnitude={magnitude} {...props} />
        <ButtonsAndPatternsContainer>
          <ButtonsRow>
            <Button onClick={random}>RANDOM Patterns</Button>
            <Button onClick={toggleModal}>VIEW Saved</Button>
          </ButtonsRow>
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
