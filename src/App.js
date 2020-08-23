import React, { useState } from "react";

import "./index.css";
import {
  Button,
  ButtonsRow,
  Container,
  InnerContainer,
  ButtonsAndPatternsContainer,
  Title,
  IndicatorsContainer,
  Indicator,
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
          <ButtonsRow>
            <Button onClick={random}>RANDOM Pattern</Button>
            <Button onClick={toggleModal}>VIEW Saved</Button>
          </ButtonsRow>
          <IndicatorsContainer>
            <Indicator style={{ width: "168px", paddingRight: "auto" }}>
              Stripes: {stripeCountValue || 0}
            </Indicator>
            <Indicator style={{ width: "200px", paddingRight: "auto" }}>
              Magnitude: {magnitude || 0}
            </Indicator>
            <Indicator style={{ width: "168px", paddingRight: "auto" }}>
              Colors: {pickedColors.length}
            </Indicator>
            <Indicator>Patterns: {patternCount}</Indicator>
          </IndicatorsContainer>
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
