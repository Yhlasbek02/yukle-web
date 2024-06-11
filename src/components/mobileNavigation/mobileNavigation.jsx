import React from "react";
import { MobileNavStyled, MobileMenuIcon, MobileLink, MobileMenuItems, MobileMenuItem } from "./style";
import { FiBell } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import LanguageSelect from "../../utils/languageSelect";
import main from "../../assets/Home_icon.svg"
import cargo from "../../assets/cargo.svg"
import cargoActive from "../../assets/Cargo_active.svg";
import transport from "../../assets/trans_white.svg";
import transportActive from "../../assets/transpor.svg";
import user from "../../assets/user.svg";
import menuNot from "../../assets/Home_not.svg";
import userActive from "../../assets/User_active.svg";


const MobileNavigation = ({ translation, profile, selectedLanguage, setSelectedLanguage, notificationsActive, handleLinkClick, activeLink }) => {
    return (
      <MobileNavStyled>
        <div className="header">
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
          {notificationsActive ? (
            <FaBell style={{ marginTop: "7px", fontSize: "1.5rem" }} onClick={() => handleLinkClick('Notification')} />
          ) : (
            <FiBell style={{ marginTop: "7px", fontSize: "1.5rem" }} onClick={() => handleLinkClick('Notification')} />
          )}
        </div>
        <MobileMenuItems>
          <MobileMenuItem onClick={() => handleLinkClick('Main')}>
            <img src={activeLink === 'Main' ? main : menuNot} alt="menu_icon" />
            <MobileLink className={activeLink === 'Main' ? 'active' : ''}>
              {translation.menu}
            </MobileLink>
          </MobileMenuItem>
          <MobileMenuItem onClick={() => handleLinkClick('Cargo')}>
            <img src={activeLink === 'Cargo' ? cargoActive : cargo} alt="" style={{ width: "33px", height: "33px" }} />
            <MobileLink className={activeLink === 'Cargo' ? 'active' : ''}>
              {translation.my_cargo}
            </MobileLink>
          </MobileMenuItem>
          <MobileMenuItem onClick={() => handleLinkClick('Transport')}>
            <img src={activeLink === 'Transport' ? transportActive : transport} alt="" />
            <MobileLink className={activeLink === 'Transport' ? 'active' : ''}>
              {translation.my_transport}
            </MobileLink>
          </MobileMenuItem>
          <MobileMenuItem onClick={() => handleLinkClick('Profile')}>
            <img src={activeLink === 'Profile' ? userActive : user} alt="" />
            <MobileLink className={activeLink === 'Profile' ? 'active' : ''}>
              {translation.profile}
            </MobileLink>
          </MobileMenuItem>
        </MobileMenuItems>
      </MobileNavStyled>
    );
  };
  
  export default MobileNavigation;