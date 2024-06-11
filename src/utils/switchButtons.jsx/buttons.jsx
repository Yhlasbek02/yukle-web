import React, { useState, useEffect } from 'react'
import cargoSvg from "../../assets/cargo.svg"
import transport from "../../assets/transport.svg"
import cargoActiveSvg from "../../assets/cargoActive.svg"
import transportActiveSvg from "../../assets/transActive.svg"
import { SwitchButtonWrapper, ToggleButton, SwitchButtonContainer, FormBox, ButtonBox, SwitchButtonLabel, SwitchButton, MobileContainer, DesktopContainer, MobileProfile, Text } from './style';
import Cargo from '../../components/cargoContainer/cargo'
import Transport from '../../components/transportContainer/transport'
import enData from "../../utils/locales/en/button.json";
import ruData from "../../utils/locales/ru/button.json";
import trData from "../../utils/locales/tr/button.json";
import { FiBell, FiFilter } from 'react-icons/fi'
import { useGlobalContext } from '../../context/globalContext'
const SwitchButtonComponent = ({ isRight, handleClick, language }) => {
    const [translation, setTranslations] = useState(enData);
    const loadTranslations = () => {
        switch (language) {
            case 'en':
                setTranslations(enData);
                break;
            case 'ru':
                setTranslations(ruData);
                break;
            case 'tr':
                setTranslations(trData);
                break;
            default:
                setTranslations(enData);
        }
    };

    useEffect(() => {
        loadTranslations();
    }, [language]);
    return (
        <SwitchButtonWrapper>
            <ToggleButton $isActive={!isRight} onClick={handleClick}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}><img src={isRight ? cargoSvg : cargoActiveSvg} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{ marginLeft: "10px" }}>{translation.cargo}</span> </div>
            </ToggleButton>
            <SwitchButtonContainer>
                <SwitchButtonLabel></SwitchButtonLabel>
                <SwitchButton isRight={isRight} />
            </SwitchButtonContainer>
            <ToggleButton $isActive={isRight} onClick={handleClick}>
                <div style={{ display: "flex", width: '50%', justifyContent: "center", alignItems: 'center' }}><img src={isRight ? transportActiveSvg : transport} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{ marginLeft: "10px" }}> {translation.transport}</span></div>
            </ToggleButton>
        </SwitchButtonWrapper>
    );
};


export default function Buttons({ language, isRight, setIsRight }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const { getProfile } = useGlobalContext();
    const [greeting, setGreeting] = useState('');
    const fetchProfile = async (lang) => {
        try {
            const data = await getProfile(lang);
            setName(data.name);
            setSurname(data.surname);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const lastButtonState = localStorage.getItem('isRight');
        setIsRight(lastButtonState === 'true');
        if (language === "en") {
            setGreeting('Hello');
        } else if (language === "ru") {
            setGreeting("Привет");
        } else if (language === "tr") {
            setGreeting("Merhaba");
        }
        fetchProfile(language)
    }, [greeting]);

    const handleToggle = () => {
        setIsRight(prevState => !prevState);
        localStorage.setItem('isRight', (!isRight).toString());
    };

    return (
        <>
            <MobileContainer>
                <MobileProfile>
                    <Text>
                        <h4>{greeting},</h4>
                        <h3>{name} {surname}</h3>
                    </Text>
                    <FiBell style={{ fontSize: "1.5rem", color: "#fff", marginTop: "10px" }} />
                    <FiFilter style={{ fontSize: "1.5rem", color: "#fff", marginTop: "10px", marginLeft: "7px" }} />
                </MobileProfile>
                <FormBox>
                    <ButtonBox>
                        <SwitchButtonComponent isRight={isRight} setIsRight={setIsRight} handleClick={handleToggle} language={language} />
                    </ButtonBox>
                </FormBox>
            </MobileContainer>
            <DesktopContainer>
                <FormBox>
                    <ButtonBox>
                        <SwitchButtonComponent isRight={isRight} setIsRight={setIsRight} handleClick={handleToggle} language={language} />
                    </ButtonBox>
                </FormBox>
            </DesktopContainer>
            {isRight ? (
                <>
                    <Transport language={language} />
                </>

            ) : (
                <Cargo language={language} />
            )}
        </>
    )
}
