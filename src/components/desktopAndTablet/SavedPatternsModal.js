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
} from "./desktopAndTabletStyles.js";
import { PatternRenderer } from "../shared/PatternRenderer.js";
import { convertToColumns } from "../../helpers.js";

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
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.toggleModal}
      style={modalStyles}
    >
      <ModalInnerContainer>
        {props.savedPatterns.length > 0 ? (
          <Masonry>
            {props.savedPatterns.map((pattern, i) => (
              <PatternRenderer
                key={i}
                isMobile={false}
                pattern={pattern}
                toggleSavedPattern={props.toggleSavedPattern}
                isPatternSaved={props.isPatternSaved}
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
            disabled={!props.savedPatterns.length}
            onClick={props.clearSavedPatterns}
          >
            CLEAR All
          </Button>
          <Button style={{ margin: "0" }} onClick={props.toggleModal}>
            CLOSE
          </Button>
        </ModalButtonsContainer>
      </ModalInnerContainer>
    </Modal>
  );
};
