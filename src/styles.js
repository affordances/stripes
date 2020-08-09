import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;
  margin: auto;
  overflow: auto;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 25px;
  line-height: 32px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: black;
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 8px;
  padding-right: 4px;
  border-bottom: 4px solid black;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  margin: 0 24px 0 0;
`;

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 24px 0;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 144px;
  margin-bottom: 24px;
`;

export const Header = styled.h2`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  padding: 0;
  color: black;
  text-decoration: underline;
`;

export const SwatchesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 0 16px 0;

  ${(props) =>
    props.disabled &&
    `
  pointer-events: none;
  opacity: 0.5;
  `}
`;

export const Check = styled.div`
  color: white;
  visibility: hidden;
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
`;

export const Swatch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  width: 80px;
  height: 16px;
  margin: 0 8px 8px 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }

  &:active {
    opacity: 1;
  }

  ${(props) =>
    props.isPicked &&
    `
      ${Check} {
        visibility: visible;
      }
  `};
`;

export const Button = styled.button`
  color: black;
  background: #f6f7f4;
  box-shadow: 4px 4px black;
  border: 2px solid black;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  width: fit-content;
  margin: 0 0 24px 0;
  letter-spacing: 1px;

  /* &:hover {
    background: black;
    color: white;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
  } */

  &:active {
    transform: translate(4px, 4px);
    box-shadow: none;
    transition: 0.1s;
  }

  &:focus {
    outline: none;
    /* border: 2px solid blue; */
  }

  ${(props) =>
    !props.disabled &&
    `
    background: white;
    cursor: pointer;
  `}
`;

export const AutoSizerContainer = styled.div`
  flex: 1;
  margin-top: -8px;
`;

export const ButtonsAndPatternsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IndicatorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 8px 24px;
  margin-right: auto;
`;

export const Indicator = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
`;

export const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px;

  ${(props) => props}
`;

export const PatternAndLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PatternLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 16px;
`;

export const PatternLabelText = styled.h6`
  font-weight: 400;
  margin: 0 0 4px 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DownloadText = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.5s ease;
  opacity: 1;
  height: 100%;
  width: 100%;
  color: #f6f7f4;
  font-weight: bold;
  font-size: 12px;
`;

export const Pattern = styled.div`
  border: 2px solid black;
  /* box-shadow: 4px 4px black; */
  width: 100%;
  position: relative;

  &:hover {
    ${DownloadText} {
      display: flex;
    }
  }
`;

export const Stripe = styled.div`
  background: ${(props) => props.background};
  height: 8px;
`;

export const HiddenDownloadContainer = styled.div`
  display: none;
`;

export const DownloadPattern = styled.div`
  width: 3000px;
`;

export const DownloadStripe = styled.div`
  background: ${(props) => props.background};
  height: 48px;
`;

export const PatternCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

export const PatternCount = styled.p`
  font-weight: 500;
  font-size: 24px;
  margin: 0 0 8px 0;
  padding: 0;
`;

export const EmptyStateContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyStateText = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

export const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 4px solid black;
  padding: 16px;
`;

export const ModalInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MasonryContainer = styled.div`
  display: grid;
  grid-auto-rows: 1px;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: auto;
  height: 100%;
`;

export const MasonryColumn = styled.div``;

export const modalStyles = {
  content: {
    overflow: "hidden",
    border: "4px solid black",
    padding: "0",
    maxWidth: "1280px",
    margin: "auto",
  },
};

export const selectStyles = {
  container: (provided, _) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, _) => ({
    ...provided,
    border: "2px solid black",
    borderRadius: "0",
    boxShadow: "4px 4px black",
    cursor: "pointer",
    height: "24px",
    minHeight: "24px",
    alignItems: "unset",
    padding: "0 8px",
  }),
  input: (provided, _) => ({
    ...provided,
    height: "20px",
    color: "inherit",
    fontSize: "12px",
    fontWeight: "700",
    margin: "0",
    padding: "0",
    input: {
      height: "20px",
    },
  }),
  indicatorContainer: (provided, _) => ({
    ...provided,
    padding: "0",
  }),
  indicatorsContainer: (provided, _) => ({
    ...provided,
    height: "20px",
  }),
  dropdownIndicator: (provided, _) => ({
    ...provided,
    color: "inherit",
    padding: "0",
  }),
  indicatorSeparator: (provided, _) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, _) => ({
    ...provided,
    cursor: "pointer",
    color: "black",
    fontSize: "12px",
    fontWeight: "700",
  }),
  placeholder: (provided, _) => ({
    ...provided,
    color: "inherit",
    fontSize: "12px",
  }),
  singleValue: (provided, _) => ({
    ...provided,
    color: "black",
    fontSize: "12px",
    fontWeight: "700",
    margin: "0",
  }),
  valueContainer: (provided, _) => ({
    ...provided,
    padding: "0",
    position: "unset",
    height: "20px",
  }),
};
