import React from "react";

import {
  Stripe,
  Pattern,
  PatternAndLabel,
  PatternLabel,
  PatternContainer,
  PatternLabelText,
} from "../styles.js";

export const PatternRenderer = (props) => {
  const { columnIndex, data, rowIndex, style, ...otherProps } = props;
  const currentPattern = data.patterns[rowIndex][columnIndex];

  return currentPattern ? (
    <PatternContainer style={style} key={rowIndex} {...otherProps}>
      <PatternAndLabel>
        <PatternLabel>
          <PatternLabelText>{currentPattern.label}</PatternLabelText>
          <PatternLabelText
            onClick={() => data.toggleSavedPattern(currentPattern)}
          >
            {data.isPatternSaved(currentPattern) ? "UNSAVE" : "SAVE"}
          </PatternLabelText>
        </PatternLabel>
        <Pattern>
          {currentPattern.pattern.flatMap(({ count, color }, i) =>
            new Array(count)
              .fill(0)
              .map((_, j) => <Stripe color={color.value} key={i + "," + j} />)
          )}
        </Pattern>
      </PatternAndLabel>
    </PatternContainer>
  ) : null;
};

export const SavedPatternRenderer = (props) => {
  const { pattern, toggleSavedPattern, isPatternSaved, ...otherProps } = props;

  return pattern ? (
    <PatternContainer {...otherProps}>
      <PatternAndLabel>
        <PatternLabel>
          <PatternLabelText>{pattern.label}</PatternLabelText>
          <PatternLabelText onClick={() => toggleSavedPattern(pattern)}>
            {isPatternSaved(pattern) ? "UNSAVE" : "SAVE"}
          </PatternLabelText>
        </PatternLabel>
        <Pattern>
          {pattern.pattern.flatMap(({ count, color }, i) =>
            new Array(count)
              .fill(0)
              .map((_, j) => <Stripe color={color.value} key={i + "," + j} />)
          )}
        </Pattern>
      </PatternAndLabel>
    </PatternContainer>
  ) : null;
};
