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
  DownloadText,
} from "../styles.js";

export const PatternRenderer = (props) => {
  const ref = useRef(null);

  const downloadHandler = (pattern) => {
    return domtoimage
      .toPng(ref.current, {
        height: pattern.magnitude * 48,
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
          <PatternLabelText title={currentPattern.label}>
            {currentPattern.label}
          </PatternLabelText>
          {/* <PatternLabelText
            style={{ cursor: "pointer" }}
            onClick={() => toggleSavedPattern(currentPattern)}
          >
            {isPatternSaved(currentPattern) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            )}
          </PatternLabelText> */}
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
        <Pattern
          style={{ cursor: "pointer" }}
          onClick={() => downloadHandler(currentPattern)}
        >
          <DownloadText>CLICK TO DOWNLOAD</DownloadText>
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
