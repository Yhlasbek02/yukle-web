import React, { useEffect, useState, useRef } from 'react';
import { ModalContainer, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, ModalCouple, ChildCouple, ModalOption, ModalTextArea } from './style';
import enData from "../../../utils/locales/en/add_cargo.json";
import ruData from "../../../utils/locales/ru/add_cargo.json";
import trData from "../../../utils/locales/tr/add_cargo.json";
import { useGlobalContext } from '../../../context/globalContext';

export default function AddCargoModal({ onClose, language }) {
    const modalRef = useRef();
    const { getCountries, getCities, getCargoTypes, getTransportTypes, addCargo, getProfile } = useGlobalContext();
    const [translation, setTranslations] = useState(enData);
    const [countries, setCountries] = useState([]);
    const [cargoTypes, setCargoTypes] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [citiesFrom, setCitiesFrom] = useState([]);
    const [citiesTo, setCitiesTo] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [fromCountryId, setFromCountryId] = useState('');
    const [toCountryId, setToCountryId] = useState('');
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [cargoTypeId, setCargoTypeId] = useState(null);
    const [transportId, setTransportId] = useState(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [email, setEmail] = useState('');
    const [weight, setWeight] = useState(0);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [citySelectFromDisabled, setCitySelectFromDisabled] = useState(true);
    const [citySelectToDisabled, setCitySelectToDisabled] = useState(true);

    const loadTranslations = () => {
        const translations = {
            'en': enData,
            'ru': ruData,
            'tr': trData
        };
        setTranslations(translations[language] || enData);
    };

    const addCargoFunction = async () => {
        try {
            const data = await addCargo(
                language,
                parseInt(cargoTypeId),
                parseInt(fromCountryId),
                parseInt(fromCity),
                parseInt(toCountryId),
                parseInt(toCity),
                parseInt(weight),
                [parseInt(transportId)],
                number,
                name,
                email,
                whatsApp,
                additionalInfo
            );

            if (data) {
                console.log("added successfully");
                onClose();
            } else {
                console.log("not added");
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCargoData = async () => {
        try {
            const cargoTypesData = await getCargoTypes(language);
            setCargoTypes(cargoTypesData.types);

            const transportTypesData = await getTransportTypes(language);
            setTransportTypes(transportTypesData.types);

            const countriesData = await getCountries(language, '');
            setCountries(countriesData.countries);

            const profileData = await getProfile(language);
            setName(profileData.name);
            setEmail(profileData.email === null ? '' : profileData.email);
            setNumber(profileData.phoneNumber === null ? '' : profileData.phoneNumber);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCitiesByCountry = async (countryId, type) => {
        try {
            const citiesData = await getCities(language, searchKey, countryId);
            if (type === 'from') {
                setCitiesFrom(citiesData.cities);
                setFromCity(citiesData.cities[0]?.id || '');
                setCitySelectFromDisabled(false);
            } else {
                setCitiesTo(citiesData.cities);
                setToCity(citiesData.cities[0]?.id || '');
                setCitySelectToDisabled(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTranslations();
        fetchCargoData();
    }, [language]);

    useEffect(() => {
        if (countries.length > 0) {
            setFromCountryId(countries[0]?.id || '');
            setToCountryId(countries[0]?.id || '');
            fetchCitiesByCountry(countries[0]?.id, 'from');
            fetchCitiesByCountry(countries[0]?.id, 'to');
        }
    }, [countries]);

    useEffect(() => {
        if (cargoTypes.length > 0) {
            setCargoTypeId(cargoTypes[0]?.id || '');
        }
    }, [cargoTypes]);

    useEffect(() => {
        if (transportTypes.length > 0) {
            setTransportId(transportTypes[0]?.id || '');
        }
    }, [transportTypes]);

    const handleFromCountryChange = (e) => {
        const selectedCountryId = e.target.value;
        setFromCountryId(selectedCountryId);
        fetchCitiesByCountry(selectedCountryId, 'from');
        setCitySelectFromDisabled(false);
    };

    const handleToCountryChange = (e) => {
        const selectedCountryId = e.target.value;
        setToCountryId(selectedCountryId);
        fetchCitiesByCountry(selectedCountryId, 'to');
        setCitySelectToDisabled(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addCargoFunction();
        } catch (error) {
            console.error(error);
        }
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
                return type.nameEn;
        }
    };

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

    const getCityName = (country) => {
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
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>{translation.title}</ModalHeader>
                        <ModalBody>
                            <label htmlFor="">{translation.type}</label>
                            <select name="" id="" onChange={(e) => setCargoTypeId(e.target.value)} value={cargoTypeId}>
                                {cargoTypes.map((type) => (
                                    <ModalOption key={type.id} value={type.id}>{getCargoTypeNames(type)}</ModalOption>
                                ))}
                            </select>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.from_country}</label>
                                    <select name="" id="" onChange={handleFromCountryChange} value={fromCountryId}>
                                        {countries.map((country) => (
                                            <ModalOption key={country.id} value={country.id}>{getCountryName(country)}</ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.from_city}</label>
                                    <select name="" id="" disabled={citySelectFromDisabled} onChange={(e) => setFromCity(e.target.value)} value={fromCity}>
                                        {citiesFrom.map((city) => (
                                            <ModalOption key={city.id} value={city.id}>{getCityName(city)}</ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                            </ModalCouple>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.to_country}</label>
                                    <select name="" id="" onChange={handleToCountryChange} value={toCountryId}>
                                        {countries.map((country) => (
                                            <ModalOption key={country.id} value={country.id}>{getCountryName(country)}</ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.to_city}</label>
                                    <select name="" id="" disabled={citySelectToDisabled} onChange={(e) => setToCity(e.target.value)} value={toCity}>
                                        {citiesTo.map((city) => (
                                            <ModalOption key={city.id} value={city.id}>{getCityName(city)}</ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                            </ModalCouple>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.weight}</label>
                                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.type_transport}</label>
                                    <select name="" id="" onChange={(e) => setTransportId(e.target.value)} value={transportId}>
                                        {transportTypes.map((type) => (
                                            <ModalOption key={type.id} value={type.id}>{getCargoTypeNames(type)}</ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                            </ModalCouple>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.name}</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.number}</label>
                                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                                </ChildCouple>
                            </ModalCouple>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.email}</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.whatsApp}</label>
                                    <input type="text" onChange={(e) => setWhatsApp(e.target.value)} />
                                </ChildCouple>
                            </ModalCouple>
                            <label htmlFor="">{translation.additional}</label>
                            <ModalTextArea onChange={(e) => setAdditionalInfo(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <button type="submit">{translation.add}</button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
}
