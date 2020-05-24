import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  max-width: 1275px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  margin: auto;
  overflow: auto;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 20px 0;
  color: black;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 20px 0;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Header = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 5px 0;
  padding: 0;
  color: black;
`;

export const SwatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 20px 0;

  ${(props) =>
    props.disabled &&
    `
  pointer-events: none;
  opacity: 0.5;
  `}
`;

export const Swatch = styled.div`
  background: ${(props) => props.color};
  border: 5px solid ${(props) => (props.isPicked ? `limegreen` : `#f6f7f4`)};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const Button = styled.button`
  flex: 1;
  color: black;
  background: #f6f7f4;
  border: 4px solid black;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;

  ${(props) =>
    !props.disabled &&
    `
    background: white;
    cursor: pointer;
  `}
`;

export const AutoSizerContainer = styled.div`
  flex: 1;
`;

export const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 15px;

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
`;

export const PatternLabelText = styled.h6`
  font-weight: 400;
  margin: 0 0 5px 0;
  padding: 0;
`;

export const Pattern = styled.div`
  border: 1px solid black;
  width: 100%;
`;

export const Stripe = styled.div`
  background: ${(props) => props.color};
  height: 10px;
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
  margin: 0 0 5px 0;
  padding: 0;
`;

export const EmptyStateContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyStateText = styled.div`
  font-weight: 500;
  font-size: 24px;
`;

export const selectStyles = {
  container: (provided, _) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, _) => ({
    ...provided,
    border: "4px solid black",
    cursor: "pointer",
  }),
  dropdownIndicator: (provided, _) => ({
    ...provided,
    color: "black",
  }),
  indicatorSeparator: (provided, _) => ({
    ...provided,
    width: "4px",
    backgroundColor: "black",
  }),
  option: (provided, _) => ({
    ...provided,
    cursor: "pointer",
    color: "black",
    fontSize: "24px",
  }),
  placeholder: (provided, _) => ({
    ...provided,
    color: "black",
    fontSize: "24px",
  }),
  singleValue: (provided, _) => ({
    ...provided,
    color: "black",
    fontSize: "24px",
  }),
};
