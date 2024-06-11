import React, { useState, useEffect } from 'react';
import { AppStyled, Backdrop, MainLayout, MainPages, MenuIcon } from '../../styles/mainStyle';
import Buttons from '../../utils/switchButtons.jsx/buttons';
import MyCargo from '../my-cargo/MyCargo';
import Profile from '../profile/Profile';
import Notifications from '../notifications/Notifications';
import MyTransport from '../my-transport/MyTransport';
import enData from "../../utils/locales/en/menu.json";
import ruData from "../../utils/locales/ru/menu.json";
import trData from "../../utils/locales/tr/menu.json";
import { useGlobalContext } from '../../context/globalContext';
import Navigation from '../desktopNavigation/desktopNavigation';
import { CgMenuLeft } from "react-icons/cg";
import { FaChevronLeft } from "react-icons/fa";
import Support from '../support/Support';

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
  const { getProfile } = useGlobalContext();
  const [activeLink, setActiveLink] = useState('Main');
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    return storedLanguage || getLanguageFromPath();
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (storedActiveLink === "Notification") {
      setNotificationsActive(true);
    }
  }, []);

  const fetchProfile = async (lang) => {
    try {
      const data = await getProfile(lang);
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
    setIsMenuOpen(false);
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
      case 'Support':
        return <Support />;
      default:
        return null;
    }
  };

  return (
    <AppStyled>
      <MainLayout>
        <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CgMenuLeft color='#fff' style={{ marginLeft: "0.5rem", marginTop: "1rem" }} /> : <FaChevronLeft color='#4D9FFF' style={{ marginLeft: "0.5rem", marginTop: "1rem" }} />}
        </MenuIcon>
        <Backdrop $isMenuOpen={!isMenuOpen} onClick={() => setIsMenuOpen(false)} />
        <Navigation
          translation={translation}
          profile={profile}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          notificationsActive={notificationsActive}
          handleLinkClick={handleLinkClick}
          activeLink={activeLink}
          isRight={isRight}
          setIsRight={setIsRight}
          isMenuOpen={!isMenuOpen}
        />
        <MainPages>{renderContent()}</MainPages>
      </MainLayout>
    </AppStyled>
  );
}
