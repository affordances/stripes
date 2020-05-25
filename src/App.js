import React, { useState, useRef, useEffect, useEventListener } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Modal from "react-modal";
import styled from "styled-components";
import "./index.css";
import {
  Stripe,
  Pattern,
  PatternAndLabel,
  PatternLabel,
  PatternContainer,
  Container,
  AutoSizerContainer,
  EmptyStateText,
  EmptyStateContainer,
  Title,
  PatternLabelText,
  Button,
} from "./styles.js";
import { convertTo2D, getRowHeight } from "./helpers.js";
import { useLocalStorage, useStripes } from "./hooks.js";
import { Menu } from "./Menu.js";

const PatternRenderer = (props) => {
  const { columnIndex, data, rowIndex, style, ...otherProps } = props;
  const currentPattern = data.patterns[rowIndex][columnIndex];
  return currentPattern ? (
    <PatternContainer style={style} key={rowIndex}>
      <PatternAndLabel {...otherProps}>
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

const SavedPatternRenderer = (props) => {
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

export const MasonryDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${(props) => props.gap};
`;

export const Col = styled.div`
  display: grid;
  grid-gap: ${(props) => props.gap};
`;

const fillCols = (children, cols) => {
  children.forEach((child, i) => cols[i % cols.length].push(child));
};

function Masonry({ children, gap, ...rest }) {
  const ref = useRef();
  const cols = [...Array(3)].map(() => []);

  fillCols(children, cols);

  // const resizeHandler = () =>
  //   setNumCols(Math.ceil(ref.current.offsetWidth / minWidth));
  // useEffect(resizeHandler, []);
  // useEventListener(`resize`, resizeHandler);

  return (
    <MasonryDiv ref={ref} gap={gap} {...rest}>
      {[...Array(3)].map((_, index) => (
        <Col key={index} gap={gap}>
          {cols[index]}
        </Col>
      ))}
    </MasonryDiv>
  );
}

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { patterns, magnitude, ...props } = useStripes();
  const {
    savedPatterns,
    toggleSavedPattern,
    clearSavedPatterns,
    isPatternSaved,
  } = useLocalStorage();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const rowHeight = getRowHeight(patterns);
  const convertedSavedPatterns = convertTo2D(savedPatterns);
  const savedRowHeight = getRowHeight(convertedSavedPatterns);

  Modal.setAppElement(document.getElementById("root"));

  return (
    <Container>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Button onClick={closeModal}>CLOSE</Button>
        <Button onClick={clearSavedPatterns}>CLEAR ALL</Button>
        {savedPatterns.length > 0 ? (
          <AutoSizerContainer style={{ height: "100%" }}>
            {/* <AutoSizer>
              {({ height, width }) => {
                const columnWidth = width / 3;
                return ( */}
            <Masonry>
              {savedPatterns.map((pattern) => (
                <SavedPatternRenderer
                  style={{ minHeight: `${pattern.label.split("m")[1]}px` }}
                  pattern={pattern}
                  toggleSavedPattern={toggleSavedPattern}
                  isPatternSaved={isPatternSaved}
                />
              ))}
            </Masonry>
            {/* );
              }}
            </AutoSizer> */}
          </AutoSizerContainer>
        ) : (
          <EmptyStateContainer>
            <EmptyStateText>Make some patterns!</EmptyStateText>
          </EmptyStateContainer>
        )}
      </Modal>
      <Title>MATHIEU'S ATHLETIC STRIPE PATTERN GENERATOR</Title>
      <Menu magnitude={magnitude} openModal={openModal} {...props} />
      {patterns.length > 0 ? (
        <AutoSizerContainer>
          <AutoSizer>
            {({ height, width }) => {
              const columnWidth = width / 3;
              return (
                <Grid
                  itemData={{
                    patterns,
                    toggleSavedPattern,
                    isPatternSaved,
                  }}
                  columnCount={patterns[0].length}
                  rowCount={patterns.length}
                  columnWidth={columnWidth}
                  height={height}
                  rowHeight={rowHeight}
                  width={width}
                >
                  {PatternRenderer}
                </Grid>
              );
            }}
          </AutoSizer>
        </AutoSizerContainer>
      ) : (
        <EmptyStateContainer>
          <EmptyStateText>Make some patterns!</EmptyStateText>
        </EmptyStateContainer>
      )}
    </Container>
  );
};

export default App;
