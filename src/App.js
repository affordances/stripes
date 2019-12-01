import React, { useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import './index.css';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`

const SelectContainer = styled.div`
  width: 150px;
  margin-right: 20px;
`

const SelectHeader = styled.h5``

const StripesContainer = styled.div``

const Stripe = styled.div`
  background: ${props => props.color}
  height: 38px;
  width: 600px;
`

function App() {
  const colors = {
    'red': '#367da2',
    'blue': '#e93f36',
    'black': 'black'
  }

  const stripeBox = ['red', 'blue', 'black'];

  const maxStripeCount = 16

  const createOptions = (start, end) => {
    let options = []
      for (let i = start; i <= end; i++) {
        const num = i.toString()
        options.push({ value: num, label: num })
    }
    return options
  }

  const [stripeCount, setStripeCount] = useState(maxStripeCount)
  const [stripeOptions, setStripeOptions] = useState(createOptions(1, maxStripeCount))
  const [magnitude, setMagnitude] = useState(maxStripeCount)
  const [magnitudeOptions, setMagnitudeOptions] = useState(createOptions(stripeCount, maxStripeCount))

  return (
    <Container>
      <SelectContainer>
        <SelectHeader>Select stripe count</SelectHeader>
        <Select options={stripeOptions} onChange={(option) => setMagnitudeOptions(createOptions(option.value, maxStripeCount))} />
        <SelectHeader>Select magnitude</SelectHeader>
        <Select options={magnitudeOptions} />
      </SelectContainer>
      <StripesContainer>
        {stripeBox.map((stripe, i) => (
            <Stripe key={i} color={colors[stripeBox[i]]} />
          )
        )}
        </StripesContainer>
    </Container>
  );
}

export default App
