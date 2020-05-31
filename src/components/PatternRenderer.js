import React, { forwardRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
  Stripe,
  Pattern,
  PatternAndLabel,
  PatternLabel,
  PatternContainer,
  PatternLabelText,
} from "../styles.js";

export const PatternRenderer = forwardRef((props, ref) => {
  const currentPattern = props.data
    ? props.data.patterns[props.rowIndex][props.columnIndex]
    : props.pattern;

  const toggleSavedPattern = props.data
    ? props.data.toggleSavedPattern
    : props.toggleSavedPattern;

  const isPatternSaved = props.data
    ? props.data.isPatternSaved
    : props.isPatternSaved;

  return currentPattern ? (
    <PatternContainer
      {...props}
      onClick={props.onClick ? () => props.onClick() : () => {}}
    >
      <PatternAndLabel>
        <PatternLabel>
          <PatternLabelText>{currentPattern.label}</PatternLabelText>
          <PatternLabelText onClick={() => toggleSavedPattern(currentPattern)}>
            {isPatternSaved(currentPattern) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            )}
          </PatternLabelText>
        </PatternLabel>
        <Pattern ref={ref}>
          {currentPattern.pattern.flatMap(({ count, color }, i) =>
            new Array(count)
              .fill(0)
              .map((_, j) => <Stripe color={color.value} key={i + "," + j} />)
          )}
        </Pattern>
      </PatternAndLabel>
    </PatternContainer>
  ) : null;
});
