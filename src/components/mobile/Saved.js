import React from "react";

import { Title, SavedPatternsContainer } from "../../styles/mobileStyles.js";

import {
  EmptyStateText,
  EmptyStateContainer,
} from "../../styles/desktopAndTabletStyles.js";

import { PatternRenderer } from "../shared/PatternRenderer.js";

export const Saved = (props) => {
  return (
    <>
      <Title style={{ textAlign: "center" }}>Saved Patterns</Title>
      {props.savedPatterns.length > 0 ? (
        <SavedPatternsContainer>
          {props.savedPatterns.map((pattern, i) => (
            <PatternRenderer
              key={i}
              isMobile={true}
              pattern={pattern}
              toggleSavedPattern={props.toggleSavedPattern}
              isPatternSaved={props.isPatternSaved}
            />
          ))}
        </SavedPatternsContainer>
      ) : (
        <EmptyStateContainer>
          <EmptyStateText style={{ textAlign: "center" }}>
            You have no saved patterns
          </EmptyStateText>
        </EmptyStateContainer>
      )}
    </>
  );
};
