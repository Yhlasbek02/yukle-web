import React, { useState, useEffect } from 'react';
import { AppStyled, MainLayout, NavStyled, Username } from '../../styles/mainStyle';
import Buttons from '../../utils/switchButtons.jsx/buttons';
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
import MyCargo from '../my-cargo/MyCargo';
import Profile from '../profile/Profile';
import Notifications from '../notifications/Notifications';
import MyTransport from '../my-transport/MyTransport';
import menuNot from "../../assets/Home_not.svg"
import userActive from "../../assets/User_active.svg";
import enData from "../../utils/locales/en/menu.json";
import ruData from "../../utils/locales/ru/menu.json";
import trData from "../../utils/locales/tr/menu.json";
import { useGlobalContext } from '../../context/globalContext';

const getLanguageFromPath = () => {
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const lastPart = parts[parts.length - 1];
  if (['en', 'ru', 'tr'].includes(lastPart)) {
    return lastPart;
  } else {
    return 'en';
  }
};

export default function Main() {
  const [translation, setTranslations] = useState(enData);
  const [profile, setProfile] = useState({});
  const [isRight, setIsRight] = useState(false);
  const {getProfile} = useGlobalContext();
  const [activeLink, setActiveLink] = useState('Main');
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    return storedLanguage || getLanguageFromPath();
  });

  const loadTranslations = () => {
    switch (selectedLanguage) {
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
    fetchProfile(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    const lastButtonState = localStorage.getItem('isRight');
    setIsRight(lastButtonState === 'true');
  }, []);

  useEffect(() => {
    const storedActiveLink = localStorage.getItem('activeLink');
    setActiveLink(storedActiveLink || 'Main');
  }, []);

  const fetchProfile = async (lang) => {
    try {
      const data = await getProfile(lang);
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link === 'Notification') {
      setNotificationsActive(true);
    } else {
      setNotificationsActive(false);
    }
    localStorage.setItem('activeLink', link);
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'Main':
        return <Buttons language={selectedLanguage} isRight={isRight} setIsRight={setIsRight} />;
      case 'Cargo':
        return <MyCargo language={selectedLanguage} />;
      case 'Transport':
        return <MyTransport language={selectedLanguage} />;
      case 'Profile':
        return <Profile language={selectedLanguage} />;
      case 'Notification':
        return <Notifications language={selectedLanguage} />;
      default:
        return null;
    }
  };

  return (
    <AppStyled>
      <MainLayout>
        <NavStyled>
          <div className="menu-items">
            <li>
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
                    <FaBell style={{ marginTop: "7px", fontSize: "1.5rem" }} onClick={() => handleLinkClick('Notification')} /> // Render active bell icon
                  ) : (
                    <FiBell style={{ marginTop: "7px", fontSize: "1.5rem" }} onClick={() => handleLinkClick('Notification')} /> // Render normal bell icon
                  )}
                </div>
              </Username>
            </li>
            <li>
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
                    <img src={activeLink === 'Cargo' ? cargoActive : cargo} alt="" style={{width: "33px", height: "33px"}} />
                    <Link className={activeLink === 'Cargo' ? 'active' : ''}>
                      {translation.my_cargo}
                    </Link>
                  </Item>
                  <hr />
                  <Item onClick={() => handleLinkClick('Transport')}>
                    <img src={activeLink === 'Transport' ? transportActive : transport} alt="" />
                    <Link
                      className={activeLink === 'Transport' ? 'active' : ''}
                    >
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
            </li>
            <li>
            <Filter language={selectedLanguage} isRight={isRight} setIsRight={setIsRight} />
            </li>
          </div>
        </NavStyled>
        <main>{renderContent()}</main>
      </MainLayout>
    </AppStyled>
  );
}
