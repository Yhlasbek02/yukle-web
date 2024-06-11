import React, { useState, useEffect } from 'react';
import {
  Button, Buttons, Delete, FirstLine, Line, LogOut, SecondLine, SingleInfo,
  SupportTitle, TextArea, ThirdInfo, Title, Window, ModalBackdrop,
  ModalButton, ModalButtons, ModalContent, ModalTitle, InputField
} from './style';
import enData from "../../utils/locales/en/profile.json";
import ruData from "../../utils/locales/ru/profile.json";
import trData from "../../utils/locales/tr/profile.json";
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate, useLocation } from "react-router-dom";
import { Mobile, ProfileMobile } from '../../utils/switchButtons.jsx/style';
const Profile = ({language}) => {
  const [translation, setTranslations] = useState(enData);
  const [profile, setProfile] = useState({});
  const [notifications, setNotifications] = useState({
    transport: false,
    cargo: false,
  });
  const { getProfile, changeNotification, deleteUser, changeAccount, addMessage } = useGlobalContext();
  const [profileLanguage, setProfileLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [desktopLanguage, setDesktopLanguage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const loadTranslations = (language) => {
    switch (language) {
      case 'en':
        setTranslations(enData);
        setDesktopLanguage("English")
        break;
      case 'ru':
        setTranslations(ruData);
        setDesktopLanguage("Русский");
        break;
      case 'tr':
        setTranslations(trData);
        setDesktopLanguage("Türkçe")
        break;
      default:
        setTranslations(enData);
        setDesktopLanguage("English");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => {
    setName(profile.name || '');
    setSurname(profile.surname || '');
    setPhoneNumber(profile.phoneNumber || '');
    setEmail(profile.email || '');
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);
  const confirmDelete = async () => {
    await handleDelete(profileLanguage);
    closeModal();
  };

  const handleEditAccount = async () => {
    try {
      const isSuccess = await changeAccount(profileLanguage, name, surname, phoneNumber, email);
      if (isSuccess) {
        setIsEditModalOpen(false);
        fetchProfile(profileLanguage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async (lang) => {
    try {
      const data = await getProfile(lang);
      setProfile(data);
      setNotifications({
        transport: data.transportNotification,
        cargo: data.cargoNotification,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (lang) => {
    try {
      await deleteUser(lang);
      navigate(`/${lang}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/${profileLanguage}`);
  };

  const handleSendMessage = async () => {
    try {
      const isSuccess = await addMessage(text, profileLanguage);
      if (isSuccess) {
        setText('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTranslations();
    fetchProfile(language);
  }, [language]);

  const handleCheckboxChange = async (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked,
    });
    try {
      await changeNotification(language, name);
    } catch (error) {
      console.error("Failed to change:", error);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setProfileLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    const currentPathname = location.pathname;
    const newPath = currentPathname.replace(/\/(en|ru|tr)$/, `/${selectedLanguage}`);
    navigate(newPath);
    loadTranslations(selectedLanguage);
    fetchProfile(selectedLanguage);
  };

  return (
    <Window>
      <ProfileMobile>
        <Title>{translation.title}</Title>
      </ProfileMobile>
      <FirstLine>
        <Title>{translation.title}</Title>
        <Buttons>
          <LogOut onClick={openEditModal}>{translation.edit_account}</LogOut>
          <LogOut onClick={handleLogout}>{translation.logout}</LogOut>
          <Delete onClick={openModal}>{translation.delete}</Delete>
        </Buttons>
      </FirstLine>
      <SecondLine>
        <Line>
          <SingleInfo>
            <span>{translation.name}</span>
            <h3>
              {profile.name} {profile.surname}
            </h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.mobile_number}</span>
            <h3>{profile.phoneNumber || ''}</h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.email}</span>
            <h3>{profile.email}</h3>
          </SingleInfo>
        </Line>
        <Line>
          <SingleInfo id='mobile'>
            <span>{translation.language}</span>
            <select value={profileLanguage} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="tr">Türkçe</option>
            </select>
          </SingleInfo>
          <SingleInfo id='desktop'>
            <span>{translation.language}</span>
            <h3>{desktopLanguage}</h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.notifications}</span>
            <label>
              <h3>{translation.transport}</h3>
              <input
                type="checkbox"
                name="transport"
                checked={notifications.transport}
                onChange={handleCheckboxChange}
              />
            </label>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.notifications}</span>
            <label>
              <h3>{translation.cargo}</h3>
              <input
                type="checkbox"
                name="cargo"
                checked={notifications.cargo}
                onChange={handleCheckboxChange}
              />
            </label>
          </SingleInfo>
        </Line>
      </SecondLine>
      <ThirdInfo>
        <SupportTitle>{translation.support_title}</SupportTitle>
        <TextArea
          placeholder={translation.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Button onClick={handleSendMessage}>{translation.button}</Button>
      </ThirdInfo>

      {isModalOpen && (
        <ModalBackdrop>
          <ModalContent>
            <ModalTitle>{translation.modalTitle}</ModalTitle>
            <p>{translation.modalMessage}</p>
            <ModalButtons>
              <ModalButton onClick={confirmDelete}>
                {translation.confirm}
              </ModalButton>
              <ModalButton onClick={closeModal}>
                {translation.cancel}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalBackdrop>
      )}

      {isEditModalOpen && (
        <ModalBackdrop>
          <ModalContent>
            <ModalTitle>{translation.change_account}</ModalTitle>
            <InputField
              type="text"
              placeholder={translation.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              type="text"
              placeholder={translation.surname}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <InputField
              type="text"
              placeholder={translation.mobile_number}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputField
              type="email"
              placeholder={translation.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ModalButtons>
              <ModalButton onClick={handleEditAccount}>
                {translation.save_button}
              </ModalButton>
              <ModalButton onClick={closeEditModal}>
                {translation.cancel}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalBackdrop>
      )}
    </Window>
  );
};

export default Profile;
