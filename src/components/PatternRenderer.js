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
  DownloadPattern,
  DownloadStripe,
  HiddenDownloadContainer,
} from "../styles.js";

export const PatternRenderer = (props) => {
  const ref = useRef(null);

  const onClickHandler = (pattern) => {
    return domtoimage
      .toPng(ref.current, {
        height: pattern.magnitude * 60,
        width: 3000,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${pattern.label.split(", ").join("-")}.png`;
        link.href = dataUrl;
        link.click();
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
    <PatternContainer {...props}>
      <PatternAndLabel>
        <PatternLabel>
          <PatternLabelText>{currentPattern.label}</PatternLabelText>
          <PatternLabelText
            style={{ cursor: "pointer" }}
            onClick={() => toggleSavedPattern(currentPattern)}
          >
            {isPatternSaved(currentPattern) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            )}
          </PatternLabelText>
        </PatternLabel>
        <HiddenDownloadContainer>
          <DownloadPattern ref={ref}>
            {currentPattern.pattern.flatMap(({ count, color }, i) =>
              new Array(count)
                .fill(0)
                .map((_, j) => (
                  <DownloadStripe background={color.value} key={i + "," + j} />
                ))
            )}
          </DownloadPattern>
        </HiddenDownloadContainer>
        <Pattern onClick={() => onClickHandler(currentPattern)}>
          {currentPattern.pattern.flatMap(({ count, color }, i) =>
            new Array(count)
              .fill(0)
              .map((_, j) => (
                <Stripe background={color.value} key={i + "," + j} />
              ))
          )}
        </Pattern>
      </PatternAndLabel>
    </PatternContainer>
  ) : null;
};
