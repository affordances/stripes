import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { colors, maxMagnitude, stripeOptions } from "./config.js";
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

const Swatch = styled.div`
  background: ${props => props.color};
  width: 20px;
  height: 20px;
`;

const SwatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100px;
  height: 60px;
`;

const PickedColors = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const StripesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pattern = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const Button = styled.button``;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Stripe = styled.div`
  background: ${props => props.color};
  height: 5px;
  width: 200px;
  border-bottom: 1px solid black;
`;

const createMagnitudeOptions = start => {
  let options = [];
  start = Number(start);

  if (start % 2 === 0) {
    for (let i = start; i <= maxMagnitude; i += 2) {
      options.push({ value: i, label: i });
    }
  } else {
    for (let i = start; i <= maxMagnitude; i++) {
      options.push({ value: i, label: i });
    }
  }
  return options;
};

const createStripe = (count, color) => {
  let stripe = [];

  for (let i = 1; i <= count; i++) {
    stripe.push(<Stripe key={Math.random()} color={color} />);
  }

  return stripe;
};

const createPattern = sequence => {
  let pattern = [];

  for (let i = 0; i < sequence.length; i++) {
    const { count, color } = sequence[i];
    pattern.push(createStripe(count, color.value));
  }

  return <Pattern>{pattern}</Pattern>;
};

const App = () => {
  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [numberPalindromes, setNumberPalindromes] = useState([]);
  const [pickedColors, setPickedColors] = useState([]);
  const [colorSequences, setColorSequences] = useState([]);

  useEffect(() => {
    // console.log(numberPalindromes);
    // console.log(colorSequences);
  });

  const makeArrays = () => {
    setNumberPalindromes(createNumberPalindromes(stripeCount, magnitude));
    setColorSequences(createColorPatterns(stripeCount, pickedColors.length));
  };

  const createNumberPalindromes = (length, total) => {
    let results = [];

    if (length === 1 && total > 0) {
      results.push([total]);
    } else if (length === 2 && total % 2 === 0 && total > 0) {
      results.push([total / 2, total / 2]);
    } else if (2 < length && length <= total) {
      for (let i = 1; i <= total / 2; i++) {
        const middles = createNumberPalindromes(length - 2, total - 2 * i);
        middles.forEach(middle => results.push([i].concat(middle, [i])));
      }
    }
    return results;
  };

  const updatePickedColors = newColor => {
    let newPickedColors = JSON.parse(JSON.stringify(pickedColors));
    if (
      pickedColors.length < 3 &&
      pickedColors.find(color => color.value === newColor.value) === undefined
    ) {
      newPickedColors.push(newColor);
      setPickedColors(newPickedColors);
    } else if (pickedColors.find(color => color.value === newColor.value)) {
      const filteredColors = pickedColors.filter(
        color => color.value !== newColor.value
      );
      setPickedColors(filteredColors);
    }
  };

  const range = n => {
    let output = [];
    for (let i = 0; i < n; i++) {
      output.push(i);
    }
    return output;
  };

  const allPatterns = (length, n) => {
    if (length === 1) {
      return range(n).map(x => [x]);
    } else {
      return allPatterns(length - 1, n).flatMap(pattern => {
        return range(n).map(x => pattern.concat([x]));
      });
    }
  };

  const createColorPatterns = (length, count) => {
    let results = [];

    if (length % 2 === 0) {
      const all = allPatterns(count, length / 2);
      console.log("all patterns before mirrorEvenArrays", all);
      results.push(mirrorEvenArrays(all));
    } else if (length % 2 !== 0) {
      results.push(allPatterns(count, (length + 1) / 2));
    }

    return results;
  };

  const mirrorEvenArrays = arrays => {
    return arrays.map(arr => {
      console.log("arr before anything", arr);
      let newArr = arr.slice();
      console.log("newArr", newArr);
      newArr.reverse();
      console.log("reversed newArr", newArr);
      arr = arr.concat(newArr);
      console.log("arr concatted with newArr", arr);
      return arr;
    });
  };

  // const createPatternObjects = () => {
  //   const results = [];

  //   for (let i = 0; i < numberPalindromes.length; i++) {
  //     for (let j = 0; j < colorSequences.length; j++) {
  //       results.push();
  //     }
  //   }
  // };

  return (
    <Container>
      <SelectContainer>
        <SelectHeader>Select stripe count</SelectHeader>
        <Select
          options={stripeOptions}
          onChange={option => {
            setStripeCount(Number(option.value));
            setMagnitude(null);
            setMagnitudeOptions(createMagnitudeOptions(option.value));
          }}
        />
        <SelectHeader>Select magnitude</SelectHeader>
        <Select
          options={magnitudeOptions}
          value={magnitude && { value: magnitude, label: magnitude }}
          onChange={option => {
            setMagnitude(Number(option.value));
          }}
        />
        <PickedColors>
          {pickedColors.length > 0 &&
            pickedColors.map(color => (
              <Swatch
                key={Math.random()}
                color={color.value}
                onClick={() => updatePickedColors(color)}
              />
            ))}
        </PickedColors>
        <SwatchContainer>
          {colors.map(color => (
            <Swatch
              key={Math.random()}
              color={color.value}
              onClick={() => updatePickedColors(color)}
            />
          ))}
        </SwatchContainer>
        <ButtonContainer>
          {stripeCount && magnitude && colorSequences && (
            <Button onClick={makeArrays}>Make arrays</Button>
          )}
        </ButtonContainer>
      </SelectContainer>
      <StripesContainer>
        {/* {pickedColors.length > 0 &&
          setNumberPalindromes.map(sequence => createPattern(sequence))} */}
      </StripesContainer>
    </Container>
  );
};

export default App;
