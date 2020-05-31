import React, { useRef } from "react";
import Modal from "react-modal";
import domtoimage from "dom-to-image";
// import html2canvas from "html2canvas";

import {
  EmptyStateText,
  EmptyStateContainer,
  Button,
  MasonryContainer,
  MasonryColumn,
  ModalInnerContainer,
  ModalButtonsContainer,
  modalStyles,
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
  const patternToSave = useRef(null);

  console.log(domtoimage);

  const onClickHandler = () => {
    return domtoimage
      .toPng(patternToSave.current, {
        height: 1000,
        width: 3000,
        style: { height: "1000px", width: "3000px" },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "pattern.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                onClick={onClickHandler}
                ref={patternToSave}
                pattern={pattern}
                toggleSavedPattern={toggleSavedPattern}
                isPatternSaved={isPatternSaved}
              />
            ))}
          </Masonry>
        ) : (
          <EmptyStateContainer>
            <EmptyStateText>Make some patterns!</EmptyStateText>
          </EmptyStateContainer>
        )}
        <ModalButtonsContainer>
          <Button
            disabled={!savedPatterns.length}
            onClick={clearSavedPatterns}
            style={{
              margin: "0 20px 0 0",
            }}
          >
            CLEAR ALL
          </Button>
          <Button onClick={toggleModal}>CLOSE</Button>
        </ModalButtonsContainer>
      </ModalInnerContainer>
    </Modal>
  );
};
