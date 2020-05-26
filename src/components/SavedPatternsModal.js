import React from "react";
import Modal from "react-modal";

import {
  AutoSizerContainer,
  EmptyStateText,
  EmptyStateContainer,
  Button,
  MasonryContainer,
  MasonryColumn,
} from "../styles.js";
import { PatternRenderer } from "./PatternRenderer.js";
import { convertToColumns } from "../helpers.js";

const Masonry = (props) => {
  const { children } = props;
  const columns = convertToColumns(children);

  return (
    <MasonryContainer>
      {columns.map((_, index) => (
        <MasonryColumn key={index}>{columns[index]}</MasonryColumn>
      ))}
    </MasonryContainer>
  );
};

Modal.setAppElement(document.getElementById("root"));

export const SavedPatternsModal = (props) => {
  const {
    modalIsOpen,
    toggleModal,
    clearSavedPatterns,
    savedPatterns,
    toggleSavedPattern,
    isPatternSaved,
  } = props;
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={toggleModal}>
      <Button onClick={toggleModal}>CLOSE</Button>
      <Button onClick={clearSavedPatterns}>CLEAR ALL</Button>
      {savedPatterns.length > 0 ? (
        <AutoSizerContainer style={{ height: "100%" }}>
          <Masonry>
            {savedPatterns.map((pattern, i) => (
              <PatternRenderer
                patternKey={i}
                pattern={pattern}
                toggleSavedPattern={toggleSavedPattern}
                isPatternSaved={isPatternSaved}
              />
            ))}
          </Masonry>
        </AutoSizerContainer>
      ) : (
        <EmptyStateContainer>
          <EmptyStateText>Make some patterns!</EmptyStateText>
        </EmptyStateContainer>
      )}
    </Modal>
  );
};
