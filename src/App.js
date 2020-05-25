import React, { useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Modal from "react-modal";
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

  return (
    <Container>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Button onClick={closeModal}>CLOSE</Button>
        <Button onClick={clearSavedPatterns}>CLEAR ALL</Button>
        {convertedSavedPatterns.length > 0 ? (
          <AutoSizerContainer style={{ height: "100%" }}>
            <AutoSizer>
              {({ height, width }) => {
                const columnWidth = width / 3;
                return (
                  <Grid
                    itemData={{
                      patterns: convertedSavedPatterns,
                      toggleSavedPattern,
                      isPatternSaved,
                    }}
                    columnCount={convertedSavedPatterns[0].length}
                    rowCount={convertedSavedPatterns.length}
                    columnWidth={columnWidth}
                    height={height}
                    rowHeight={savedRowHeight}
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
