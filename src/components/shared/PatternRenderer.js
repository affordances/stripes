import React, { useRef } from "react";
import { FaHeart, FaRegHeart, FaArrowDown } from "react-icons/fa";
import domtoimage from "dom-to-image";

import {
  Stripe,
  Pattern,
  PatternAndLabel,
  PatternLabel,
  PatternContainer,
  DownloadPattern,
  DownloadStripe,
  HiddenDownloadContainer,
  DownloadIcons,
  DownloadIconsContainer,
  IconContainer,
} from "../desktopAndTablet/desktopAndTabletStyles.js";

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
    ? !props.data.isMobile
      ? props.data.patterns[props.rowIndex][props.columnIndex]
      : props.data.patterns.length > 1
      ? props.data.patterns[props.index]
      : props.data.patterns[0]
    : props.pattern;

  const toggleSavedPattern = props.data
    ? props.data.toggleSavedPattern
    : props.toggleSavedPattern;

  const isPatternSaved = props.data
    ? props.data.isPatternSaved
    : props.isPatternSaved;

  const isMobile = props.data ? props.data.isMobile : props.isMobile;

  return currentPattern ? (
    <PatternContainer isMobile={isMobile} {...props}>
      <PatternAndLabel>
        <PatternLabel title={currentPattern.label}>
          {currentPattern.label}
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
              <IconContainer
                style={{ marginRight: "24px" }}
                title="Download pattern"
                onClick={() => downloadHandler(currentPattern)}
              >
                <FaArrowDown />
              </IconContainer>
              {isPatternSaved(currentPattern) ? (
                <IconContainer
                  title="Unsave pattern"
                  onClick={() => toggleSavedPattern(currentPattern)}
                >
                  <FaHeart color="red" />
                </IconContainer>
              ) : (
                <IconContainer
                  title="Save pattern"
                  onClick={() => toggleSavedPattern(currentPattern)}
                >
                  <FaRegHeart />
                </IconContainer>
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
