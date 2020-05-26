import React, { useState } from "react";

import "./index.css";
import { Container, Title } from "./styles.js";
import { useLocalStorage, useStripes } from "./hooks.js";
import { Menu } from "./components/Menu.js";
import { SavedPatternsModal } from "./components/SavedPatternsModal.js";
import { PatternsContainer } from "./components/PatternsContainer.js";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { patterns, magnitude, ...props } = useStripes();
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
      <Title>MATHIEU'S ATHLETIC STRIPE PATTERN GENERATOR</Title>
      <Menu magnitude={magnitude} openModal={toggleModal} {...props} />
      <PatternsContainer
        patterns={patterns}
        toggleSavedPattern={toggleSavedPattern}
        isPatternSaved={isPatternSaved}
      />
    </Container>
  );
};

export default App;
