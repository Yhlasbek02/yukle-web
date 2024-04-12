import React, { useState } from 'react'
import cargoSvg from "../../assets/cargo.svg"
import transport from "../../assets/transport.svg"
import cargoActiveSvg from "../../assets/cargoActive.svg"
import transportActiveSvg from "../../assets/transActive.svg"
import { SwitchButtonWrapper, ToggleButton, SwitchButtonContainer, FormBox, ButtonBox, SwitchButtonLabel, SwitchButton } from './style';
import Cargo from '../../components/cargoContainer/cargo'
import Transport from '../../components/transportContainer/transport'
import Pagination from '../paginationTag/pagination'
const SwitchButtonComponent = ({ isRight, handleClick }) => {
    return (
        <SwitchButtonWrapper>
            <ToggleButton isActive={!isRight} onClick={handleClick}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}><img src={isRight ? cargoSvg : cargoActiveSvg} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{marginLeft: "10px"}}>Cargo</span> </div>
            </ToggleButton>
            <SwitchButtonContainer>
                <SwitchButtonLabel></SwitchButtonLabel>
                <SwitchButton isRight={isRight} />
            </SwitchButtonContainer>
            <ToggleButton isActive={isRight} onClick={handleClick}>
                <div style={{ display: "flex", width: '50%', justifyContent: "center", alignItems: 'center' }}><img src={isRight ? transportActiveSvg : transport} alt="" style={{ width: '1.2rem', height: '1.2rem'}} /><span style={{marginLeft: "10px"}}> Transport</span></div>
            </ToggleButton>
        </SwitchButtonWrapper>
    );
};


export default function Buttons() {
    const [isRight, setIsRight] = useState(false);

    const handleToggle = () => {
        setIsRight(prevState => !prevState);
    };
    return (
        <>
        <FormBox>
            <ButtonBox>
                <SwitchButtonComponent isRight={isRight} handleClick={handleToggle} />
            </ButtonBox>
        </FormBox>
        {isRight ? (
            <>
            <Transport />
            </>
            
        ) : (
            <Cargo />
        )}
        <Pagination />
        </>
    )
}
