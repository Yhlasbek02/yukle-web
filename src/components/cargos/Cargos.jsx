import React, { useState } from 'react';
import { AppStyled, MainLayout, NavStyled, Username } from '../../styles/mainStyle';
import Buttons from '../../utils/switchButtons.jsx/buttons';
import { FiBell } from 'react-icons/fi';
import { RiBellFill } from 'react-icons/ri';
import { FaBell } from 'react-icons/fa';
import LanguageSelect from '../../utils/languageSelect';
import Filter from '../mainNavigation/filter/Filter';
import { Item, MenuItems, MenuStyle, Title, Link } from '../mainNavigation/menu/style';
import main from "../../assets/Home_icon.svg";
import cargo from "../../assets/cargo.svg";
import cargoActive from "../../assets/Cargo_active.svg";
import transport from "../../assets/Trans.svg";
import user from "../../assets/user.svg";
import MyCargo from '../my-cargo/MyCargo';
import Profile from '../profile/Profile';
import Notifications from '../notifications/Notifications';
import MyTransport from '../my-transport/MyTransport';
import menuNot from "../../assets/Home_not.svg"
import userActive from "../../assets/User_active.svg";

export default function Cargos() {
  const [activeLink, setActiveLink] = useState('Main');
  const [notificationsActive, setNotificationsActive] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link === 'Notification') {
      setNotificationsActive(true);
    } else {
      setNotificationsActive(false);
    }
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'Main':
        return <Buttons />;
      case 'Cargo':
        return <MyCargo />;
      case 'Transport':
        return <MyTransport />;
      case 'Profile':
        return <Profile />;
      case 'Notification':
        return <Notifications />
    }
  };

  return (
    <AppStyled>
      <MainLayout>
        {/* <Navigation /> */}
        <NavStyled>
          <div className="menu-items">
            <li>
              <Username>
                <div className="left">
                  <h4>Hello,</h4>
                  <h3>Jelil Tuwakow</h3>
                </div>
                <div className="right">
                  <LanguageSelect />
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
                <Title>Menu</Title>
                <hr />
                <MenuItems>
                  <Item onClick={() => handleLinkClick('Main')}>
                    <img src={activeLink === 'Main' ? main : menuNot} alt="menu_icon" />
                    <Link className={activeLink === 'Main' ? 'active' : ''}>
                      Main
                    </Link>
                  </Item>
                  <hr />
                  <Item onClick={() => handleLinkClick('Cargo')}>
                    <img src={activeLink === 'Cargo' ? cargoActive : cargo} alt="" />
                    <Link className={activeLink === 'Cargo' ? 'active' : ''}>
                      My Cargo
                    </Link>
                  </Item>
                  <hr />
                  <Item onClick={() => handleLinkClick('Transport')}>
                    <img src={transport} alt="" />
                    <Link
                      className={activeLink === 'Transport' ? 'active' : ''}
                    >
                      My Transport
                    </Link>
                  </Item>
                  <hr />
                  <Item onClick={() => handleLinkClick('Profile')}>
                    <img src={activeLink === 'Profile' ? userActive : user} alt="" />
                    <Link className={activeLink === 'Profile' ? 'active' : ''}>
                      Profile
                    </Link>
                  </Item>
                </MenuItems>
              </MenuStyle>
            </li>
            <li>
              <Filter />
            </li>
          </div>
        </NavStyled>
        <main>{renderContent()}</main>
      </MainLayout>
    </AppStyled>
  );
}
