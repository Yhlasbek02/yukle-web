import React, { useState } from 'react'
import cargoSvg from "../../../assets/cargo.svg"
import transport from "../../../assets/transport.svg"
import cargoActiveSvg from "../../../assets/cargoActive.svg"
import transportActiveSvg from "../../../assets/Trans.svg"
import { ButtonBox, FilterStyle, SwitchButtonWrapper, Text, FormBox, SwitchButtonContainer, SwitchButtonLabel, SwitchButton, ToggleButton, StyledLabel, StyledInput, StyledSelect, ButtonContainer, SearchButton } from './style'
const SwitchButtonComponent = ({ isRight, handleClick }) => {
  return (
    <SwitchButtonWrapper>
      <ToggleButton isActive={!isRight} onClick={handleClick}>
      <div style={{ display: "flex" }}><img src={isRight ? cargoSvg : cargoActiveSvg} alt="" style={{ width: '1.2rem' }} /><span style={{marginLeft: "10px"}}>Cargo</span> </div>
      </ToggleButton>
      <SwitchButtonContainer>
        <SwitchButtonLabel></SwitchButtonLabel>
        <SwitchButton isRight={isRight} />
      </SwitchButtonContainer>
      <ToggleButton isActive={isRight} onClick={handleClick}>
      <div style={{ display: "flex"}}><img src={isRight ? transportActiveSvg : transport} alt="" style={{ width: '1.2rem'}} /><span style={{marginLeft: "10px"}}> Transport</span></div>
      </ToggleButton>
    </SwitchButtonWrapper>
  );
};


export default function Filter() {
  const [isRight, setIsRight] = useState(false);

  const handleToggle = () => {
    setIsRight(prevState => !prevState);
  };
  return (
    <FilterStyle>
      <Text>Filter</Text>
      <FormBox>
        <ButtonBox>
          <SwitchButtonComponent isRight={isRight} handleClick={handleToggle} />
        </ButtonBox>
      </FormBox>
      {isRight ? (
        <div>
          <StyledLabel htmlFor="type">Type of transport</StyledLabel>
          <StyledSelect id="type">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="location">Belongs To</StyledLabel>
          <StyledSelect id="location">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="affiliation">From</StyledLabel>
          <StyledSelect id="affiliation">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
        </div>
      ) : (
        <div>
          <StyledLabel htmlFor="type">Type of cargo</StyledLabel>
          <StyledSelect id="type">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="from">From</StyledLabel>
          <StyledSelect id="from">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="to">To</StyledLabel>
          <StyledSelect id="to">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="weight">Weight</StyledLabel>
          <StyledInput type="number" id="weight" />
        </div>
      )}
      <ButtonContainer>
        <SearchButton>Search</SearchButton>
      </ButtonContainer>
      
    </FilterStyle>
  )
}
