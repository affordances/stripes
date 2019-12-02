import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import "./index.css";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const SelectContainer = styled.div`
  width: 150px;
  margin-right: 20px;
`;

const SelectHeader = styled.h5``;

const StripesContainer = styled.div``;

const Stripe = styled.div`
  background: ${props => props.color};
  height: 38px;
  width: 600px;
`;

function App() {
  const colors = {
    "1": "#367da2",
    "2": "#e93f36",
    "3": "black"
  };

  const stripeBox = ["1", "2", "3"];

  const maxStripeCount = 16;

  const stripeOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" }
  ];

  const createMagnitudeOptions = (start, end) => {
    let options = [];

    if (start % 2 === 0) {
      for (let i = start; i <= end; i += 2) {
        options.push({ value: i, label: i });
      }
    } else {
      for (let i = start; i <= end; i++) {
        options.push({ value: i, label: i });
      }
    }
    return options;
  };

  const [stripeCount, setStripeCount] = useState(maxStripeCount);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);

  return (
    <Container>
      <SelectContainer>
        <SelectHeader>Select stripe count</SelectHeader>
        <Select
          options={stripeOptions}
          onChange={option => {
            setStripeCount(option.value);
            setMagnitude(null);
            setMagnitudeOptions(
              createMagnitudeOptions(option.value, maxStripeCount)
            );
          }}
        />
        <SelectHeader>Select magnitude</SelectHeader>
        <Select
          options={magnitudeOptions}
          value={magnitude}
          onChange={option => setMagnitude(option)}
        />
      </SelectContainer>
      <StripesContainer>
        {stripeBox.map((_, i) => (
          <Stripe key={i} color={colors[stripeBox[i]]} />
        ))}
      </StripesContainer>
    </Container>
  );
}

export default App;
