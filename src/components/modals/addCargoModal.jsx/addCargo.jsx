import React, { useEffect, useState, useRef } from 'react'
import { ModalContainer, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, ModalCouple, ChildCouple, ModalOption, ModalTextArea } from './style';
import enData from "../../../utils/locales/en/add_cargo.json";
import ruData from "../../../utils/locales/ru/add_cargo.json";
import trData from "../../../utils/locales/tr/add_cargo.json";
import { useGlobalContext } from '../../../context/globalContext';
export default function AddCargoModal({ onClose, language }) {
    const modalRef = useRef();
    const [translation, setTranslations] = useState(enData);
    const [countries, setCountries] = useState([]);
    const [cargoTypes, setCargoTypes] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [citiesFrom, setCitiesFrom] = useState([]);
    const [citiesTo, setCitiesTo] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [fromCountryId, setFromCountryId] = useState('');
    const [toCountryId, setToCountryId] = useState('');
    const [citySelectFromDisabled, setCitySelectFromDisabled] = useState(true);
    const [citySelectToDisabled, setCitySelectToDisabled] = useState(true);
    const { getCountries, getCities, getCargoTypes, getTransportTypes } = useGlobalContext();
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

    const fetchCargoTypes = async (lang) => {
        try {
            const data = await getCargoTypes(lang);
            setCargoTypes(data.types);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchTransportTypes = async (lang) => {
        try {
            const data = await getTransportTypes(lang);
            setTransportTypes(data.types);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCountries = async (lang, searchKey) => {
        try {
            const data = await getCountries(lang, searchKey);
            setCountries(data.countries);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCities = async (lang, searchKey, countryId, type) => {
        const data = await getCities(lang, searchKey, countryId);
        if (type === 'from') {
            setCitiesFrom(data.cities);
            setCitySelectFromDisabled(false);
        } else {
            setCitiesTo(data.cities);
            setCitySelectToDisabled(false);
        }
    }

    const handleTypes = () => {
        fetchCargoTypes(language);
    };

    const handleTransportTypes = () => {
        fetchTransportTypes(language);
    };

    const handleFromCountryChange = (e) => {
        const selectedCountryId = e.target.value;
        setFromCountryId(selectedCountryId);
        fetchCities(language, searchKey, selectedCountryId, 'from');
    };
    const handleToCountryChange = (e) => {
        const selectedCountryId = e.target.value;
        setToCountryId(selectedCountryId);
        fetchCities(language, searchKey, selectedCountryId, 'to');
    };

    const getCargoTypeNames = (type) => {
        switch (language) {
            case 'en':
                return type.nameEn;
            case 'ru':
                return type.nameRu;
            case 'tr':
                return type.nameTr;
            default:
                return type.nameEn
        }
    }
    const getCountryName = (country) => {
        switch (language) {
            case 'en':
                return country.nameEn;
            case 'ru':
                return country.nameRu;
            case 'tr':
                return country.nameTr;
            default:
                return country.nameEn;
        }
    };

    const getCityName = (city) => {
        switch (language) {
            case 'en':
                return city.nameEn;
            case 'ru':
                return city.nameRu;
            case 'tr':
                return city.nameTr;
            default:
                return city.nameEn;
        }
    };
    useEffect(() => {
        loadTranslations();
        fetchCargoTypes(language);
        fetchTransportTypes(language);
        fetchCountries(language, '')
    }, [language]);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <ModalOverlay>
            <ModalContainer ref={modalRef}>
                <ModalContent>
                    <ModalHeader>
                        {translation.title}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor="">
                            {translation.type}
                        </label>
                        <select name="" id="" onChange={handleTypes}>
                            {cargoTypes.map((type) => {
                                return (
                                    <ModalOption key={type.id} value={type.id}>{getCargoTypeNames(type)}</ModalOption>
                                );
                            })}
                        </select>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.from_country}
                                </label>
                                <select name="" id="" onChange={handleFromCountryChange}>
                                    {countries.map((country) => (
                                        <ModalOption key={country.id} value={country.id}>{getCountryName(country)}</ModalOption>
                                    ))}
                                </select>
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.from_city}
                                </label>
                                <select name="" id="" disabled={citySelectFromDisabled}>
                                    {citiesFrom.map((city) => (
                                        <ModalOption key={city.id} value={city.id}>{getCityName(city)}</ModalOption>
                                    ))}
                                </select>
                            </ChildCouple>

                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.to_country}
                                </label>
                                <select name="" id="" onChange={handleToCountryChange}>
                                    {countries.map((country) => (
                                        <ModalOption key={country.id} value={country.id}>{getCountryName(country)}</ModalOption>
                                    ))}
                                </select>
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.to_city}
                                </label>
                                <select name="" id="" disabled={citySelectToDisabled}>
                                    {citiesTo.map((city) => (
                                        <ModalOption key={city.id} value={city.id}>{getCityName(city)}</ModalOption>
                                    ))}
                                </select>
                            </ChildCouple>

                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.weight}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="" onChange={handleTransportTypes}>
                                    {translation.type_transport}
                                </label>
                                <select name="" id="">
                                    {transportTypes.map((type) => {
                                        return (
                                            <ModalOption key={type.id} value={type.id}>{getCargoTypeNames(type)}</ModalOption>
                                        );
                                    })}
                                </select>
                            </ChildCouple>
                        </ModalCouple>

                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.name}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.number}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.email}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.whatsApp}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                        </ModalCouple>

                        <label htmlFor="">
                            {translation.additional}
                        </label>
                        <ModalTextArea />
                    </ModalBody>
                    <ModalFooter><button>
                        {translation.add}
                    </button></ModalFooter>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay >
    );
}
