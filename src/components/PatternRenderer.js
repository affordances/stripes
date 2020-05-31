import React, { useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import domtoimage from "dom-to-image";

import {
  Stripe,
  Pattern,
  PatternAndLabel,
  PatternLabel,
  PatternContainer,
  PatternLabelText,
} from "../styles.js";

export const PatternRenderer = (props) => {
  const ref = useRef(null);

  const onClickHandler = () => {
    return domtoimage
      .toPng(ref.current, {
        height: 1000,
        width: 3000,
        style: {
          transform: "scale(5)",
          transformOrigin: "top left",
          height: "1000px",
          width: "3000px",
        },
      })
      .then((dataUrl) => {
        console.log(ref.current);
        // const link = document.createElement("a");
        // link.download = "pattern.png";
        // link.href = dataUrl;
        // link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    <PatternContainer {...props} onClick={() => onClickHandler()}>
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
};
