import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import {
  AutoSizerContainer,
  EmptyStateText,
  EmptyStateContainer,
  Button,
} from "../styles.js";
import { SavedPatternRenderer } from "./PatternRenderers.js";

export const MasonryContainer = styled.div`
  display: grid;
  grid-auto-rows: 1px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const MasonryColumn = styled.div``;

const fillColumns = (children, columns) => {
  children.forEach((child, i) => columns[i % columns.length].push(child));
};

const Masonry = (props) => {
  const { children } = props;
  const columns = [...Array(3)].map(() => []);

  fillColumns(children, columns);

  return (
    <MasonryContainer>
      {[...Array(3)].map((_, index) => (
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
              <SavedPatternRenderer
                key={i}
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
