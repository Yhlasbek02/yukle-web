import React, { useState } from 'react'
import cargoSvg from "../../assets/cargo.svg"
import transport from "../../assets/transport.svg"
import cargoActiveSvg from "../../assets/cargoActive.svg"
import transportActiveSvg from "../../assets/transActive.svg"
import { SwitchButtonWrapper, ToggleButton, SwitchButtonContainer, FormBox, ButtonBox, SwitchButtonLabel, SwitchButton } from '../../utils/switchButtons.jsx/style'
import Pagination from '../../utils/paginationTag/pagination';
import TransportNotifications from '../transportNotifications/transportNotifications'
import CargoNotifications from '../cargoNotifications/cargoNotifications'
import { Title, Window } from './style'
const SwitchButtonComponent = ({ isRight, handleClick }) => {
  return (
    <SwitchButtonWrapper>
      <ToggleButton isActive={!isRight} onClick={handleClick}>
        <div style={{ display: "flex", width: "50%", justifyContent: "center", alignItems: 'center' }}><img src={isRight ? cargoSvg : cargoActiveSvg} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{ marginLeft: "10px" }}>Cargo</span> </div>
      </ToggleButton>
      <SwitchButtonContainer>
        <SwitchButtonLabel></SwitchButtonLabel>
        <SwitchButton isRight={isRight} />
      </SwitchButtonContainer>
      <ToggleButton isActive={isRight} onClick={handleClick}>
        <div style={{ display: "flex", width: '50%', justifyContent: "center", alignItems: 'center' }}><img src={isRight ? transportActiveSvg : transport} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{ marginLeft: "10px" }}> Transport</span></div>
      </ToggleButton>
    </SwitchButtonWrapper>
  );
};

export default function Notifications() {
  const [isRight, setIsRight] = useState(false);

  const handleToggle = () => {
    setIsRight(prevState => !prevState);
  };
  return (
    <>
      <Window>
        <FormBox>
          <ButtonBox>
            <SwitchButtonComponent isRight={isRight} handleClick={handleToggle} />
          </ButtonBox>
        </FormBox>
        {isRight ? (
          <>
            <TransportNotifications />
          </>

        ) : (
          <>
            <CargoNotifications />
          </>
        )}
        <Pagination />
      </Window>
      
      {/* <h3>Notifications</h3> */}

    </>
  )
}
