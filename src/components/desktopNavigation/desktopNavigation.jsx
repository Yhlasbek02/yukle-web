import React, { useState, useEffect } from 'react';
import { NavStyled, Username, MenuItem, Li } from '../../styles/mainStyle';
import { FiBell } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import LanguageSelect from '../../utils/languageSelect';
import Filter from '../mainNavigation/filter/Filter';
import { Item, MenuItems, MenuStyle, Title, Link } from '../mainNavigation/menu/style';
import main from "../../assets/Home_icon.svg";
import cargo from "../../assets/cargo.svg";
import cargoActive from "../../assets/Cargo_active.svg";
import transport from "../../assets/trans_white.svg";
import transportActive from "../../assets/transpor.svg";
import user from "../../assets/user.svg";
import menuNot from "../../assets/Home_not.svg"
import userActive from "../../assets/User_active.svg";
import homeMobile from "../../assets/home_mobile.svg";
import cargoMobile from "../../assets/cargo_mobile.svg";
import transportMobile from "../../assets/transport_mobile.svg";
import profileMobile from "../../assets/profile_mobile.svg";

const Navigation = ({ translation, profile, selectedLanguage, setSelectedLanguage, notificationsActive, handleLinkClick, activeLink, isRight, setIsRight, isMenuOpen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
        setSelectedLanguage(storedLanguage);
    }, [setSelectedLanguage]);

    return (
        <NavStyled $isMenuOpen={isMenuOpen}>
            {isMobile ? (
                <MenuItem>
                    <Item onClick={() => handleLinkClick('Main')}>
                        <img src={homeMobile} alt="" style={{ width: "40px", height: "45px" }} />
                    </Item>
                    <Item onClick={() => handleLinkClick('Cargo')}>
                        <img src={cargoMobile} alt="" style={{ width: "40px", height: "45px" }} />
                    </Item>
                    <Item onClick={() => handleLinkClick('Transport')}>
                        <img src={transportMobile} alt="" style={{ width: "40px", height: "45px" }} />
                    </Item>
                    <Item onClick={() => handleLinkClick('Profile')}>
                        <img src={profileMobile} alt="" style={{ width: "40px", height: "45px" }} />
                    </Item>
                </MenuItem>
            ) : (
                <MenuItem>
                    <Li>
                        <Username>
                            <div className="left">
                                <h4>{translation.greeting},</h4>
                                <h3>
                                    {profile.name} {profile.surname}
                                </h3>
                            </div>
                            <div className="right">
                                <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                                {notificationsActive ? (
                                    <FaBell style={{ marginTop: "7px", fontSize: "1.5rem" }} onClick={() => handleLinkClick('Notification')} />
                                ) : (
                                    <FiBell style={{ marginTop: "7px", fontSize: "1.5rem" }} onClick={() => handleLinkClick('Notification')} />
                                )}
                            </div>
                        </Username>
                    </Li>
                    <Li>
                        <MenuStyle>
                            <Title>{translation.menu}</Title>
                            <hr />
                            <MenuItems>
                                <Item onClick={() => handleLinkClick('Main')}>
                                    <img src={activeLink === 'Main' ? main : menuNot} alt="menu_icon" />
                                    <Link className={activeLink === 'Main' ? 'active' : ''}>
                                        {translation.menu}
                                    </Link>
                                </Item>
                                <hr />
                                <Item onClick={() => handleLinkClick('Cargo')}>
                                    <img src={activeLink === 'Cargo' ? cargoActive : cargo} alt="" style={{ width: "33px", height: "33px" }} />
                                    <Link className={activeLink === 'Cargo' ? 'active' : ''}>
                                        {translation.my_cargo}
                                    </Link>
                                </Item>
                                <hr />
                                <Item onClick={() => handleLinkClick('Transport')}>
                                    <img src={activeLink === 'Transport' ? transportActive : transport} alt="" />
                                    <Link className={activeLink === 'Transport' ? 'active' : ''}>
                                        {translation.my_transport}
                                    </Link>
                                </Item>
                                <hr />
                                <Item onClick={() => handleLinkClick('Profile')}>
                                    <img src={activeLink === 'Profile' ? userActive : user} alt="" />
                                    <Link className={activeLink === 'Profile' ? 'active' : ''}>
                                        {translation.profile}
                                    </Link>
                                </Item>
                            </MenuItems>
                        </MenuStyle>
                    </Li>
                    <Li>
                        <Filter language={selectedLanguage} isRight={isRight} setIsRight={setIsRight} setIsModalOpen={true} />
                    </Li>
                </MenuItem>
            )}

        </NavStyled>
    );
};

export default Navigation;
