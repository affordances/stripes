import React from "react";
import Modal from "react-modal";

import {
  EmptyStateText,
  EmptyStateContainer,
  Button,
  MasonryContainer,
  MasonryColumn,
  ModalInnerContainer,
  ModalButtonsContainer,
  modalStyles,
} from "../styles/desktopAndTabletStyles.js";
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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      style={modalStyles}
    >
      <ModalInnerContainer>
        {savedPatterns.length > 0 ? (
          <Masonry>
            {savedPatterns.map((pattern, i) => (
              <PatternRenderer
                key={i}
                pattern={pattern}
                toggleSavedPattern={toggleSavedPattern}
                isPatternSaved={isPatternSaved}
              />
            ))}
          </Masonry>
        ) : (
          <EmptyStateContainer style={{ height: "100%" }}>
            <EmptyStateText>You have no saved patterns</EmptyStateText>
          </EmptyStateContainer>
        )}
        <ModalButtonsContainer>
          <Button
            style={{ margin: "0" }}
            disabled={!savedPatterns.length}
            onClick={clearSavedPatterns}
          >
            CLEAR All
          </Button>
          <Button style={{ margin: "0" }} onClick={toggleModal}>
            CLOSE
          </Button>
        </ModalButtonsContainer>
      </ModalInnerContainer>
    </Modal>
  );
};
