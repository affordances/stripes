import React, { useRef } from "react";
import { FaHeart, FaRegHeart, FaArrowDown } from "react-icons/fa";
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
  DownloadIcons,
  DownloadIconsContainer,
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
        <Pattern>
          <DownloadIconsContainer>
            <DownloadIcons>
              <FaArrowDown
                style={{ cursor: "pointer", marginRight: "8px" }}
                title="Download pattern"
                onClick={() => downloadHandler(currentPattern)}
              />
              {isPatternSaved(currentPattern) ? (
                <FaHeart
                  color="red"
                  title="Unsave pattern"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSavedPattern(currentPattern)}
                />
              ) : (
                <FaRegHeart
                  style={{ cursor: "pointer" }}
                  title="Save pattern"
                  onClick={() => toggleSavedPattern(currentPattern)}
                />
              )}
            </DownloadIcons>
          </DownloadIconsContainer>
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
